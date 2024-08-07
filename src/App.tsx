
import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Product from "./components/Product/Product";
import { deserts } from "./mock";
import { Desert } from "./types/Desert";
import { ProductInCart } from "./types/ProductInCart";

function App() {
  const [listOfCartProducts, setListOfCartProducts] = useState<ProductInCart[]>([])
  // Add a product to the car
  return (
    <div className="p-24 bg-rose100 flex gap-6 ">
      <div>
        <span className="font-bold text-3xl">Desserts</span>
        <ul className="grid grid-cols-3 gap-6 w-[60vw] mt-7">
          {deserts.map((desert: Desert, index: number) => (
            <Product key={index} desert={desert} listOfCartProducts={listOfCartProducts} setListOfCartProducts={setListOfCartProducts} />
          ))}
        </ul>
      </div>
      <Cart listOfCartProducts={listOfCartProducts} setListOfCartProducts={setListOfCartProducts}/>
    </div>
  );
}

export default App;




