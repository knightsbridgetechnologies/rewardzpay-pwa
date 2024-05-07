'use client'
import React, { useState } from 'react'
import { useRouter,usePathname  } from "next/navigation"
import { logout } from '../action'
import { FaArrowLeft } from "react-icons/fa"

const Navbar = ({params}) => {
    
    const router = useRouter();
    const [logoutView, setLogoutView] = useState(usePathname())

    async function logoutUser() {
        // await logout()
        router.push("/")
    }

    return (
        <div>
            <nav className=" bg-primary py-4 ">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center px-3 text-left text-white font-medium text-xl">
                        {logoutView == '/' ?
                            ''
                        : logoutView !== '/home' ?
                            <FaArrowLeft className='mr-2 font-semibold cursor-pointer' onClick={() => router.back() }/>
                        : '' }
                        {logoutView == '/' ? 'Login': 
                        logoutView == '/signup' ? 'Sign Up' : 
                        logoutView == '/reset-password' ? 'Reset Password' : 
                        logoutView == '/home' ? 'RewardzPay' : '' } 
                    </div>
                    {logoutView !== '/' ?
                        <div className="px-3 text-right font-sm font-normal text-white">
                            { logoutView == '/' | logoutView == '/signup' | logoutView == '/reset-password'? " " :
                                <button  onClick={logoutUser} className='text-white'> SIGN OUT</button > 
                            }                    
                        </div>
                    : '' }
                </div>
               
            </nav>
        </div>
    )
}

export default Navbar
