import React, { useEffect } from "react";

export default function Face({ eyesClass }: { eyesClass: string }) {
  useEffect(() => {
    const eyeball = (event: MouseEvent) => {
      const eyeArray = document.querySelectorAll(".eye");
      eyeArray.forEach(function (eye) {
        const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
        const y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
        const radian = Math.atan2(event.pageX - x, event.pageY - y);
        const rot = radian * (180 / Math.PI) * -1 + 270;
        const eyeElement = eye as HTMLElement;
        eyeElement.style.transform = `rotate(${rot}deg)`;
      });
    };

    document.addEventListener("mousemove", eyeball);

    return () => {
      document.removeEventListener("mousemove", eyeball);
    };
  }, []);

  return (
    <div className="flex scale-50 content-center justify-center">
      <div className="face bg-indigo-300">
        <div className="eyes">
          <div className={`eye bg-cyan-50 ${eyesClass}`}></div>
          <div className={`eye bg-cyan-50 ${eyesClass}`}></div>
        </div>
      </div>
    </div>
  );
}
