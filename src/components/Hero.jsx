import React from 'react'
import me from '../assets/me.png';
import resumePDF from '../assets/Wonjae Kim Resume.pdf';
import wonjae from '../assets/wonjae.jpeg';

// 상태 정보: 필요한 만큼 추가 가능
const statusMap = {
    available: {
        label: "Available for Work",
        color: "bg-emerald-400",
        ping: "animate-ping"
    },
    working: {
        label: "Currently Working",
        color: "bg-blue-400",
        ping: "animate-ping"
    },
    internship: {
        label: "Open to Internships",
        color: "bg-yellow-400",
        ping: "animate-ping"
    },
    incomingIntern: {
        label: "Incoming Intern",
        color: "bg-purple-400",
        ping: "animate-ping"
    },
    unavailable: {
        label: "Not Available",
        color: "bg-red-400",
        ping: "animate-none"
    }
};


// 바꿔가면서 쓸 수 있음
const currentStatus = "incomingIntern"; // "working", "internship", "unavailable"

const Hero = () => {
    const status = statusMap[currentStatus];

    return (
        <div>
            <section id="home" className="pt-28 lg:pt-36">
                <div className="container items-center lg:grid lg:grid-cols-2 lg:gap-10">
                    <div>
                        <div className="flex items-center gap-3 reveal-up">
                            <figure className="img-box w-9 h-9 rounded-lg">
                                <img src={me} alt="" width={40} height={40} className="rounded-lg" />
                            </figure>
                            <div className='flex items-center gap-2 text-zinc-400 text-sm tracking-wide'>
                                <span className={`relative w-2 h-2 rounded-full ${status.color}`}>
                                    <span className={`absolute inset-0 rounded-full ${status.color} ${status.ping}`}>
                                    </span>
                                </span>
                                {status.label}
                            </div>
                        </div>
                        <h2 className='headline-1 max-w-[15ch] sm:max-w-[20ch] lg:max-w-[15ch] mt-5 mb-3'>
                            Wonjae Kim
                        </h2>
                        <p className='text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400 font-medium text-lg tracking-wide mb-2'>
                            Software Engineer & Full-Stack Developer
                        </p>
                        <p className='text-zinc-400 text-lg mb-6 lg:mb-8 italic'>
                            Junior Computer Science Student at UMCP
                        </p>
                        <div className='flex items-center gap-3'>
                            <ButtonPrimary
                                label="Resume"
                                icon="download"
                                href={resumePDF}
                                target="_blank"
                            />

                            <ButtonOutline
                                href="#about"
                                label="Scroll Down"
                                icon="arrow_downward"
                            />
                        </div>
                    </div>

                    <div className='hidden lg:block'>
                        <figure className='w-full max-w-[480px] ml-auto bg-gradient-to-t from-sky-400 via-25% via-sky-400 to-65% rounded-[60px]'>
                            <img src={wonjae} alt="Wonjae Kim" width={500} height={500} className="rounded-2xl" />
                        </figure>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero
