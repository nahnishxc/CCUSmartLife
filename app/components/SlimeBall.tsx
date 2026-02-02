// "use client";
// import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
// import { useEffect, useState, useRef } from "react";
// import useMousePosition from "../hooks/useMousePosition";

// export default function SlimeBall() {
//   const mouse = useMousePosition();
//   const [isBlinking, setIsBlinking] = useState(false);
//   const ballRef = useRef<HTMLDivElement>(null);

//   const targetX = useMotionValue(0);
//   const targetY = useMotionValue(0);

//   const eyeX = useSpring(targetX, { stiffness: 140, damping: 24, mass: 1.1 });
//   const eyeY = useSpring(targetY, { stiffness: 140, damping: 24, mass: 1.1 });

//   const bodyX = useTransform(eyeX, (v) => v * 0.2);
//   const bodyY = useTransform(eyeY, (v) => v * 0.2);
//   const bodyR = useTransform(eyeX, (v) => v * 0.5);

//   const pathNormal = "M 100 0 C 155 0 200 45 200 100 C 200 155 155 200 100 200 C 45 200 0 155 0 100 C 0 45 45 0 100 0 Z";

//   useEffect(() => {
//     const blinkLoop = setInterval(() => {
//       setIsBlinking(true);
//       setTimeout(() => setIsBlinking(false), 150);
//     }, Math.random() * 3000 + 2000);
//     return () => clearInterval(blinkLoop);
//   }, []);

//   // 修改點：使用 requestAnimationFrame 確保在拖曳時座標更新依然平滑
//   useEffect(() => {
//     let frameId: number;
    
//     const updateEyePosition = () => {
//       if (!ballRef.current) return;

//       const rect = ballRef.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;

//       const dx = mouse.x - centerX;
//       const dy = mouse.y - centerY;

//       const maxMove = 25;
//       // 增加靈敏度微調 dx / 10
//       const limitedX = Math.max(-maxMove, Math.min(maxMove, dx / 10));
//       const limitedY = Math.max(-maxMove, Math.min(maxMove, dy / 10));

//       targetX.set(limitedX);
//       targetY.set(limitedY);
      
//       frameId = requestAnimationFrame(updateEyePosition);
//     };

//     frameId = requestAnimationFrame(updateEyePosition);
//     return () => cancelAnimationFrame(frameId);
//   }, [mouse.x, mouse.y, targetX, targetY]);

//   return (
//     <motion.div
//       ref={ballRef}
//       className="relative w-full h-full aspect-square flex items-center justify-center select-none"
//       style={{ x: bodyX, y: bodyY, rotate: bodyR }}
//     >
//       <motion.svg viewBox="-40 -40 280 280" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,100,100,0.35)]">
//         <defs>
//           <linearGradient id="slimeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#FFC837" /><stop offset="40%" stopColor="#FF8008" /><stop offset="100%" stopColor="#FF416C" />
//           </linearGradient>
//         </defs>
//         <path d={pathNormal} fill="url(#slimeGradient)" />
//       </motion.svg>

//       <div className="absolute inset-0 flex items-center justify-center gap-7 pointer-events-none">
//         {[0, 1].map((i) => (
//           <motion.div
//             key={i}
//             className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
//             style={{ x: eyeX, y: eyeY }}
//             animate={{ width: isBlinking ? 16 : 14, height: isBlinking ? 4 : 22 }}
//             transition={{ type: "spring", stiffness: 160, damping: 18 }}
//           />
//         ))}
//       </div>
//     </motion.div>
//   );
// }
"use client";
import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import useMousePosition from "../hooks/useMousePosition";

export default function SlimeBall() {
  const mouse = useMousePosition();
  const [isBlinking, setIsBlinking] = useState(false);
  const ballRef = useRef<HTMLDivElement>(null);

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const eyeX = useSpring(targetX, { stiffness: 140, damping: 24 });
  const eyeY = useSpring(targetY, { stiffness: 140, damping: 24 });

  const bodyX = useTransform(eyeX, (v) => v * 0.15);
  const bodyY = useTransform(eyeY, (v) => v * 0.15);
  const bodyR = useTransform(eyeX, (v) => v * 0.3);

  const squashX = useMotionValue(1);
  const squashY = useMotionValue(1);
  const jumpY = useMotionValue(0);
  const rotateZ = useMotionValue(0);

  const pathNormal = "M 100 0 C 155 0 200 45 200 100 C 200 155 155 200 100 200 C 45 200 0 155 0 100 C 0 45 45 0 100 0 Z";

  useEffect(() => {
    const blinkLoop = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, Math.random() * 3000 + 4000);
    return () => clearInterval(blinkLoop);
  }, []);

  const performCreep = async () => {
    for (let i = 0; i < 3; i++) {
      await animate(squashY, 0.8, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] });
      await animate(squashX, 1.15, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] });
      
      animate(squashY, 1, { type: "spring", stiffness: 350, damping: 12 });
      animate(squashX, 1, { type: "spring", stiffness: 350, damping: 12 });
      
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  };

  const performRealJump = async () => {
    await animate(squashY, 0.6, { duration: 0.5, ease: "easeOut" });
    await animate(squashX, 1.3, { duration: 0.5, ease: "easeOut" });

    animate(jumpY, -60, { duration: 0.25, ease: "easeOut" });
    animate(squashY, 1.3, { duration: 0.25, ease: "easeOut" });
    animate(squashX, 0.7, { duration: 0.25, ease: "easeOut" });

    await new Promise(resolve => setTimeout(resolve, 300));

    animate(jumpY, 0, { type: "spring", stiffness: 500, damping: 15 });
    animate(squashY, 1, { type: "spring", stiffness: 600, damping: 12 });
    animate(squashX, 1, { type: "spring", stiffness: 600, damping: 12 });
  };

  useEffect(() => {
    const actionLoop = setInterval(() => {
      const rand = Math.random();
      if (rand > 0.7) performRealJump();
      else if (rand > 0.3) performCreep();
    }, 6000 + Math.random() * 6000);
    return () => clearInterval(actionLoop);
  }, []);

  useEffect(() => {
    let frameId: number;
    const updatePosition = () => {
      if (!ballRef.current) return;
      const rect = ballRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouse.x - centerX;
      const dy = mouse.y - centerY;
      const maxMove = 30;
      targetX.set(Math.max(-maxMove, Math.min(maxMove, dx / 12)));
      targetY.set(Math.max(-maxMove, Math.min(maxMove, dy / 12)));
      frameId = requestAnimationFrame(updatePosition);
    };
    frameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(frameId);
  }, [mouse.x, mouse.y]);

  return (
    <motion.div
      ref={ballRef}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ x: bodyX, y: bodyY, rotate: bodyR }}
    >
      <motion.div
        style={{
          scaleX: squashX,
          scaleY: squashY,
          y: jumpY,
          rotate: rotateZ,
          originY: 1
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <motion.svg viewBox="-40 -40 280 280" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,100,100,0.35)]">
          <defs>
            <linearGradient id="slimeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFC837" /><stop offset="40%" stopColor="#FF8008" /><stop offset="100%" stopColor="#FF416C" />
            </linearGradient>
          </defs>
          <path d={pathNormal} fill="url(#slimeGradient)" />
        </motion.svg>

        <div className="absolute inset-0 flex items-center justify-center gap-7 pointer-events-none">
          {[0, 1].map((i) => (
            <motion.div
              key={i}
              className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
              style={{ x: eyeX, y: eyeY }}
              animate={{ width: isBlinking ? 16 : 14, height: isBlinking ? 4 : 22 }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}