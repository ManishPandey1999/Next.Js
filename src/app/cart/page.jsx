"use client"

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image'
import { X } from "lucide-react";
import Link from 'next/link';

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [cart, setCart] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    fetch('/api/dataroute')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json();
    })
    .then(data => setCartData(data.productData || []))
    .catch(error => console.error(error))
  }, []);

  useEffect(() => {
    setTotalProduct(Object.keys(cart).length);
  }, [cart]);

  useEffect(() => {
    const storedCart = localStorage.getItem('ToCart')
    if(storedCart && storedCart !== JSON.stringify(cart)){
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    if (JSON.stringify(cart) !== localStorage.getItem('ToCart')){
      localStorage.setItem('ToCart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const total = Object.keys(cartItems).reduce((sum, id) => {
      const quantity = cartItems[id] || 1;
      const prices = cartData.find(item => item.id == id)?.price || 0;
      return sum + (quantity * prices);
    },  0);
    setTotalAmount(total);
  }, [cartItems, cartData, cart]);


  const removeFromCart = (productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];  
      return updatedCart;
    });

    setCartItems(prevCartItems => {
      const updatedCartItems = { ...prevCartItems };
      delete updatedCartItems[productId];  
      return updatedCartItems;
    });
  };
  

  const cartItem = useMemo(() => {
    if (!cartData.length) return [];
    return cartData.filter(product => cart[product.id])
  }, [cartData, cart]);

  return (
    <>
      <section className="main_cart_container">
        <div className="main_cart_row mt-[50px] px-[50px]">
          <h1 className="cart_main_head mb-5 flex items-center">
            <span className="cart_main_head_span text-3xl font-bold">Your Cart</span>
            <div className='ms-5 text-sm px-3 py-1 rounded bg-yellow-600 text-white font-bold'>
              Total product: 
              <span className='total_cart_product'> {totalProduct}</span>
            </div>
          </h1>
          <div className="main_cart_column main_cart_column_1">
            {
              cartItem.length > 0 ? (
              <>
                <table className="main_cart_table_container border-separate border-spacing-5 w-full table-fixed">
                  <thead className='main_cart_table_head'>
                    <tr className='text-left text-base text-gray-600'>
                      <th className='w-[500px]'><span className='ps-5'>Item</span></th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody className='main_cart_table_body'>
                  {
                    cartItem.map((item, index) => (               
                      <tr className='shadow rounded total_cart_length' key={index}>
                        <td className='flex gap-3 items-center'>
                          <div className="cart_img_container px-3 py-2">
                            <Image className='max-w-[100px] h-[80px] rounded' src={item.image} width={200} height={200} alt='Cart Images' />
                          </div>
                          <div className='cart_info_conainer pe-4'>
                            <h3 className='mb-1 font-semibold text-gray-600 drop-shadow-sm'>{item.productName}</h3>
                            <p className='text-sm text-gray-600'>{item.productInfo}</p>
                          </div>
                        </td>
                        <td>
                          <span className='cart_product_total_price text-sm'>₹{item.price}</span>
                        </td>
                        <td>
                          <div className="cart_quantity_container text-sm">
                            <button className="cart_quantity_button minus_btn px-3 py-1 me-2 border rounded" 
                              onClick={() => {
                                setCartItems(prev => {
                                  const newQuantity = Math.max(0, (prev[item.id] || 1) - 1);
                                  return {
                                    ...prev,
                                    [item.id]: newQuantity
                                  };
                                });
                              }}
                            >-</button>
                            <span className='cart_quantity_number'>{Number(cartItems[item.id] || 1)}</span>
                            <button className="cart_quantity_button plus_btn px-3 py-1 ms-2 border rounded" 
                              onClick={() => {
                                setCartItems(prev => {
                                  const newQuantity = Math.min(item.totalProduct, (prev[item.id] || 1) + 1);
                                  return {
                                    ...prev,
                                    [item.id]: newQuantity
                                  };
                                });
                              }}
                            >+</button>
                          </div>
                        </td>
                        <td className=''>
                          <span className='cart_total text-sm'>${(cartItems[item.id] || 1) * item.price}</span>                    
                        </td>
                        <td>
                          <button className='cart_remove_button' onClick={() => removeFromCart(item.id)}><X size={20} /></button>
                        </td>
                      </tr>
                    ))
                  }
                  </tbody>
                </table>
                <div className="total_cart_amount_container mb-5 mt-3 flex items-center justify-end me-4 gap-3">
                  <div className='px-3 py-2 bg-yellow-600 text-white text-[15px] font-bold rounded'> <span className='amnt_text'>Total amount:</span> <span className='totalCartPrice'>₹{totalAmount}</span></div>
                  <div className='buy_now'>
                    <button className={`px-3 py-2 bg-blue-950 text-white border-0 text-[15px] rounded ${totalAmount > 0 ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`}>
                      {totalAmount > 0 ? 'Buy Now' : 'Add item'}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <p className="text-lg">Your cart is empty.</p>
                <Link href="/" className="mt-4 inline-block bg-blue-950 text-white px-4 py-2 rounded">
                    Continue Shopping
                </Link>
              </div>
            )}
          </div>
          <div className="main_cart_column main_cart_column_1"></div>
          <div className="main_cart_column main_cart_column_1"></div>
        </div>
      </section>
    </>
  )
}

export default Cart