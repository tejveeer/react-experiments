import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useGet } from "../utils/categoriesUtils";
import { UserContext } from "../utils/UserContext";

import MarkdownView from "react-showdown";

import getEnglishDate from "./englishDate";
import useMousePosition from "./mouseHook";

export default function Homepage() {
  const { isLoading, data: catInfo } = useGet(
    "http://localhost:2500/categories/information",
  );
  const { user } = useContext(UserContext);

  return (
    <div className="mx-auto w-2/3">
      <p>Hey {user.name}, the following projects are available for your use:</p>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          {Object.keys(catInfo).map((key) => (
            <Category categoryName={key} category={catInfo[key]} />
          ))}
        </div>
      )}
    </div>
  );
}

function Loading() {
  const [dots, setDots] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full rounded-md border-dashed border-slate-400 bg-slate-300 p-4 text-center text-[2em] text-slate-800">
      Loading{dots}
    </div>
  );
}

function Category({ categoryName, category, d = 0 }) {
  const [toggle, setToggle] = useState(false);
  const [isOnCategoryName, setIsOnCategoryName] = useState(false);
  const [isViewingDescription, setIsViewingDescription] = useState(false);

  let hasDescription, creationDate;
  if (category.meta) {
    hasDescription = category.meta?.description !== null;
    creationDate = getEnglishDate(category.meta?.date || "");
  } else {
    hasDescription = false;
    creationDate = "";
  }

  const onClickToggle = () => {
    setToggle((toggle) => !toggle);
    if (d === 0) {
      setIsViewingDescription((isViewingDescription) => !isViewingDescription);
    }
  };

  return (
    <>
      <div className={`${d === 1 ? "ml-2" : ""} mb-2 flex justify-between`}>
        <div className="flex items-center gap-2">
          {d === 1 ? (
            <View categoryName={categoryName} />
          ) : (
            <Toggle toggle={toggle} onClick={onClickToggle} />
          )}
          <CategoryName
            d={d}
            hasDescription={hasDescription}
            setIsOnCategoryName={setIsOnCategoryName}
            setIsViewingDescription={setIsViewingDescription}
            isViewingDescription={isViewingDescription}
            categoryName={categoryName}
          />
          {d === 1 && isOnCategoryName && (
            <HoverMessage isViewingDescription={isViewingDescription} />
          )}
        </div>
        <span className="text-sm italic">{creationDate}</span>
      </div>
      <div className="flex flex-col">
        {isViewingDescription && hasDescription && (
          <CategoryDescription
            mdDescription={hasDescription ? category.meta.description : ""}
          />
        )}
        {toggle &&
          Object.keys(category.folders).map((key) =>
            category.folders[key].hasIndex ? (
              <Category
                categoryName={key}
                category={category.folders[key]}
                d={1}
              />
            ) : null,
          )}
        {toggle &&
          category.files.map((key) => (
            <Category categoryName={key} category={{}} d={1} />
          ))}
      </div>
    </>
  );
}

function CategoryName({
  d,
  hasDescription,
  setIsOnCategoryName,
  setIsViewingDescription,
  isViewingDescription,
  categoryName,
}) {
  return (
    <h4
      className={`${d === 1 ? "font-light italic" : ""} m-0 ${d === 1 && hasDescription ? "cursor-pointer underline decoration-orange-600 decoration-dashed" : ""}`}
      onMouseEnter={() => setIsOnCategoryName(hasDescription && true)}
      onMouseLeave={() => setIsOnCategoryName(false)}
      onClick={() =>
        setIsViewingDescription(hasDescription && !isViewingDescription)
      }
    >
      {categoryName.split(".")[0]}
    </h4>
  );
}

function Toggle({ toggle, onClick }) {
  return (
    <span
      className={`cursor-pointer text-[10px] ${toggle ? "rotate-90" : ""} transition-transform duration-100`}
      onClick={onClick}
    >
      ▶
    </span>
  );
}

function View({ categoryName }) {
  const route = "/" + categoryName.split(".")[0];
  return (
    <Link
      className="rounded-sm bg-orange-700 px-1 text-sm text-white no-underline duration-200 hover:bg-orange-800"
      to={route}
    >
      View
    </Link>
  );
}

function HoverMessage({ isViewingDescription }) {
  const { x, y } = useMousePosition();
  return (
    <div
      style={
        x !== null && y !== null
          ? {
              position: "absolute",
              left: `${x - 50}px`,
              top: `${y - 25}px`,
            }
          : { display: "none" }
      }
      className={`z-10 text-nowrap rounded-md bg-teal-600 px-1 text-sm text-white`}
    >
      {isViewingDescription ? "Undo" : "View"} description
    </div>
  );
}

function CategoryDescription({ mdDescription }) {
  return (
    <>
      <div className="mb-2 flex w-full justify-center self-center rounded-md bg-orange-300 p-1 text-[13px]">
        <MarkdownView markdown={mdDescription} />
      </div>
    </>
  );
}
