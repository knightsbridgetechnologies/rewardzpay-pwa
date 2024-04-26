import React, { useState } from 'react'
import { verifyClientEmail } from '../action'
import {toast} from 'react-hot-toast'
import { z } from 'zod'

const verifyEmailSchema = z.object({
    id: z.number().optional(),
    email: z.string().email("Invalid email format provided"),
})

const verifyEmail = ({setIsVerify,setOtpVerify,setVerificationCode,setUsercode,resetPassword,setaccessToken}) => {

    const[buttonName, setButtonName] = useState('VERIFY EMAIL')

    function chnageButtonName(){
        setButtonName('PLEASE WAIT ...')
    }

    async function submitEmail(formData){

        const verifyEmailCredential = {
            email: formData.get('email'),
        }

        const result = verifyEmailSchema.safeParse(verifyEmailCredential) 

        if(!result.success){
            result.error.issues.forEach((issue) => {               
                toast.error(issue.message)
            })
            setButtonName('VERIFY EMAIL')
        }else{

            const email = formData.get('email')
            const response = await verifyClientEmail(email,resetPassword)

            if(response.error == false){
                toast.success(response.message)
                setIsVerify(false)
                setOtpVerify(true)
                setVerificationCode(response.data.code)
                setUsercode(response.data.userCode)
                setaccessToken(response.token)
                setButtonName('VERIFY EMAIL')

            }else{
                toast.error(response.message)
                setButtonName('VERIFY EMAIL')
            }   
        }
        
    }

    return (
        <div>
            <form className="flex flex-col mt-3" action={submitEmail}>
                <input type="text" name="email" className="border rounded-lg p-1 border-gray-800 py-2" placeholder="email" />                
                <button onClick={chnageButtonName}  type="submit" className="bg-green-500 rounded-full mt-5 text-white py-2">{buttonName}</button>                    
            </form>
        </div>
    )
}

export default verifyEmail
