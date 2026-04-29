import * as THREE from "three";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";
import idPhoto from "../../assets/id_card/id_photo.jpg";

extend({ MeshLineGeometry, MeshLineMaterial });

const TAG_GLB =
  "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5huRVDzcoDwnbgrKUo1Lzs/53b6dd7d6b4ffcdbd338fa60265949e1/tag.glb";

useGLTF.preload(TAG_GLB);

const segmentProps = {
  type: "dynamic",
  canSleep: true,
  colliders: false,
  angularDamping: 2,
  linearDamping: 2,
};

export default function EmployeeCard() {
  const [isLight, setIsLight] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("light"),
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    const syncTheme = () => setIsLight(root.classList.contains("light"));
    syncTheme();

    const observer = new MutationObserver(syncTheme);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 13], fov: 25 }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl, scene }) => {
          scene.background = null;
          gl.setClearColor(new THREE.Color(0x000000), 0);
        }}
      >
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -38, 0]} timeStep={1 / 60}>
          <Badge isLight={isLight} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Badge({ maxSpeed = 50, minSpeed = 10, isLight = false }) {
  const band = useRef(null);
  const fixed = useRef(null);
  const j1 = useRef(null);
  const j2 = useRef(null);
  const j3 = useRef(null);
  const card = useRef(null);
  const hoverIntent = useRef({ x: 0, y: 0 });

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  const { nodes, materials } = useGLTF(TAG_GLB);

  const photoTexture = useMemo(() => {
    const faceWidth = 800;
    const faceHeight = 1400;
    const canvas = document.createElement("canvas");
    canvas.width = faceWidth * 2;
    canvas.height = faceHeight;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const img = new Image();
    img.src = idPhoto;
    img.onload = () => {
      const scale = Math.max(faceWidth / img.width, faceHeight / img.height);
      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const x = (faceWidth - drawWidth) / 2;
      const y = (faceHeight - drawHeight) / 2;

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, faceWidth, faceHeight);
      ctx.clip();
      ctx.translate(0, faceHeight);
      ctx.scale(1, -1);
      ctx.drawImage(img, faceWidth - x - drawWidth, y, drawWidth, drawHeight);
      ctx.restore();
      texture.needsUpdate = true;
    };

    return texture;
  }, []);

  const bandTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 220;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = isLight ? "#000000" : "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#2563eb";
    ctx.font = "900 96px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("DENTALMON", canvas.width * 0.28, canvas.height / 2);
    ctx.fillText("DENTALMON", canvas.width * 0.74, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
    return texture;
  }, [isLight]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.48]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.48]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.48]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (
      !fixed.current ||
      !j1.current ||
      !j2.current ||
      !j3.current ||
      !band.current ||
      !card.current
    ) {
      return;
    }

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    const [j1Lerped, j2Lerped] = [j1, j2].map((ref) => {
      if (!ref.current) return undefined;

      const lerped = new THREE.Vector3().copy(ref.current.translation());
      const clampedDistance = Math.max(
        0.1,
        Math.min(1, lerped.distanceTo(ref.current.translation())),
      );

      return lerped.lerp(
        ref.current.translation(),
        delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
      );
    });

    curve.points[0].copy(j3.current.translation());
    curve.points[1].copy(j2Lerped ?? j2.current.translation());
    curve.points[2].copy(j1Lerped ?? j1.current.translation());
    curve.points[3].copy(fixed.current.translation());
    band.current.geometry.setPoints(curve.getPoints(32));

    ang.copy(card.current.angvel());
    rot.copy(card.current.rotation());

    const hoverX = hovered && !dragged ? hoverIntent.current.x : 0;
    const hoverY = hovered && !dragged ? hoverIntent.current.y : 0;
    const targetAngX = -hoverY * 0.45 - rot.x * 0.9;
    const targetAngY = -hoverX * 0.95 - rot.y * 1.35;
    const bandTargetX = hoverX * 1.35;
    const bandTargetY = hoverY * 0.45;

    [j1, j2, j3].forEach((jointRef, index) => {
      const joint = jointRef.current;
      if (!joint) return;

      const influence = (index + 1) / 3;
      const linvel = joint.linvel();
      joint.setLinvel(
        {
          x: THREE.MathUtils.lerp(
            linvel.x,
            bandTargetX * influence,
            hovered ? 0.14 : 0.07,
          ),
          y: THREE.MathUtils.lerp(
            linvel.y,
            bandTargetY * influence,
            hovered ? 0.1 : 0.05,
          ),
          z: linvel.z,
        },
        false,
      );
    });

    card.current.setAngvel(
      {
        x: THREE.MathUtils.lerp(ang.x, targetAngX, hovered ? 0.09 : 0.14),
        y: THREE.MathUtils.lerp(ang.y, targetAngY, hovered ? 0.1 : 0.16),
        z: THREE.MathUtils.lerp(ang.z, 0, 0.18),
      },
      false,
    );
  });

  curve.curveType = "chordal";

  return (
    <>
      <group position={[2.1, 3.3, 0]}>
        <RigidBody ref={fixed} type="fixed" position={[0, 0, 0]} />
        <RigidBody position={[0.5, 0, 0]} {...segmentProps} ref={j1}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} {...segmentProps} ref={j2}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} {...segmentProps} ref={j3}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => {
              hover(false);
              hoverIntent.current.x = 0;
              hoverIntent.current.y = 0;
              j1.current?.wakeUp();
              j2.current?.wakeUp();
              j3.current?.wakeUp();
              fixed.current?.wakeUp();
              card.current?.wakeUp();
            }}
            onPointerMove={(evt) => {
              const localPoint = evt.eventObject.worldToLocal(evt.point.clone());
              hoverIntent.current.x = THREE.MathUtils.clamp(localPoint.x / 0.8, -1, 1);
              hoverIntent.current.y = THREE.MathUtils.clamp(localPoint.y / 1.1, -1, 1);
              j1.current?.wakeUp();
              j2.current?.wakeUp();
              j3.current?.wakeUp();
              card.current?.wakeUp();
            }}
            onPointerUp={() => drag(false)}
            onPointerDown={(evt) =>
              card.current &&
              drag(
                new THREE.Vector3()
                  .copy(evt.point)
                  .sub(vec.copy(card.current.translation())),
              )
            }
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={photoTexture}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          useMap
          map={bandTexture}
          repeat={new THREE.Vector2(1.15, 1)}
          lineWidth={0.27}
        />
      </mesh>
    </>
  );
}
