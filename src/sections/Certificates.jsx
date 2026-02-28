import { motion, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// 👉 Import certificate images
import cert1 from "../assets/cert1.png";
import cert2 from "../assets/cert2.png";
import cert3 from "../assets/cert3.png";
import cert4 from "../assets/cert4.png";
import cert5 from "../assets/cert5.png";

export default function Certificates() {
  const certificates = [
    {
      title: "Problem Solving (Basic)",
      company: "HackerRank",
      image: cert1,
      link: "https://www.hackerrank.com/certificates/f6c1ad49e394",
    },
    {
      title: "Problem Solving (Intermediate)",
      company: "HackerRank",
      image: cert2,
      link: "https://www.hackerrank.com/certificates/a0fc7442428d",
    },
    {
      title: "Web development Workshop",
      company: "IIT Roorkee",
      image: cert3,
      link: "https://hyperstack.id/credential/67eaa8f8-f9b7-46f6-b163-37e9b94bbfb0",
    },
    {
      title: "Data Science Professional",
      company: "Oracle",
      image: cert4,
      link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=2E9D7441BCEA87119559BB17C0242F80795016EF1A2A7ADCB0E31468BE0514AE",
    },
    {
      title: "CSS (Basic)",
      company: "HackerRank",
      image: cert5,
      link: "https://www.hackerrank.com/certificates/iframe/5f93b901e253",
    },
  ];

  // repeat for infinite scroll
  const repeated = [...certificates, ...certificates];

  const [dir, setDir] = useState(-1);
  const [active, setActive] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchY = useRef(null);

  const x = useMotionValue(0);

  // 👀 activate only when section is visible
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0.1] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // 🖱️ scroll / touch direction detection
  useEffect(() => {
    if (!active) return;

    const onWheel = (e) => {
      setDir(e.deltaY > 0 ? -1 : 1);
    };

    const onTouchStart = (e) => {
      touchY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      if (touchY.current === null) return;
      const delta = e.touches[0].clientY - touchY.current;
      setDir(delta > 0 ? 1 : -1);
      touchY.current = e.touches[0].clientY;
    };

    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [active]);

  // 🔁 infinite marquee animation
  useEffect(() => {
    let id;
    let last = performance.now();
    const SPEED = 80;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      let next = x.get() + dir * SPEED * dt;
      const loop = trackRef.current?.scrollWidth / 2 || 0;

      if (loop) {
        if (next <= -loop) next += loop;
        if (next >= 0) next -= loop;
      }

      x.set(next);
      id = requestAnimationFrame(tick);
    };

    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [dir, x]);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      className="h-1/2 w-full pb-8 flex flex-col items-center justify-center relative bg-black text-white overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse" />

        <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#302b63] via-[#00bf8f] to-[#1cd8d2] opacity-20 blur-[120px] animate-pulse delay-500" />
      </div>
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true, amount: 0.4 }}
        className="text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] z-10"
      >
        Certificates
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="mt-2 mb-10 text-white/90 text-base sm:text-lg z-10"
      >
        Verified Credentials & Professional Achievements
      </motion.p>

      {/* marquee */}
      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={trackRef}
          className="flex gap-12 px-8"
          style={{
            x,
            whiteSpace: "nowrap",
            willChange: "transform",
          }}
        >
          {repeated.map((c, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="min-w-[280px] sm:min-w-[320px] bg-white/5 border border-white/10 rounded-xl overflow-hidden shadow-xl backdrop-blur-md"
            >
              <img
                src={c.image}
                alt={c.title}
                className="w-full h-[180px] object-cover"
              />

              <div className="p-4 flex flex-col gap-3 text-center">
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <h3 className="font-semibold text-lg">{c.company}</h3>


                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center rounded-lg bg-white text-black font-semibold px-4 py-2 hover:bg-gray-200 transition"
                >
                  View Certificate
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
