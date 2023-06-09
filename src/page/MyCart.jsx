import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

const SHIPPING = 30;
export default function MyCart() {
  const { uid } = useAuthContext();
  const {
    getCart: { isLoading, data: products },
  } = useCart();

  if (isLoading) return <p>Loading...</p>;

  const hasProducts = products && products.length > 0;
  const totalPrice =
    hasProducts &&
    products.reduce(
      (prev, curr) => prev + parseInt(curr.price) * curr.quantity,
      0
    );
  return (
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>
        My Cart
      </p>
      {!hasProducts && <p>Cart is empty</p>}
      {hasProducts && (
        <>
          <ul className='border-b border-gray-300 mb-8 p-4 px-8 '>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} product={product} uid={uid} />
              ))}
          </ul>
          <div className='flex justify-between items-center mb-4 p-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill className='shrink-0' />
            <PriceCard text='배송비' price={SHIPPING} />
            <FaEquals className='shrink-0' />
            <PriceCard text='총 가격' price={totalPrice + SHIPPING} />
          </div>
          <Button text='주문하기' />
        </>
      )}
    </section>
  );
}
