
import { Card, CardContent, CardHeader } from '../ui/card'
import { Desert } from '@/types/Desert'
import AddToCart from './AddToCart'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ProductInCart } from '@/types/ProductInCart'

function Product({
    desert,
    listOfCartProducts,
    setListOfCartProducts
}:{
    desert:Desert, 
    listOfCartProducts: ProductInCart[],
    setListOfCartProducts:Dispatch<SetStateAction<ProductInCart[]>>
}) {
    const [amountOfProduct,setAmountOfProduct] = useState(0)

    useEffect(() => {
        const productInCart = listOfCartProducts?.find(
          (product) => product.name === desert.name
        );
        setAmountOfProduct(productInCart ? productInCart.amount : 0);
      }, [desert.name, listOfCartProducts]);

  return (
    <li className="aspect-square " key={desert.name}>
        <Card className='bg-rose100'>
            <CardHeader className='flex items-center relative mb-10'>
                <img
                    className='rounded-lg '
                    src={`/src/images/${desert.image}`}
                    alt={desert.name}
                />
                <AddToCart desert={desert} amountOfProducts={amountOfProduct} listofCartProducts={listOfCartProducts} setListOfCartProducts={setListOfCartProducts}/>
            </CardHeader>
            <CardContent>
                <h1 className="text-sm text-rose500">{desert.category}</h1>
                <h2 className="text-lg font-bold text-rose900">{desert.name}</h2>
                <h3 className="text-lg text-red1 font-bold">${desert.price.toFixed(2)}</h3>
            </CardContent>
        </Card>
    </li>
  )
}

export default Product