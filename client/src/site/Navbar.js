import { useContext, useEffect, useState } from "react";
import { UserContext } from "./utils/UserContext";
import {
  useDropdownState,
  DropdownModal,
  actions,
} from "./home/utils/DropdownModal";

import _ from "lodash-es";

import { useLocation } from "react-router-dom";
import { useImportablePaths, useQCache } from "./utils/categoriesUtils";

export default function Navbar() {
  const [folderState, folderDispatch] = useDropdownState(null);
  const [fileState, fileDispatch] = useDropdownState(null);

  usePathOptionsInitialier(folderDispatch, fileDispatch);

  const [show, setShow] = useState(true);
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
          <li className="flex gap-2">
            <DropdownModal state={folderState} dispatch={folderDispatch} />
            <DropdownModal state={fileState} dispatch={fileDispatch} />
          </li>
          <li>Test</li>
        </ul>
      </div>
    </>
  );
}

function usePathOptionsInitialier(folderDispatch, fileDispatch) {
  const location = useLocation();
  const importablePaths = useQCache("importable-paths");

  useEffect(() => {
    console.log("called effect");
    if (!importablePaths) return;

    const [currentFolder, currentFile] = location.pathname
      .replaceAll("/", " ")
      .trim()
      .split(" ");

    const folders = new Set(importablePaths.map((path) => path.split("/")[0]));
    const files = new Set(
      importablePaths.map((path) => path.split("/")[1].replace(".js", "")),
    );

    let folderOptions = [];
    folders.forEach((folder) => {
      folderOptions.push({
        option: folder,
        selected: folder === currentFolder,
      });
    });

    let fileOptions = [];
    files.forEach((file) => {
      fileOptions.push({
        option: file,
        selected: file === currentFile,
      });
    });

    folderDispatch({
      type: actions.INITIALIZE_OPTIONS,
      payload: {
        options: folderOptions,
      },
    });
    fileDispatch({
      type: actions.INITIALIZE_OPTIONS,
      payload: {
        options: fileOptions,
      },
    });
  }, [importablePaths, location]);
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
