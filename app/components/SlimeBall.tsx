

// "use client";
// import { motion, useMotionValue, useSpring, useTransform, animate } from "framer-motion";
// import { useEffect, useState, useRef } from "react";
// import useMousePosition from "../hooks/useMousePosition";

// export default function SlimeBall() {
//   const mouse = useMousePosition();
//   const [isBlinking, setIsBlinking] = useState(false);
//   const ballRef = useRef<HTMLDivElement>(null);

//   const targetX = useMotionValue(0);
//   const targetY = useMotionValue(0);
//   const eyeX = useSpring(targetX, { stiffness: 140, damping: 24 });
//   const eyeY = useSpring(targetY, { stiffness: 140, damping: 24 });

//   const bodyX = useTransform(eyeX, (v) => v * 0.15);
//   const bodyY = useTransform(eyeY, (v) => v * 0.15);
//   const bodyR = useTransform(eyeX, (v) => v * 0.3);

//   const squashX = useMotionValue(1);
//   const squashY = useMotionValue(1);
//   const jumpY = useMotionValue(0);
//   const rotateZ = useMotionValue(0);

//   const pathNormal = "M 100 0 C 155 0 200 45 200 100 C 200 155 155 200 100 200 C 45 200 0 155 0 100 C 0 45 45 0 100 0 Z";

//   useEffect(() => {
//     const blinkLoop = setInterval(() => {
//       setIsBlinking(true);
//       setTimeout(() => setIsBlinking(false), 150);
//     }, Math.random() * 3000 + 4000);
//     return () => clearInterval(blinkLoop);
//   }, []);

//   const performCreep = async () => {
//     for (let i = 0; i < 3; i++) {
//       await Promise.all([
//         animate(squashY, 0.65, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }),
//         animate(squashX, 1.3, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] })
//       ]);
//       animate(squashY, 1, { type: "spring", stiffness: 350, damping: 12 });
//       animate(squashX, 1, { type: "spring", stiffness: 350, damping: 12 });
//       await new Promise(resolve => setTimeout(resolve, 400));
//     }
//   };

//   const performRealJump = async () => {
//     // 1. 極慢蓄力 (Anticipation)
//     await Promise.all([
//       animate(squashY, 0.55, { duration: 0.7, ease: "easeInOut" }),
//       animate(squashX, 1.4, { duration: 0.7, ease: "easeInOut" })
//     ]);

//     // 2. 爆發起跳 (The Launch) - 瞬間拉長並衝上去
//     // 使用 easeOut 模擬衝力
//     animate(jumpY, -80, { duration: 0.2, ease: "easeOut" });
//     animate(squashY, 1.4, { duration: 0.2, ease: "easeOut" });
//     animate(squashX, 0.7, { duration: 0.2, ease: "easeOut" });

//     // 3. 頂點微停頓 (The Apex)
//     await new Promise(resolve => setTimeout(resolve, 180));

//     // 4. 重力墜落 (The Fall) - 速度要快
//     // 墜落時身體稍微恢復原狀，直到撞地
//     animate(jumpY, 0, { duration: 0.15, ease: "easeIn" });
    
//     await new Promise(resolve => setTimeout(resolve, 150));

//     // 5. 撞擊地面的餘震 (The Impact)
//     // 撞到地面的瞬間要猛烈壓扁一下再回彈
//     animate(squashY, 0.7, { duration: 0.1 });
//     animate(squashX, 1.3, { duration: 0.1 });
    
//     await new Promise(resolve => setTimeout(resolve, 100));

//     animate(squashY, 1, { type: "spring", stiffness: 500, damping: 12 });
//     animate(squashX, 1, { type: "spring", stiffness: 500, damping: 12 });
//   };

//   const performWiggle = async () => {
//     await animate(rotateZ, 12, { duration: 0.3, ease: "easeInOut" });
//     await animate(rotateZ, -12, { duration: 0.5, ease: "easeInOut" });
//     animate(rotateZ, 0, { type: "spring", stiffness: 300, damping: 12 });
//   };

//   useEffect(() => {
//     const actionLoop = setInterval(() => {
//       const rand = Math.random();
//       if (rand > 0.7) performRealJump();
//       else if (rand > 0.35) performCreep();
//       else performWiggle();
//     }, 5000 + Math.random() * 5000);
//     return () => clearInterval(actionLoop);
//   }, []);

//   useEffect(() => {
//     let frameId: number;
//     const updatePosition = () => {
//       if (!ballRef.current) return;
//       const rect = ballRef.current.getBoundingClientRect();
//       const centerX = rect.left + rect.width / 2;
//       const centerY = rect.top + rect.height / 2;
//       const dx = mouse.x - centerX;
//       const dy = mouse.y - centerY;
//       const maxMove = 30;
//       targetX.set(Math.max(-maxMove, Math.min(maxMove, dx / 12)));
//       targetY.set(Math.max(-maxMove, Math.min(maxMove, dy / 12)));
//       frameId = requestAnimationFrame(updatePosition);
//     };
//     frameId = requestAnimationFrame(updatePosition);
//     return () => cancelAnimationFrame(frameId);
//   }, [mouse.x, mouse.y]);

