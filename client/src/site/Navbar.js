import { useContext, useEffect, useState } from "react";
import { UserContext } from "./utils/UserContext";

import _ from "lodash-es";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [show, setShow] = useState(true);

  const location = useLocation();
  const { user } = useContext(UserContext);

  useShortcut({
    shortcut: ["alt", "shift", "A"],
    onShortcut: () => setShow((show) => !show),
  });

  return (
    <>
      <div
        id="nav"
        className={`${!show ? "hidden" : ""} border-[2px] border-x-0 border-t-0 border-solid border-teal-600 bg-teal-500 px-1 opacity-60`}
      >
        <ul className="flex w-full list-none justify-between p-0">
          <li>User ({user.name})</li>
          <li>Test</li>
        </ul>
      </div>
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
