import React, { useState } from 'react'
import { verifyClientOtp } from '../action'
import {toast} from 'react-hot-toast'
import { z } from 'zod'

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
                    <input type="text" name="otp" className="border rounded-lg p-1 border-gray-800 py-2" placeholder="OTP" />                
                    <button onClick={chnageButtonName} type="submit" className="bg-green-500 rounded-full mt-5 text-white py-2">{buttonName}</button>                    
                </form>
            </div>
        </div>
    )
}

export default OtpVerify
