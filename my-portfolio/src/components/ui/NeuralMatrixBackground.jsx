import React, { useEffect, useRef } from "react";

const NeuralMatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;

    // --- Configuration ---
    const FONT_SIZE = 14;
    const columns = Math.ceil(window.innerWidth / FONT_SIZE);
    const drops = new Array(columns).fill(1);
    
    // AI & Cloud symbols mixed with binary
    const charSet = "010101λμ∫Σπ<>{}[]/_+*&^%$";
    const chars = charSet.split("");

    let mouse = { x: -1000, y: -1000 };

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      // 1. Create a trailing effect with a very faint black overlay
      ctx.fillStyle = "rgba(10, 10, 10, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw the Grid (Subtle background texture)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      }

      // 3. Draw the Digital Rain
      ctx.font = `${FONT_SIZE}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Proximity check for interactivity
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction: Change color and character if mouse is near
        if (dist < 700) {
          ctx.fillStyle = "#22d3ee"; // Bright Cyan
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        } else {
          // Standard Rain: Faint grey/cyan
          ctx.fillStyle = Math.random() > 0.95 ? "#0891b2" : "#1e293b";
          ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y);
        }

        // Reset drop to top randomly
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment position (varying speeds)
        drops[i] += Math.random() > 0.5 ? 1 : 0.5;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("resize", init);
    window.addEventListener("mousemove", handleMouseMove);

    init();
    draw();

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#0a0a0a] pointer-events-none">
      {/* Vignette to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0a0a_100%)] z-10" />
      
      <canvas ref={canvasRef} className="block w-full h-full opacity-40" />
    </div>
  );
};

export default NeuralMatrixBackground;