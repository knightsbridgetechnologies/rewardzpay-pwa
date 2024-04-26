'use client'
import React, { useState } from 'react'
import { login } from '../action'
import {toast} from 'react-hot-toast'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { useFormStatus } from "react-dom";
import Link from 'next/link'

const authSchema = z.object({
    id: z.number().optional(),
    email: z.string().min(1,{message:"The email field is required"}).email("Invalid email provided."),
    password: z.string().min(8,{message: "The password must contain 8 characters"})
})

const Login = () => {

    const status = useFormStatus();
    const[buttonName, setButtonName] = useState('SUBMIT')

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
                <input type="text" name="email" className="border rounded-lg p-1 border-gray-800 py-2" placeholder="email" />
                <input type="password" name="password" className="border rounded-lg p-1 border-gray-800 mt-2 py-2" placeholder="password" />
                <Link href='/reset-password' className='text-right mt-1 text-xs mr-2'>Forgot Password ?</Link>
                <button onClick={chnageButtonName} type="submit" className="bg-green-500 rounded-full mt-3 text-white py-2" >{buttonName}</button>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700" />              
            </form>
        </>
    )
}

export default Login
