'use client'
import React, { useState } from 'react'
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6"
import { login } from '../action'
import {toast} from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { useFormStatus } from "react-dom";
import Link from 'next/link'

const authSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email provided."),
    password: z.string().min(1,{message: "The password field is required"})
})

const Login = () => {

    const status = useFormStatus();
    const[buttonName, setButtonName] = useState('SUBMIT')
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const {email, password} = formData;

    function onChange(e) {
        setFormData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
        }) );
    }

    function chnageButtonName(){
        setButtonName('PLEASE WAIT ...')
    }

    async function loginMember(formData){

        const authCredential = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        const result = authSchema.safeParse(authCredential) 

        if(!result.success){
            result.error.issues.forEach((issue) => {               
                toast.error(issue.message)
            })
            setButtonName('SUBMIT')
        }else{

            const response = await login(formData)
            
            if(response.error == true){
                toast.error(response.message) 
                setButtonName('SUBMIT')
            }else{
                toast.success(response.message)
                setButtonName('SUBMIT')
                redirect('/home')
            }
        }
    }

    return (
        <>
            <form className="flex flex-col mt-3" action={loginMember}>
                {/* <input type="text" name="email" className="border rounded-lg p-1 border-gray-800 py-2" placeholder="email" /> */}

                <div className="relative mt-2 rounded-md shadow-sm mb-4">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted sm:text-sm"> <FaUser className='text-muted' /></span>
                    </div>
                    <input type="text" name="email" id="emailAddress" className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="Email" />
                </div>

                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted sm:text-sm"> <FaLock className='text-muted' /></span>
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        name="password"
                        onChange={onChange}
                        id='password'
                        className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="Password" />

                    {showPassword ?  
                    
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEyeSlash />
                        </span>
                    </div> 
                        : 
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEye />
                        </span>
                    </div> 
                    }   
                </div>

                <Link href='/reset-password' className='text-right mt-1 text-xs mr-2 mb-4'>Forgot Password ?</Link>
                <button onClick={chnageButtonName} type="submit" className="bg-secondary mt-3 text-white py-2" >{buttonName}</button>
                          
            </form>
        </>
    )
}

export default Login
