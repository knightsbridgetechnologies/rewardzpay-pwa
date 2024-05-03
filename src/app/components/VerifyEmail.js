import React, { useState } from 'react'
import { verifyClientEmail } from '../action'
import {toast} from 'react-hot-toast'
import { z } from 'zod'
import { FaEnvelope } from 'react-icons/fa'

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
                <div className="relative mt-2 rounded-md shadow-sm mb-4">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted sm:text-sm"> <FaEnvelope className='text-muted' /></span>
                    </div>
                    <input type="text" name="email" className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="Email" />
                </div>
                
                <button onClick={chnageButtonName}  type="submit" className="bg-secondary  mt-5 text-white py-2">{buttonName}</button>                    
            </form>
        </div>
    )
}

export default verifyEmail
