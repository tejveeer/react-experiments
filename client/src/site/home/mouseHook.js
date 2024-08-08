import { useEffect, useState } from "react";

// see https://www.joshwcomeau.com/snippets/react-hooks/use-mouse-position/
export default function useMousePosition() {
  const [mouse, setMouse] = useState({ x: null, y: null });
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMouse({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);
  return mouse;
}
