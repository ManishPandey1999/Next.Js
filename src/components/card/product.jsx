'use client'
import React, { useEffect, useState } from 'react'

function Product() {

    const [productData, setProductData] = useState([]);
    const [addToCart, setAddToCart] = useState({});

    useEffect(() => {
        fetch('/api/dataroute')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(product => setProductData(product.productData))
        .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const storedCartProduct = localStorage.getItem('ToCart');
        if(storedCartProduct){
            setAddToCart(JSON.parse(storedCartProduct));
        }
    }, []);

    function toggleInCart(productId) {
        setAddToCart((prevCart) => {
            const updateCart = {
                ...prevCart,
                [productId]: !prevCart[productId],
            }
            localStorage.setItem('ToCart', JSON.stringify(updateCart));
            return updateCart;
        });
    }
    
  return (
    <>
        <section className="main_product_card_container px-[80px] mb-[40px] mt-[65px]">
            <div className="product_card_head">
                <h2 className='mb-5 text-2xl font-bold'>Item name</h2>
            </div>
            <div className="product_card_body grid grid-cols-4 gap-5">
                {
                    productData.map((productItem) => {
                        return(
                            <div key={productItem.id} className="product_card_col flex py-2 px-3 bg-white shadow rounded">
                                <div className='flex flex-col justify-between items-center'>
                                    <div className="product_image flex items-center justify-center w-full h-auto max-h-[170px] overflow-hidden mb-3">
                                        <img src={productItem.image} alt="" className='rounded' />
                                    </div>
                                    <div className="product_deatils">
                                        <h3 className='text-lg font-medium mb-2'>{productItem.productName}</h3>
                                        <p className='text-sm/[20px] mb-4'>{productItem.productInfo}</p>
                                    </div>
                                    <div className="product_price flex items-center justify-between w-full">
                                        <span className='text-base rounded font-bold'>₹{productItem.price}</span>
                                        <div className='flex items-center justify-center gap-1'>
                                            <button className={`text-xs rounded px-2 py-2 border border-blue-950 shadow ${addToCart[productItem.id] ? 'bg-white text-black' : 'bg-blue-950 text-white'}`} onClick={() => toggleInCart(productItem.id)}>
                                                {addToCart[productItem.id] ? 'Remove from cart' : 'Add to cart'}
                                            </button>
                                            <button className='text-xs bg-blue-950 border border-blue-950 text-white rounded px-2 py-2 shadow'>Buy Now</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    </>
  )
}

export default Product