//   return (
//     <motion.div
//       ref={ballRef}
//       className="relative w-full h-full flex items-center justify-center select-none"
//       style={{ x: bodyX, y: bodyY, rotate: bodyR }}
//     >
//       <motion.div
//         style={{
//           scaleX: squashX,
//           scaleY: squashY,
//           y: jumpY,
//           rotate: rotateZ,
//           originY: 1
//         }}
//         className="relative w-full h-full flex items-center justify-center"
//       >
//         <motion.svg viewBox="-40 -40 280 280" className="w-full h-full drop-shadow-[0_15px_30px_rgba(255,100,100,0.35)]">
//           <defs>
//             <linearGradient id="slimeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
//               <stop offset="0%" stopColor="#FFC837" /><stop offset="40%" stopColor="#FF8008" /><stop offset="100%" stopColor="#FF416C" />
//             </linearGradient>
//           </defs>
//           <path d={pathNormal} fill="url(#slimeGradient)" />
//         </motion.svg>

//         <div className="absolute inset-0 flex items-center justify-center gap-7 pointer-events-none">
//           {[0, 1].map((i) => (
//             <motion.div
//               key={i}
//               className="bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.9)]"
//               style={{ x: eyeX, y: eyeY }}
//               animate={{ width: isBlinking ? 16 : 14, height: isBlinking ? 4 : 22 }}
//               transition={{ type: "spring", stiffness: 160, damping: 18 }}
//             />
//           ))}
//         </div>
//       </motion.div>
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
  const [isGrabbed, setIsGrabbed] = useState(false);
  const [originY, setOriginY] = useState(1); // 新增：動態基準點狀態
  const ballRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

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
      if (!isGrabbed) {
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 150);
      }
    }, Math.random() * 3000 + 4000);
    return () => clearInterval(blinkLoop);
  }, [isGrabbed]);

  const performCreep = async () => {
    if (isGrabbed) return;
    setOriginY(1); // 蠕動固定由底部發力
    for (let i = 0; i < 3; i++) {
      await Promise.all([
        animate(squashY, 0.65, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] }),
        animate(squashX, 1.3, { duration: 0.6, ease: [0.45, 0.05, 0.55, 0.95] })
      ]);
      animate(squashY, 1, { type: "spring", stiffness: 350, damping: 12 });
      animate(squashX, 1, { type: "spring", stiffness: 350, damping: 12 });
      await new Promise(resolve => setTimeout(resolve, 400));
    }
  };

  const performRealJump = async () => {
    if (isGrabbed) return;
    setOriginY(1); // 跳躍固定由底部發力
    await Promise.all([
      animate(squashY, 0.55, { duration: 0.7, ease: "easeInOut" }),
      animate(squashX, 1.4, { duration: 0.7, ease: "easeInOut" })
    ]);
    animate(jumpY, -80, { duration: 0.2, ease: "easeOut" });
    animate(squashY, 1.4, { duration: 0.2, ease: "easeOut" });
    animate(squashX, 0.7, { duration: 0.2, ease: "easeOut" });
    await new Promise(resolve => setTimeout(resolve, 180));
    animate(jumpY, 0, { duration: 0.15, ease: "easeIn" });
    await new Promise(resolve => setTimeout(resolve, 150));
    animate(squashY, 0.7, { duration: 0.1 });
    animate(squashX, 1.3, { duration: 0.1 });
    await new Promise(resolve => setTimeout(resolve, 100));
    animate(squashY, 1, { type: "spring", stiffness: 500, damping: 12 });
    animate(squashX, 1, { type: "spring", stiffness: 500, damping: 12 });
  };

  const performWiggle = async () => {
    if (isGrabbed) return;
    setOriginY(1); // 搖擺固定由底部發力
    await animate(rotateZ, 12, { duration: 0.3, ease: "easeInOut" });
    await animate(rotateZ, -12, { duration: 0.5, ease: "easeInOut" });
    animate(rotateZ, 0, { type: "spring", stiffness: 300, damping: 12 });
  };

  useEffect(() => {
    const actionLoop = setInterval(() => {
      if (isGrabbed) return;
      const rand = Math.random();
      if (rand > 0.7) performRealJump();
      else if (rand > 0.35) performCreep();
      else performWiggle();
    }, 5000 + Math.random() * 5000);
    return () => clearInterval(actionLoop);
  }, [isGrabbed]);

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
      onPointerDown={(e) => {
        setIsGrabbed(true);
        startPos.current = { x: e.clientX, y: e.clientY };
        
        // 判定 originY：如果球球在螢幕上半部，originY 為 0 (往下拉)，反之為 1 (往上提)
        if (ballRef.current) {
          const rect = ballRef.current.getBoundingClientRect();
          const ballCenterY = rect.top + rect.height / 2;
          const screenCenterY = window.innerHeight / 2;
          setOriginY(ballCenterY < screenCenterY ? 0 : 1);
        }
      }}
      onPointerMove={(e) => {
        if (!isGrabbed) return;
        const dist = Math.hypot(e.clientX - startPos.current.x, e.clientY - startPos.current.y);
        if (dist > 15) setIsGrabbed(false);
      }}
      onPointerUp={() => setIsGrabbed(false)}
      onPointerLeave={() => setIsGrabbed(false)}
      className="relative w-full h-full flex items-center justify-center select-none"
      style={{ x: bodyX, y: bodyY, rotate: bodyR }}
    >
      <motion.div
        animate={{ 
          scaleY: isGrabbed ? 1.3 : 1, 
          scaleX: isGrabbed ? 0.85 : 1 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          scaleX: squashX,
          scaleY: squashY,
          y: jumpY,
          rotate: rotateZ,
          originY: originY // 動態基準點
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
              animate={{ 
                width: isGrabbed ? 18 : (isBlinking ? 16 : 14), 
                height: isGrabbed ? 18 : (isBlinking ? 4 : 22) 
              }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}