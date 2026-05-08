"use client";
import { useEffect, useState } from "react";

export default function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 【修改 1】把型別從 MouseEvent 改成 PointerEvent
    const handleMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    // 【修改 2】把 mousemove 全部換成 pointermove
    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      // 【修改 3】解除監聽也要記得換成 pointermove
      window.removeEventListener("pointermove", handleMove);
    };
  }, []);

  return pos;
}