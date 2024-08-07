import emptyCartImage from '@/svg/illustration-empty-cart.svg';
import removeProductIcon from '@/svg/icon-remove-item.svg';
import { ProductInCart } from '@/types/ProductInCart';
import carbonNeutral from '@/svg/icon-carbon-neutral.svg'
import orderCompleted from '@/svg/icon-order-confirmed.svg'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { useState } from 'react';
import { Separator } from '../ui/separator';
interface CartProps {
  listOfCartProducts: ProductInCart[];
  setListOfCartProducts: React.Dispatch<React.SetStateAction<ProductInCart[]>>;
}

const Cart = ({ listOfCartProducts, setListOfCartProducts }: CartProps) => {
    const [isOpen, setIsOpen] = useState(false)
  const handleRemoveProduct = (productName: string) => {
    setListOfCartProducts(prevList => prevList?.filter(product => product.name !== productName));
  };
  const totalPrice = listOfCartProducts.reduce((total, product) => {
    return total + (product.amount * product.price);
  }, 0);
  console.log(listOfCartProducts)
  return (
    <div className='bg-rose50 w-full rounded-xl h-fit py-5 px-4 flex flex-col justify-center items-center'>
      <h1 className='text-red1 text-xl font-bold self-start'>Your Cart ({listOfCartProducts?.length})</h1>
      {listOfCartProducts?.length === 0 && (
        <>
          <img src={emptyCartImage} alt="Empty Cart" />
          <p>Your added items will appear here</p>
        </>
      )}
      {listOfCartProducts?.map((product, index) => (
        <div className='self-start border-b-2 w-full flex justify-between py-3 items-center' key={index}>
          <div>
            <span className='text-xs text-rose900 font-bold'>{product.name}</span>
            <div className='flex gap-2'>
              <span className='text-red1 font-bold'>{product.amount}x</span>
              <span className='text-rose300'><span className='text-xs'>@</span>${product.price}</span>
              <span className='text-rose500'>${(product.amount * product.price).toFixed(2)}</span>
            </div>
          </div>
          <div 
            className='border-2 rounded-3xl p-0.5 w-fit h-fit border-rose300 cursor-pointer'
            onClick={() => handleRemoveProduct(product.name)}
          >
            <img src={removeProductIcon} alt="Remove product" />
          </div>

        </div>
      ))}
     {
        totalPrice > 0 && (
          <div className='self-start  w-full flex justify-between mt-3 mb-2'>
            <span >Total Price:</span>
            <span className='text-rose900 text-lg font-bold'>${totalPrice.toFixed(2)}</span>
          </div>
        )
     }
     {  
        listOfCartProducts?.length > 0 && (
            <div className='w-full'>
                <div className='bg-rose100 w-full flex justify-center py-3 gap-1'>
                    <img src={carbonNeutral}/>
                    <span className='text-sm text-rose900'>This is <span className='font-bold'>carbon-neutral</span> delivery</span>
                </div>
                <Dialog>
                    <DialogTrigger className='rounded-3xl text-white bg-red1 font-bold py-2 text-sm mt-2 w-full' onClick={() => setIsOpen(true)}>
                        <button>Confirm Order</button> 
                    </DialogTrigger>
                    <DialogContent>
                    <DialogHeader>
                        <div >
                            <img className='w-10 aspect-square' src={orderCompleted} alt="Carbon Neutral" />
                        </div>
                        <span className="text-3xl font-bold text-rose900">Order Confirmed</span>
                        
                        <span className='text-rose400'>
                            We hope you enjoy your food!
                        </span>
                    </DialogHeader>
                    <div className='p-5 bg-rose50'>

                        {
                            listOfCartProducts.map((product) => {

                                return (
                                 <>
                                    <div className='flex justify-between  items-center mb-2'>
                                        <div className='flex gap-3 '>
                                            <img className=" w-14 aspect-square rounded"src={`/src/images/${product.imageUrl}`}></img>
                                            <div className='flex flex-col'>
                                                <span>{product.name}</span>
                                                <div className='flex gap-3'>
                                                    <span className='text-red1 font-bold'>{product.amount}x</span>
                                                    <span className='text-rose300'><span className='text-xs'>@</span>${product.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className='text-rose900 font-bold '>${(product.amount * product.price).toFixed(2)}</span>

                                    </div>
                                <Separator />
                                </>
                                )
                            })
                        }
                        
                    <div className='self-start  w-full flex justify-between mt-3'>
                        <span >Total Price:</span>
                        <span className='text-rose900 text-lg font-bold'>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className='rounded-3xl text-white bg-red1 py-2 text-sm mt-2 w-full flex justify-center'> Start new order</div>
                    </div>
                </DialogContent>
                </Dialog>
        
              
            </div>
        )
     }

    </div>
  );
}

export default Cart;
