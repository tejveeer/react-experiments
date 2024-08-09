import _ from "lodash-es";
import { useEffect, useState } from "react";

export default function Experiment() {
  const [count, setCount] = useState(0);

  useShortcut({
    shortcut: ["alt", "shift", "K"],
    onShortcut: () => setCount((count) => count + 1),
  });
  useShortcut({
    shortcut: ["alt", "shift", "J"],
    onShortcut: () => setCount((count) => count > 0 ? count - 1 : count),
  });

  return (
    <>
      <p className="mx-auto w-1/2">
        Use
        <span className="mx-1 rounded-md bg-slate-200 p-1 text-sm font-semibold">
          Alt+Shift+K
        </span>
        to add divs, and use
        <span className="mx-1 rounded-md bg-slate-200 p-1 text-sm font-semibold">
          Alt+Shift+J
        </span>
        to subtract divs.
      </p>
      {_.range(1, count + 1).map((it) => (
        <div className="mb-2 rounded-md bg-orange-200 px-2 text-center text-orange-900">
          {it}
        </div>
      ))}
    </>
  );
}

function useShortcut({ shortcut, onShortcut }) {
  const keyMapping = {
    shift: "shiftKey",
    alt: "altKey",
    ctrl: "ctrlKey",
  };

  useEffect(() => {
    function keyDown(e) {
      const isKey = _.every(
        shortcut.map((k) => {
          if (k.length === 1) {
            return e.key === k;
          }

          return e[keyMapping[k]];
        }),
      );

      if (isKey) {
        onShortcut();
      }
    }

    document.addEventListener("keydown", keyDown);

    return () => {
      document.removeEventListener("keydown", keyDown);
    };
  }, []);
}
