import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound404() {
    return (
        <div class="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
            <div class="rounded-lg bg-white p-8 text-center shadow-xl">
                <h1 class="mb-4 text-4xl font-bold">404</h1>
                <p class="text-gray-600">Oops! Trang bạn tìm kiếm hiện không tồn tại.</p>
                <Link to="/" class="mt-4 inline-block rounded bg-yellow-700 px-4 py-2 font-semibold text-white hover:bg-yellow-600"> Về Trang chủ </Link>
            </div>
        </div>
    )
}
