'use client';

import React, { useState } from 'react';

const LoginRegister: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
            <div id="container" className={`relative w-full max-w-3xl min-h-[480px] bg-white rounded-2xl shadow-lg overflow-hidden ${isActive ? 'active' : ''}`}>
                <div></div>
                <div className="flex justify-center items-center mt-24 ">
                    <form className="flex flex-col items-center justify-center h-full w-9/12 gap-5">
                        <h1 className="font-bold text-5xl mb-5 text-nowrap">Vui lòng nhập mật khẩu mới</h1>
                        <span className="text-sm mb-3 text-nowrap">Hãy nhập khẩu mới của bạn</span>
                        <input type="password" placeholder="Mật Khẩu mới" className="w-full px-3 py-2 mt-5 text-sm bg-gray-200 rounded" />
                        <input type="password" placeholder="Nhập lại mật khẩu mới" className="w-full px-3 py-3 mt-5 text-sm bg-gray-200 rounded" />
                        <div className="flex flex-row gap-48 mt-20">
                            <li className="mt-4 px-6 py-2 text-sm font-semibold text-blue-600 rounded uppercase list-none">
                                <a href=""> QUAY LAI</a>
                            </li>
                            <button type="button" className="mt-4 px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded uppercase">
                                đồng ý
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginRegister;