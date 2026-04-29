import { useEventListener } from "./useEventListener";

export function useClickOutside({
    ref,
    callback,
    eventType = "mousedown",
    eventListenerOptions,
}) {
    useEventListener(
        eventType,
        (event) => {
            const target = event.target;
            if (!target || !target.isConnected || !ref) return;

            const isOutside = Array.isArray(ref)
                ? ref
                      .filter((item) => Boolean(item.current))
                      .every((item) => item.current && !item.current.contains(target))
                : ref.current && !ref.current.contains(target);

            if (isOutside) {
                callback(event);
            }
        },
        undefined,
        eventListenerOptions
    );
}
