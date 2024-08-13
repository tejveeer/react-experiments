import { useEffect, useState } from "react";

export default function Experiment() {
  return (
    <div className="mx-auto flex w-3/4 gap-4 p-4">
      <div className="">
        <h1>Heading 1</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cupiditate
        nulla, aliquid perferendis nihil aut, numquam iste, eos consequuntur
        odit tempora illo ipsa quo esse dicta labore debitis necessitatibus
        delectus.
        <h1>Heading 2</h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
        consectetur ipsum totam quaerat dolorem sequi ex at non iusto, molestias
        possimus eveniet minima est exercitationem repellendus aspernatur error
        quia similique? Veniam obcaecati laboriosam delectus assumenda nam.
        Ipsam voluptas tempore ducimus mollitia blanditiis maxime quos beatae ea
        laboriosam quam iure quo harum error, doloremque veritatis saepe, in
        eveniet deleniti aperiam? Nesciunt. Excepturi, molestiae id! Natus
        laboriosam, voluptates quae numquam ratione excepturi adipisci deleniti
        enim earum quidem consectetur est ab sed cum, aperiam suscipit
        laudantium minus, nihil officia cumque mollitia? Animi, voluptatibus!
        <h2>Subheading 1</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellat,
        dignissimos iure facere laudantium cum. Provident maiores, accusantium
        in ipsam sed obcaecati unde illum aliquid voluptatem quaerat quos?
        Facilis, veritatis!
        <h1>Heading 3</h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Non cupiditate
        nulla, aliquid perferendis nihil aut, numquam iste, eos consequuntur
        odit tempora illo ipsa quo esse dicta labore debitis necessitatibus
        delectus.
        <h2>Subheading 2</h2>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellat,
        dignissimos iure facere laudantium cum. Provident maiores, accusantium
        in ipsam sed obcaecati unde illum aliquid voluptatem quaerat quos?
        Facilis, veritatis!
        <h1>Heading 4</h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet
        consectetur ipsum totam quaerat dolorem sequi ex at non iusto, molestias
        possimus eveniet minima est exercitationem repellendus aspernatur error
        quia similique? Veniam obcaecati laboriosam delectus assumenda nam.
        Ipsam voluptas tempore ducimus mollitia blanditiis maxime quos beatae ea
        laboriosam quam iure quo harum error, doloremque veritatis saepe, in
        eveniet deleniti aperiam? Nesciunt. Excepturi, molestiae id! Natus
        laboriosam, voluptates quae numquam ratione excepturi adipisci deleniti
        enim earum quidem consectetur est ab sed cum, aperiam suscipit
        laudantium minus, nihil officia cumque mollitia? Animi, voluptatibus!
      </div>
      <Sidebar />
    </div>
  );
}

function Sidebar() {
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    const headings = document.querySelectorAll("h1");
    setHeadings(Array.from(headings).map((heading) => heading.innerHTML));
  }, []);

  return (
    <div className="sticky top-4 flex h-min min-w-max flex-col gap-1 border-solid border-y-0 border-r-0 px-2">
      {headings.map((heading) => (
        <div>{heading}</div>
      ))}
    </div>
  );
}
