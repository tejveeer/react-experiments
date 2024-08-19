import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { NavbarSearch } from "./NavbarSearch";

import _ from "lodash-es";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(true);

  useShortcut({
    shortcut: ["alt", "shift", "A"],
    onShortcut: () => setShow((show) => !show),
  });

  return (
    <>
      <div
        id="nav"
        className={`${!show ? "hidden" : ""} relative flex h-[26px] flex-shrink-0 border-[2px] border-x-0 border-t-0 border-solid border-teal-600 bg-teal-500 px-1 opacity-60`}
      >
        <ul className="hidden w-full list-none justify-between p-0 md:flex">
          <li className="self-center">
            User ({user.name !== null ? user.name : "Null"})
          </li>
          <li className="self-center">Logout</li>
        </ul>
        <NavbarSearch />
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
  });
}

function useLogout() {}
