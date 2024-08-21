import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { NavbarSearch } from "./NavbarSearch";

import _ from "lodash-es";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

const toBool = (val) =>
  val === "true" ? true : val === "false" ? false : undefined;

export default function Navbar() {
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(() => {
    const showNavbar = toBool(Cookies.get("show-navbar"));
    if (showNavbar === undefined) {
      return true;
    }
    return showNavbar;
  });

  useShortcut({
    shortcut: ["alt", "shift", "A"],
    onShortcut: () =>
      setShow((show) => {
        Cookies.set("show-navbar", !show);
        return !show;
      }),
  });

  function logout() {
    Cookies.remove("user");
    setUser({ name: "", email: "", userId: "", roles: [] });
  }

  return (
    <>
      <nav
        className={`${!show ? "hidden" : ""} relative z-10 flex h-[26px] flex-shrink-0 bg-teal-500/60 px-1`}
      >
        <ul className="hidden w-full list-none justify-between p-0 text-sm text-black sm:flex">
          <li className="self-center px-1">
            User (
            {user.name ? user.name : <span className="font-semibold">nil</span>}
            )
          </li>
          <li
            className="cursor-pointer self-center rounded-md px-1 opacity-100 duration-200 hover:bg-teal-600/60"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
        {location.pathname !== "/homepage" && user.name ? (
          <NavbarSearch location={location} />
        ) : null}
      </nav>
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
