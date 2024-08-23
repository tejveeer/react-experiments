import Products from "./components/Products";
import Cart from "./components/Cart";
import ConfirmationModal from "./components/ConfirmationModal";

export default function ProductPage() {
  const cartState = {
    itemsAmount: 0,
    totalPrice: 0,
    items: [],
  };

  return (
    <>
      <div className="[&_*]:font-redhat box-border grid h-full p-8 sm:grid-cols-[auto_300px] sm:p-12 gap-6">
        <Products />
        <Cart cartState={cartState} />
        <ConfirmationModal cartState={cartState} />
      </div>
    </>
  );
}
