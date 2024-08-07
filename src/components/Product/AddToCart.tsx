import addToCartIcon from '@/svg/icon-add-to-cart.svg';
import plusIcon from "@/svg/icon-increment-quantity.svg";
import minusIcon from '@/svg/icon-decrement-quantity.svg';
import { Dispatch, SetStateAction } from 'react';
import { Desert } from '@/types/Desert';
import { ProductInCart } from '@/types/ProductInCart';

interface AddToCartProps {
  listofCartProducts: ProductInCart[];
  amountOfProducts: number;
  setListOfCartProducts: Dispatch<SetStateAction<ProductInCart[]>>;
  desert: Desert;
}

const AddToCart = ({
  amountOfProducts,
  listofCartProducts = [],
  setListOfCartProducts,
  desert
}: AddToCartProps) => {

  const handleAddProduct = () => {
    setListOfCartProducts((prevList = []) => {
      const productIndex = prevList.findIndex(product => product.name === desert.name);
      if (productIndex === -1) {
        // Product does not exist, add it with amount 1 and set the price
        return [...prevList, { name: desert.name, amount: 1, price: desert.price, imageUrl: desert.image }];
      } else {
        // Product exists, increment the amount
        const updatedList = [...prevList];
        updatedList[productIndex].amount += 1;
        return updatedList;
      }
    });
  };

  const handleRemoveProduct = () => {
    setListOfCartProducts((prevList = []) => {
      const productIndex = prevList.findIndex(product => product.name === desert.name);
      if (productIndex !== -1) {
        const updatedList = [...prevList];
        if (updatedList[productIndex].amount > 1) {
          // Decrement the amount
          updatedList[productIndex].amount -= 1;
        } else {
          // Remove the product from the cart if the amount is 1
          updatedList.splice(productIndex, 1);
        }
        return updatedList;
      }
      return prevList;
    });
  };

  return ( 
    <>
      {amountOfProducts === 0 ? 
        <div 
          className="gap-1 bg-rose50 border-rose500 rounded-3xl px-5 flex justify-center py-2.5 border-2 absolute bottom-0 transform translate-y-1/2 w-40 "
          onClick={handleAddProduct}
        >   
          <img src={addToCartIcon} alt="Add to cart" />
          <span className='font-bold'>Add to Cart</span> 
        </div> :
        <div className="gap-1 bg-red1 rounded-3xl px-5 flex py-2.5 border-2 absolute bottom-0 transform translate-y-1/2 w-40 justify-between">
          <div 
            onClick={handleAddProduct}
            className="border-2 border-white flex items-center p-1 rounded-3xl justify-center"
          >
            <img src={plusIcon} alt="Increase quantity" />
          </div>
          <span className='text-white'>{amountOfProducts}</span>
          <div 
            onClick={handleRemoveProduct}
            className="border-2 border-white flex items-center p-1 rounded-3xl justify-center"
          >
            <img src={minusIcon} alt="Decrease quantity" />
          </div>
        </div>
      }
    </>
  );
};

export default AddToCart;
