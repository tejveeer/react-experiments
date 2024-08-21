export default function Cart({ cartState }) {
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
