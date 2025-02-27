// pages/cart.jsx
"use client";
import Link from 'next/link';
import { useCart } from '../../components/context/CartContext';
import { Button } from '../../components/ui/button';
import { ChevronLeft } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8 pt-20">
      <div className='flex flex-row p-4'>
      <Button className="bg-transparent shadow-none">
        <Link href="/"><ChevronLeft className="mr-2 h-4 w-4 text-black hover:text-white" /></Link>
      </Button>
      <h1 className="text-3xl font-bold mb-8 mx-6">Your Cart</h1>
      </div>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.name} className="flex justify-between items-center border-b pb-4">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.name)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={clearCart}
            className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}