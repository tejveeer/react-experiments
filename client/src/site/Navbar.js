import { useContext, useEffect, useState } from "react";
import { UserContext } from "./utils/UserContext";
import { useDropdownState, DropdownModal } from "./home/utils/DropdownModal";

import _ from "lodash-es";

import { useLocation } from "react-router-dom";
import { useQCache } from "./utils/categoriesUtils";
import {
  changeOptionSelectionDispatcher,
  initializeOptionsDispatcher,
  switchDropdownVisibilityDispatcher,
} from "./home/utils/dropdownDispatcher";

export default function Navbar() {
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(true);

  useShortcut({
    shortcut: ["alt", "shift", "A"],
    onShortcut: () => setShow((show) => !show),
  });

  const location = useLocation();
  const importablePaths = useQCache("importable-paths");

  const [folderState, folderDispatch] = useDropdownState(null);
  const [fileState, fileDispatch] = useDropdownState(null);

  usePathOptionsInitialier(
    location,
    importablePaths,
    folderDispatch,
    fileDispatch,
  );

  function selectFolderOption() {}

  function onFolderDropdownClick() {
    if (fileState.options.length === 0 || fileState.visible) return;

    const fileSelections = fileState.options.filter(
      (option) => option.selected,
    );
    if (fileSelections.length !== 0) {
      const [{ option }] = fileSelections;
      changeOptionSelectionDispatcher(fileDispatch, option);
    }

    switchDropdownVisibilityDispatcher(folderDispatch);
  }
  function onFileDropdownClick() {
    if (folderState.options.length === 0 || folderState.visible) return;

    const folderSelections = folderState.options.filter(
      (option) => option.selected,
    );
    if (folderSelections.length === 0) return;

    switchDropdownVisibilityDispatcher(fileDispatch);
  }

  return (
    <>
      <div
        id="nav"
        className={`${!show ? "hidden" : ""} border-[2px] border-x-0 border-t-0 border-solid border-teal-600 bg-teal-500 px-1 opacity-60`}
      >
        <ul className="flex w-full list-none justify-between p-0">
          <li>User ({user.name})</li>
          <li className="flex gap-2">
            <DropdownModal
              state={folderState}
              dispatch={folderDispatch}
              onDropdownClick={onFolderDropdownClick}
            />
            <DropdownModal
              state={fileState}
              dispatch={fileDispatch}
              onDropdownClick={onFileDropdownClick}
            />
          </li>
          <li>Test</li>
        </ul>
      </div>
    </>
  );
}

function usePathOptionsInitialier(
  location,
  importablePaths,
  folderDispatch,
  fileDispatch,
) {
  useEffect(() => {
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

    initializeOptionsDispatcher(folderDispatch, folderOptions);
    initializeOptionsDispatcher(fileDispatch, fileOptions);
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
