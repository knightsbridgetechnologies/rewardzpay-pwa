import React, { useState } from 'react'
import { verifyClientOtp } from '../action'
import {toast} from 'react-hot-toast'
import { z } from 'zod'
import { FaKey } from "react-icons/fa";

const verifyOTPSchema = z.object({
    id: z.number().optional(),
    otp: z.string().min(1,{message:"Invalid OTP"}),
})

const OtpVerify = ({userCode,verificationCode,setpasswordChangeView,accessToken,setOtpVerify}) => {

    const[buttonName, setButtonName] = useState('SUBMIT')

    function chnageButtonName(){
        setButtonName('PLEASE WAIT ...')
    }

    async function submitOtp(formData){

        const verifyOTPCredential = {
            otp: formData.get('otp'),
        }

        const result = verifyOTPSchema.safeParse(verifyOTPCredential) 

        if(!result.success){

            result.error.issues.forEach((issue) => {               
                toast.error(issue.message)
            })
            setButtonName('SUBMIT')
        }else{

            const otp = formData.get('otp')
            const response = await verifyClientOtp(otp,userCode,verificationCode,accessToken)
    
            if(response.error == false){
                toast.success(response.message)
                setOtpVerify(false)
                setpasswordChangeView(true)
                setButtonName('SUBMIT')
            }else{
                toast.error(response.message)
                setButtonName('SUBMIT')
            }
        }

    }

    return (
        <div>
            <div>
                <form className="flex flex-col mt-3" action={submitOtp}>
                    <div className="relative mt-2 rounded-md shadow-sm mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-muted sm:text-sm"> <FaKey className='text-muted text-xl' /></span>
                        </div>
                        <input type="text" name="otp" className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="OTP" />
                    </div>                
                    <button onClick={chnageButtonName} type="submit" className="bg-secondary mt-5 text-white py-2">{buttonName}</button>                    
                </form>
            </div>
        </div>
    )
}

export default OtpVerify
