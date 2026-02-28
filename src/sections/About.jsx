import { motion } from "framer-motion"
import React from "react"
import p from "../assets/p.png"

export default function About() {
  const stats=[
    {label:"Projects", value:"3"},
    {label:"Specialty", value:"Full Stack Development"},
    {label:"Focus", value:"Scalable & Clean Systems"},
  ]
  const glows=[
     "-top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
     "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delta-300",
     "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]"
  ]
  return (
    <section id="about" className="min-h-screen w-full flex items-center justify-center relative bg-black text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i)=>(
          <div key={i} className={`absolute rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] animate-pulse ${c}`} />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6}}
        viewport={{once:true, amount:0.4}}
        className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
        >
          <motion.div
          whileHover={{scale:1.05}}
          transition={{type:"spring", stiffness:200, damping:80}}
          className="relative w-[160px] h-[160px] md:w-[200px] md:h-[200px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-bf from-[#1cd8d2]/20 to-[#302b63]/20 border border-[#1cd8d2]/50"
          >
            <img src={p} alt="profile" className="absolute inset-0"/>
          </motion.div>
          <div className="flex-1 flex flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#1cd8d2]">Piyush Saxena</h2>

            <p className="mt-2 text-lg sm:text-xl text-white/90 font-semibold">Software Engineer | Full Stack developer | Data Scientist enthusiast</p>

            <p className="mt-4 text-gray-300 leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">I design and build high-performance, scalable web applications with a strong emphasis on clean architecture, performance optimization, and intuitive user experiences. I enjoy solving complex problems and translating ideas into production ready solutions.</p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i)=>(
                <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{once:true, amount:0.4}}
                key={i}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center"
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold mt-1">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a href="#projects" className="inline-flex items-center justify-center rounded-lg bg-white text-black font-semibold px-5 py-3 hover:bg-gray-200 transition">View Projects</a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg border border-white/20 text-white px-5 py-3 bg-white/10 hover:bg-white/20 transition">Get in Touch</a>
            </div>
          </div>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{once:true, amount:0.4}}
        className="text-center md:text-left"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">About Me</h3>
          <p className="text-gray-300 leading-relaxed text-base sm:text-lg">I’m a Software Engineer and Full Stack Developer, passionate about building fast, scalable, and reliable web applications.</p>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">I enjoy turning ideas into clean, user-centric products with a strong focus on performance, maintainability, and real-world impact.</p>
        </motion.div>
      </div>
    </section>
  )
}