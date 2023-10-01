import React, { useState } from 'react'
import CardProduct from '../../components/cardproduct/CardProduct'

export default function ProductDetail() {

    
    const [images, setImages] = useState({
        img1: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,b_rgb:f5f5f5/3396ee3c-08cc-4ada-baa9-655af12e3120/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img2: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/e44d151a-e27a-4f7b-8650-68bc2e8cd37e/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img3: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/44fc74b6-0553-4eef-a0cc-db4f815c9450/scarpa-da-running-su-strada-invincible-3-xk5gLh.png",
        img4: "https://static.nike.com/a/images/f_auto,b_rgb:f5f5f5,w_440/d3eb254d-0901-4158-956a-4610180545e5/scarpa-da-running-su-strada-invincible-3-xk5gLh.png"
    })
    const [activeImg, setActiveImage] = useState(images.img1)
    const [amount, setAmount] = useState(1)
    return (
        <div>
            <div className='w-10/12 mx-auto my-10'>
                <div>
                    <div className='flex flex-row justify-between gap-10 '>
                        <div className='flex flex-col gap-6 w-2/4'>
                            <img src={activeImg} alt="" className='w-5/6 h-5/6 object-cover aspect-square rounded-xl mx-auto' />
                            <div className='flex flex-row justify-between h-24'>
                                <img src={images.img1} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img1)} />
                                <img src={images.img2} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img2)} />
                                <img src={images.img3} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img3)} />
                                <img src={images.img4} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(images.img4)} />
                            </div>
                        </div>
                        {/* ABOUT */}
                        <div className='flex flex-col gap-3 w-2/4'>
                            <div>
                                <h1 className='text-3xl font-bold'>Nike Invincible 3</h1>
                                <div>Mã sản phẩm: GC20001</div>
                            </div>
                            <p className='text-gray-700'>
                                Con un'ammortizzazione incredibile per sostenerti in tutti i tuoi chilometri, Invincible 3 offre un livello di comfort elevatissimo sotto il piede per aiutarti a dare il massimo oggi, domani e oltre. Questo modello incredibilmente elastico e sostenitivo, è pensato per dare il massimo lungo il tuo percorso preferito e fare ritorno a casa carico di energia, in attesa della prossima corsa.
                            </p>
                            <h6 className='text-2xl font-semibold text-red-600'>Giá bán :$ 199</h6>
                            <h6 className='text-lg font-semibold'>
                                Giá gốc: <del>Giá gốc: $200</del>
                            </h6>
                            <div>Chọn size:</div>
                            <div className='flex flex-row items-center gap-12'>
                                <div className='flex flex-row items-center'>
                                    <button className='bg-gray-200 py-2 px-5 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev - 1)}>-</button>
                                    <span className='py-4 px-6 rounded-lg'>{amount}</span>
                                    <button className='bg-gray-200 py-2 px-4 rounded-lg text-violet-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                                </div>
                            </div>
                            <div className="mt-6 grid grid-cols-2 gap-10">
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Thêm vào giỏ hàng
                                </button>
                                
                                <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-yellow-700 rounded-md hover:bg-yellow-600 focus:outline-none focus:bg-yellow-600">
                                    Đi đến giỏ hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Sản phẩm liên quan */}
            <div>
                <p className='text-xl text-yellow-700 font-semibold mt-16'>Sản phẩm liên quan</p>
                <div className='my-10 flex justify-between'>
                <CardProduct></CardProduct>
                <CardProduct></CardProduct>
                <CardProduct></CardProduct>
                <CardProduct></CardProduct>
                </div>
            </div>
            </div>
        </div>
    )
}
