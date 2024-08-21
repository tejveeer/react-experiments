import { useState } from "react";

export default function ProductPage() {
  // use zustand or some minimal state management solution that doesn't require redux
  const cartState = {
    itemsAmount: 0,
    totalPrice: 0,
    items: [],
  };

  return (
    <>
      <div className="h-full">
        <Products productType={""} productsList={[]} />
        <Cart cartState={cartState} />
        <ConfirmationModal cartState={cartState} />
      </div>
    </>
  );
}

function Products({ productType, productsList }) {
  return (
    <>
      <div>
        <div>{productType}</div>
        <div>
          {productsList.map((productInformation, idx) => (
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
      <div>
        <ProductDisplay imagePath={null} price={null} />
        <ProductDescription name={null} descriptiveName={null} price={null} />
      </div>
    </>
  );
}

function ProductDisplay({ imagePath, price }) {
  const image = null;
  return (
    <>
      <div className="relative">
        <img alt="">{image}</img>
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

function ProductDescription({ name, descriptiveName, price }) {
  return (
    <>
      <div className="flex flex-col">
        <span>{name}</span>
        <span>{descriptiveName}</span>
        <span>{price}</span>
      </div>
    </>
  );
}

function Cart({ cartState }) {
  return (
    <>
      <div>
        <h3>Your Cart ({cartState.itemsAmount})</h3>
        <CartItems items={cartState.items} />
        <TotalOrder totalAmount={cartState.totalAmount} />
        <ConfirmOrder />
      </div>
    </>
  );
}

function CartItems({ items }) {
  return (
    <>
      <div>
        {items.map((item, idx) => (
          <CartItem key={idx} item={item} />
        ))}
      </div>
    </>
  );
}

function CartItem({ item }) {
  return (
    <>
      <div className="relative">
        <p>{item.descriptiveName}</p>
        <span>{item.amount}</span>
        <span>{item.price}</span>
        <span>{item.totalPrice}</span>
        <RemoveItem item={item} />
      </div>
    </>
  );
}

function RemoveItem({ item }) {
  return (
    <>
      <button className="absolute"></button>
    </>
  );
}

function TotalOrder({ totalAmount }) {
  return (
    <>
      <div>
        <span>Order Total</span>
        <span>{totalAmount}</span>
      </div>
    </>
  );
}

function ConfirmOrder() {}
function ConfirmationModal() {}
