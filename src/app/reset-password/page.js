'use client'
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import VerifyEmail from '../components/VerifyEmail'
import OtpVerify from '../components/OtpVerify'
import ChangePassword from '../components/ChangePassword'
import Image from 'next/image'


const page = () => {

    const [resetPassword,setresetPassword] = useState(true)
    const [isVerify,setIsVerify] = useState(true)
    const [isOtpVerify,setOtpVerify] = useState(false)
    const [userCode, setUsercode] = useState(0)
    const [verificationCode, setVerificationCode] = useState(0)
    const [ispasswordChangeView, setpasswordChangeView] = useState(false)
    const [accessToken, setaccessToken] = useState(0)

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center mt-40">
                <div className="w-96 p-6  bg-white rounded-md">
                    <div className="flex items-center justify-center pb-3">
                        <Image src="/rewardzpay.png" width={150} height={120} alt="rewardzpay" priority/>
                    </div>
                    
                    {isVerify && 
                        <VerifyEmail 
                            setIsVerify={setIsVerify} 
                            setOtpVerify={setOtpVerify} 
                            setVerificationCode={setVerificationCode} 
                            setUsercode={setUsercode}
                            resetPassword={resetPassword}
                            setaccessToken={setaccessToken}
                        />
                    }  

                    {isOtpVerify && 
                        <OtpVerify 
                            setOtpVerify={setOtpVerify}
                            userCode={userCode} 
                            verificationCode={verificationCode}
                            setpasswordChangeView={setpasswordChangeView}
                            accessToken={accessToken}
                        />
                    } 

                    {ispasswordChangeView && 
                        <ChangePassword 
                            userCode={userCode} 
                            resetPassword={resetPassword} 
                            accessToken={accessToken}
                        />
                    }

                </div>
                {/* <p className="text-center text-gray-500 text-xs">
                    &copy;2024 Knightsbridge Technologies. All rights reserved!
                </p> */}
            </div>
        </div>
    )
}

export default page
