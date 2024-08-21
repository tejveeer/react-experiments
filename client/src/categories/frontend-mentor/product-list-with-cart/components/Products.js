import { useState } from "react";
import data from "../data.json";
import useImage from "../imageHooks";

export default function Products() {
  return (
    <>
      <div>
        <div className="mb-3 text-[1.5rem] font-bold">Desserts</div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {data.map((productInformation, idx) => (
            <Product key={idx} information={productInformation} />
          ))}
        </div>
      </div>
    </>
  );
}

function Product({ information }) {
  return (
    <>
      <div className="border-box flex flex-col border-solid">
        <ProductDisplay
          imagePath={information.image.desktop}
          price={information.price}
        />
        <ProductDescription
          category={information.category}
          name={information.name}
          price={information.price}
        />
      </div>
    </>
  );
}

function ProductDisplay({ imagePath, price }) {
  const { image } = useImage(imagePath);
  return (
    <>
      <div className="relative">
        <img alt="" src={image} className="w-full h-full object-fill" />
        <AddItem price={price} />
      </div>
    </>
  );
}

function AddItem({ price }) {
  const [amount, setAmount] = useState(0);
  return (
    <>
      <button className="absolute" onClick={() => {}}>
        Add to Cart
      </button>
    </>
  );
}

function ProductDescription({ category, name, price }) {
  return (
    <>
      <div className="flex flex-col">
        <span>{category}</span>
        <span>{name}</span>
        <span>{price}</span>
      </div>
    </>
  );
}
