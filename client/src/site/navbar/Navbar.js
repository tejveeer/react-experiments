import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/UserContext";
import { NavbarSearch } from "./NavbarSearch";

import _ from "lodash-es";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function Navbar() {
  const location = useLocation();

  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(true);

  useShortcut({
    shortcut: ["alt", "shift", "A"],
    onShortcut: () =>
      setShow((show) => {
        const navbarShow = Boolean(Cookies.get("navbar-show"));
        console.log("cookies.get", navbarShow);
        if (navbarShow === undefined) {
          Cookies.set("navbar-show", !show);
          console.log("undefined", !show);
          return !show;
        } else {
          Cookies.set("navbar-show", !navbarShow);
          console.log("defined", Cookies.get("navbar-show"));
          return !navbarShow;
        }
      }),
  });

  function logout() {
    Cookies.remove("user");
    setUser({ name: "", email: "", userId: "", roles: [] });
  }

  return (
    <>
      <div
        id="nav"
        className={`${!show ? "hidden" : ""} relative flex h-[26px] flex-shrink-0 bg-teal-500 px-1 opacity-60`}
      >
        <ul className="hidden w-full list-none justify-between p-0 text-sm text-black sm:flex">
          <li className="self-center px-1">
            User (
            {user.name ? user.name : <span className="font-semibold">nil</span>}
            )
          </li>
          <li
            className="cursor-pointer self-center rounded-md px-1 duration-200 hover:bg-teal-600"
            onClick={logout}
          >
            Logout
          </li>
        </ul>
        {location.pathname !== "/homepage" && user.name ? (
          <NavbarSearch location={location} />
        ) : null}
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
