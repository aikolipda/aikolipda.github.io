"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type DraggableDogProps = {
  position?: string;
  size?: string;
  rotation?: number;
  image: string;
};

export function DraggableDog({
  position,
  size,
  rotation,
  image,
}: DraggableDogProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const startRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef({ x: 0, y: 0 });

  const onPointerDown = (e) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);

    startRef.current = { x: e.clientX, y: e.clientY };
    startPosRef.current = { ...pos };
  };

  const onPointerMove = (e) => {
    if (!draggingRef.current) return;

    const dx = e.clientX - startRef.current.x;
    const dy = e.clientY - startRef.current.y;

    setPos({
      x: startPosRef.current.x + dx,
      y: startPosRef.current.y + dy,
    });
  };

  const onPointerUp = () => {
    draggingRef.current = false;
  };

  return (
    <div
      className={`absolute ${position} cursor-grab active:cursor-grabbing select-none`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      <Image
        src={image}
        alt="My dog"
        width={140}
        height={140}
        className={`${size} drop-shadow-md`}
        style={{ transform: `rotate(${rotation}deg)` }}
        priority
        draggable={false}
      />
    </div>
  );
}
