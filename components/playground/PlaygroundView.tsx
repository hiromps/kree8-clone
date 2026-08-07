"use client";

import { useEffect, useRef } from "react";
import {
  PG_ITEMS,
  CANVAS_W,
  CANVAS_H,
  BASE_SCALE,
  MIN_SCALE,
  MAX_SCALE,
} from "@/lib/playground-layout";

// Module scope on purpose: the original builds the board once per page load and
// only replays the staggered entrance on the FIRST visit; later visits just recenter.
let hasBuilt = false;

export default function PlaygroundView() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const zoomLabelRef = useRef<HTMLButtonElement>(null);
  const zoomInRef = useRef<HTMLButtonElement>(null);
  const zoomOutRef = useRef<HTMLButtonElement>(null);
  const zoomFitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const canvas = canvasRef.current;
    const zoomLabel = zoomLabelRef.current;
    if (!viewport || !canvas || !zoomLabel) return;

    // Playground locks page scrolling (full-bleed pannable canvas).
    document.documentElement.classList.add("pg-mode");

    let scale = BASE_SCALE;
    let tx = 0;
    let ty = 0;
    let isDown = false;
    let startX = 0;
    let startY = 0;
    let startTx = 0;
    let startTy = 0;
    let touchId: number | null = null;

    function apply() {
      canvas!.style.transform = `translate(${tx}px,${ty}px) scale(${scale})`;
      zoomLabel!.textContent = `${Math.round((scale / BASE_SCALE) * 100)}%`;
    }

    function clamp() {
      const scaledW = CANVAS_W * scale;
      const scaledH = CANVAS_H * scale;
      let minTx: number, maxTx: number, minTy: number, maxTy: number;
      if (scaledW <= viewport!.clientWidth) {
        minTx = maxTx = (viewport!.clientWidth - scaledW) / 2;
      } else {
        minTx = viewport!.clientWidth - scaledW - 300;
        maxTx = 300;
      }
      if (scaledH <= viewport!.clientHeight) {
        minTy = maxTy = (viewport!.clientHeight - scaledH) / 2;
      } else {
        minTy = viewport!.clientHeight - scaledH - 300;
        maxTy = 300;
      }
      tx = Math.max(minTx, Math.min(maxTx, tx));
      ty = Math.max(minTy, Math.min(maxTy, ty));
    }

    // Zoom while keeping a given viewport-space point (px, py) visually anchored in place.
    function zoomAt(px: number, py: number, newScale: number) {
      newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, newScale));
      const canvasX = (px - tx) / scale;
      const canvasY = (py - ty) / scale;
      scale = newScale;
      tx = px - canvasX * scale;
      ty = py - canvasY * scale;
      clamp();
      apply();
    }

    function recenter() {
      scale = BASE_SCALE;
      tx = (viewport!.clientWidth - CANVAS_W * BASE_SCALE) / 2;
      ty = (viewport!.clientHeight - CANVAS_H * BASE_SCALE) / 2;
      apply();
    }

    // Staggered "fade + scale in" entrance, first visit only (original build-once
    // behavior). Any later mount -- a revisit, or Strict Mode's dev-only re-run of
    // this effect -- must still end with every card visible, so it adds .in directly.
    const entranceTimeouts: ReturnType<typeof setTimeout>[] = [];
    const cards = Array.from(canvas.querySelectorAll<HTMLElement>(".pg-card"));
    if (!hasBuilt) {
      hasBuilt = true;
      const order = cards.map((_, i) => i).sort(() => Math.random() - 0.5);
      order.forEach((cardIndex, seq) => {
        entranceTimeouts.push(
          setTimeout(() => {
            cards[cardIndex].classList.add("in");
          }, 40 + seq * 28)
        );
      });
    } else {
      cards.forEach((c) => c.classList.add("in"));
    }

    recenter();

    // Grab-and-move works from anywhere on the board, including on top of cards.
    const onMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("#zoom-controls")) return;
      isDown = true;
      startX = e.clientX;
      startY = e.clientY;
      startTx = tx;
      startTy = ty;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      tx = startTx + (e.clientX - startX);
      ty = startTy + (e.clientY - startY);
      clamp();
      apply();
    };
    const onMouseUp = () => {
      isDown = false;
    };

    // Wheel: plain scroll pans; Ctrl/Cmd + wheel zooms around the cursor.
    // Attached natively with passive:false -- React's synthetic onWheel is passive,
    // so preventDefault() there would be ignored and the page would scroll.
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.ctrlKey || e.metaKey) {
        const rect = viewport!.getBoundingClientRect();
        const factor = Math.exp(-e.deltaY * 0.0018);
        zoomAt(e.clientX - rect.left, e.clientY - rect.top, scale * factor);
      } else {
        tx -= e.deltaX;
        ty -= e.deltaY;
        clamp();
        apply();
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      touchId = t.identifier;
      startX = t.clientX;
      startY = t.clientY;
      startTx = tx;
      startTy = ty;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t.identifier !== touchId) return;
      tx = startTx + (t.clientX - startX);
      ty = startTy + (t.clientY - startY);
      clamp();
      apply();
    };

    const onZoomIn = () => zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, scale * 1.2);
    const onZoomOut = () => zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, scale / 1.2);
    const onZoomReset = () => zoomAt(viewport.clientWidth / 2, viewport.clientHeight / 2, BASE_SCALE);
    const onZoomFit = () => {
      const vw = viewport.clientWidth;
      const vh = viewport.clientHeight;
      const pad = 100;
      const fitScale = Math.min((vw - pad) / CANVAS_W, (vh - pad) / CANVAS_H);
      scale = Math.max(0.02, fitScale);
      tx = Math.round((vw - CANVAS_W * scale) / 2);
      ty = Math.round((vh - CANVAS_H * scale) / 2);
      apply();
    };

    viewport.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    viewport.addEventListener("wheel", onWheel, { passive: false });
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: true });
    zoomInRef.current?.addEventListener("click", onZoomIn);
    zoomOutRef.current?.addEventListener("click", onZoomOut);
    zoomLabel.addEventListener("click", onZoomReset);
    zoomFitRef.current?.addEventListener("click", onZoomFit);

    const zoomIn = zoomInRef.current;
    const zoomOut = zoomOutRef.current;
    const zoomFit = zoomFitRef.current;

    return () => {
      entranceTimeouts.forEach(clearTimeout);
      viewport.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      viewport.removeEventListener("wheel", onWheel);
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      zoomIn?.removeEventListener("click", onZoomIn);
      zoomOut?.removeEventListener("click", onZoomOut);
      zoomLabel.removeEventListener("click", onZoomReset);
      zoomFit?.removeEventListener("click", onZoomFit);
      document.documentElement.classList.remove("pg-mode");
    };
  }, []);

  return (
    <div className="w-full h-full" id="view-playground">
      <div id="pg-viewport" ref={viewportRef} className="w-full h-full">
        <div id="pg-canvas" ref={canvasRef} style={{ width: `${CANVAS_W}px`, height: `${CANVAS_H}px` }}>
          {PG_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`pg-card${hasBuilt ? " in" : ""}`}
              style={{
                left: `${item.x}px`,
                top: `${item.y}px`,
                width: `${item.w}px`,
                height: `${item.h}px`,
                "--r": `${item.r}deg`,
              } as React.CSSProperties}
            >
              <img src={item.src} loading="lazy" alt="" />
            </div>
          ))}
        </div>

        {/* Zoom control (top of board) */}
        <div
          id="zoom-controls"
          className="absolute top-20 lg:top-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-0.5 bg-white/90 backdrop-blur rounded-full shadow-lg px-1.5 py-1.5 select-none"
        >
          <button id="zoom-out" ref={zoomOutRef} className="zoom-btn" title="Zoom out">
            <i className="ri-subtract-line"></i>
          </button>
          <button id="zoom-reset" ref={zoomLabelRef} className="px-3 text-sm font-semibold tabular-nums min-w-[56px]" title="Reset to 100%">
            100%
          </button>
          <button id="zoom-in" ref={zoomInRef} className="zoom-btn" title="Zoom in">
            <i className="ri-add-line"></i>
          </button>
          <div className="w-px h-4 bg-gray-200 mx-1"></div>
          <button id="zoom-fit" ref={zoomFitRef} className="zoom-btn" title="Show entire board">
            <i className="ri-focus-3-line"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
