export function ExistentialTransition({
  trigger,
  outerStyles,
  innerStyles,
  children,
}) {
  return (
    <>
      <div
        className={`grid ${trigger ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} transition-[grid] duration-300 ease-in-out ${outerStyles}`}
      >
        <div className={`overflow-hidden ${innerStyles}`}>
          {children}
        </div>
      </div>
    </>
  );
}
