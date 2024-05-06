'use client'
import React from 'react'
import { FaCheckCircle  } from 'react-icons/fa';

const QrSuccess = ({props}) => {

    return (
        <div>
            <div className="md-xl:bg-white md-xl:shadow-lg w-[30%] p-4 mt-3 md-xl:absolute md-xl:left-1/2 md-xl:transform md-xl:-translate-x-1/2 sm:w-full">          
                <div className='items-center justify-center'>
                    <div className='text-center flex flex-col justify-center items-center'>
                        <FaCheckCircle  className='text-secondary text-6xl mb-4 justify-center' />
                    </div>
                    <h2 className="font-bold pb-6 text-center">{props.message}</h2>
                    <p className="mt-2 mb-4 text-base">
                        Merchant : {props.data.merchantName}
                    </p>
                    <p className="mt-2 mb-4 text-base">
                        Amount : {props.data.amount}
                    </p>
                    <p className="mt-2 mb-4 text-base">
                        Expire Date : {props.data.expire_date}
                    </p>

                    <h3 className="mt-[2.3rem] mb-4 font-bold text-center ">Do you want to redeem this now?</h3>

                    <div className='flex items-center justify-center'>
                        <a href="/home" className="bg-white-500 text-black border border-green-600 px-4 py-2 w-full text-center">
                            No
                        </a>
                        <a href="/redeem" className="ml-2 bg-secondary text-white px-4 py-2 border-green-600 w-full text-center">
                            Yes
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QrSuccess
