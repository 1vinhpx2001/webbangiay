import React from 'react'
import { List, ListItem, Card } from "@material-tailwind/react";
import CardProduct from '../../components/cardproduct/CardProduct';

export default function ProductList() {
    return (
        <div className='flex mx-auto w-10/12'>
            <div>
                <Card className="w-72 mb-10">
                    <p className='text-xl text-yellow-700 font-semibold mt-10 ml-5'>THƯƠNG HIỆU</p>
                    <List className='ml-10'>
                        <ListItem>PUMA</ListItem>
                        <ListItem>REEBOK</ListItem>
                        <ListItem>NIKE</ListItem>
                        <ListItem>ADDIDAS</ListItem>
                        <ListItem>FILA</ListItem>
                        <ListItem>CONVERSE</ListItem>
                        <ListItem>LI-NING</ListItem>
                    </List>
                </Card>
                <Card className="w-72 mb-10">
                    <p className='text-xl text-yellow-700 font-semibold mt-10 ml-5'>LOẠI SẢN PHẨM</p>
                    <List className='ml-10'>
                        <ListItem>Giày Nam</ListItem>
                        <ListItem>Giày Nữ</ListItem>
                        <ListItem>Giày Trẻ em</ListItem>
                        <ListItem>Giày Đá bóng</ListItem>
                        <ListItem>Giày thời trang</ListItem>
                        <ListItem>Giày bóng rổ</ListItem>
                        <ListItem>Giày chạy bộ</ListItem>
                    </List>
                </Card>
                <Card className="w-72 mb-10">
                    <p className='text-xl text-yellow-700 font-semibold mt-10 ml-5'>GIÁ</p>
                    <List className='ml-10'>
                        <ListItem>Dưới 1 Triệu</ListItem>
                        <ListItem>1.000.000 - 2.000.000</ListItem>
                        <ListItem>2.000.000 - 3.000.000</ListItem>
                        <ListItem>3.000.000 - 4.000.000</ListItem>
                        <ListItem>Trên 4 Triệu</ListItem>
                    </List>
                </Card>
            </div>
            
            <div className='ml-6 flex flex-col justify-between'>
                <div>
                    <p className='text-xl text-yellow-700 font-semibold mt-10 ml-5'>SẢN PHẨM NỔI BẬT</p>
                    <div className='grid grid-cols-3 gap-10'>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                        <CardProduct></CardProduct>
                    </div>
                </div>

                <div className='my-10 mx-auto '>
                    <nav aria-label="Page navigation example">
                        <ul className="list-style-none flex">
                            <li>
                                <a
                                    className=" text-lg relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                >Previous</a
                                >
                            </li>
                            <li>
                                <a
                                    className=" text-lg relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                >1</a
                                >
                            </li>
                            <li aria-current="page">
                                <a
                                    className=" text-lg relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                >2</a
                                >
                            </li>
                            <li>
                                <a
                                    className=" text-lg relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                >3</a
                                >
                            </li>
                            <li>
                                <a
                                    className=" text-lg relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                                    href="#"
                                >Next</a
                                >
                            </li>
                        </ul>
                    </nav>
                </div>
                
            </div>
        </div>
    )
}

