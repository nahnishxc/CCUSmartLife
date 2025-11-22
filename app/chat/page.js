"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";

const greetings = [
  "What can I do for you today?",
  "How can I help you?",
  "Ready when you are.",
  "What’s on your mind?",
  "Need a hand with something?"
];

function Eyes() {
  const leftPupil = useRef(null);
  const rightPupil = useRef(null);

  useFrame((state) => {
    const { mouse } = state;
    const px = mouse.x * 0.12;
    const py = mouse.y * 0.12;
    if (leftPupil.current) {
      leftPupil.current.position.x = px;
      leftPupil.current.position.y = py;
    }
    if (rightPupil.current) {
      rightPupil.current.position.x = px;
      rightPupil.current.position.y = py;
    }
  });

  return (
    <group position={[0, 0.15, 0.85]}>
      <group position={[-0.22, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={leftPupil} position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
      <group position={[0.22, 0, 0]}>
        <mesh>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh ref={rightPupil} position={[0, 0, 0.08]}>
          <sphereGeometry args={[0.06, 32, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  );
}

function FloatingOrb() {
  const orbRef = useRef();

  useFrame((state) => {
    const { mouse, clock } = state;
    if (!orbRef.current) return;
    const targetX = mouse.x * 0.7;
    const targetY = mouse.y * 0.7;
    orbRef.current.rotation.y += (targetX - orbRef.current.rotation.y) * 0.08;
    orbRef.current.rotation.x += (targetY - orbRef.current.rotation.x) * 0.08;
    const t = clock.getElapsedTime();
    orbRef.current.position.y = Math.sin(t * 1.4) * 0.12;
  });

  return (
    <group ref={orbRef}>
      <mesh>
        <sphereGeometry args={[1.25, 128, 128]} />
        <meshPhysicalMaterial
          transparent
          opacity={0.45}
          roughness={0.25}
          metalness={0.7}
          clearcoat={1}
          clearcoatRoughness={0.12}
          color="#ff8a3c"
          emissive="#ff8a3c"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[-0.25, 0.05, 0]}>
        <sphereGeometry args={[0.95, 128, 128]} />
        <meshPhysicalMaterial
          roughness={0.18}
          metalness={0.9}
          transmission={0.9}
          thickness={0.9}
          color="#ffd65a"
        />
      </mesh>
      <mesh position={[0.3, -0.1, -0.1]}>
        <sphereGeometry args={[0.8, 128, 128]} />
        <meshPhysicalMaterial
          roughness={0.15}
          metalness={0.9}
          transmission={0.95}
          thickness={0.9}
          color="#64e38c"
        />
      </mesh>
      <mesh position={[0.4, 0.4, 0.9]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <Eyes />
    </group>
  );
}

function OrbScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4], fov: 38 }} className="w-full h-full">
      <Suspense fallback={null}>
        <Environment preset="sunset" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 2]} intensity={1.3} />
        <FloatingOrb />
      </Suspense>
    </Canvas>
  );
}

export default function ChatPage() {
  const greeting = useMemo(
    () => greetings[Math.floor(Math.random() * greetings.length)],
    []
  );

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center px-4 py-10">
      <section className="w-full max-w-5xl grid md:grid-cols-[1.1fr,1fr] gap-10 items-center mb-10">
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-white/10 shadow-[0_0_80px_rgba(251,191,36,0.3)]">
          <OrbScene />
        </div>
        <div className="flex flex-col gap-6 md:gap-8">
          <div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-emerald-300/80 mb-3">
              CCU SmartLife Assistant
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight mb-3">
              Hey, I&apos;m your campus AI.
            </h1>
            <p className="text-lg md:text-xl text-slate-200">{greeting}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            {[
              "幫我規劃下學期課表",
              "雙主修 / 輔系規定",
              "宿舍與租屋問題",
              "出國交換相關",
              "我現在該先處理什麼？"
            ].map((label) => (
              <button
                key={label}
                className="px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur hover:bg-white/10 text-xs md:text-sm transition"
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            下方是之後會接真正 AI 的聊天區，目前先當作預覽畫面。
          </p>
        </div>
      </section>

      <section className="w-full max-w-5xl flex flex-col gap-4">
        <div className="flex-1 min-h-[260px] rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur p-4 md:p-6 flex flex-col gap-3 text-sm md:text-base text-slate-200">
          <div className="self-start max-w-[80%] rounded-2xl bg-white/10 px-4 py-2">
            嗨，我是 CCU SmartLife AI 助理。之後你在這裡打字問任何關於課程、住宿、交換、行政流程的問題，我都會幫你整理成步驟跟建議。
          </div>
          <div className="self-end max-w-[80%] rounded-2xl bg-emerald-500/85 px-4 py-2">
            好，我之後想先讓你幫我看下學期的課表要怎麼排，不想有早八。
          </div>
          <div className="self-start max-w-[80%] rounded-2xl bg-white/10 px-4 py-2">
            沒問題。等真正串接好之後，我可以讀你的修課紀錄、系上規定，幫你排一份沒有早八、又能準時畢業的課表版本給你選。
          </div>
          <div className="self-start mt-4 text-xs text-slate-500">
            （目前為靜態示意，之後會改成即時訊息氣泡）
          </div>
        </div>
      </section>
    </main>
  );
}
