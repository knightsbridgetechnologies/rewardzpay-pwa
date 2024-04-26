'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { redeemQr } from '../action'
import { ColorRing } from 'react-loader-spinner'
import { FaCheckCircle,FaExclamationTriangle  } from 'react-icons/fa';

async function callredeemQr(){
    const result = await redeemQr()
    return result
}

export default function page()  {

    const [response, setResponse] = useState({
        error:null,
        data:null,
        message: null
    })
    
    useEffect(() => {
        async function fetchData() {
            const result = await callredeemQr();
            setResponse(result)
        }
        fetchData()
    },[])


    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center mt-40">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                {
                    response.error == null ?                             
                        <div className='flex justify-center'>
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['##000080']}
                            />   
                        </div> : 
                    <>  
                        {response.error == false ? 
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">                
                                <div className='text-center justify-center'>
                                <div className='text-center flex flex-col justify-center items-center'>
                        <           FaCheckCircle  className='text-green-400 text-6xl mb-4 justify-center' />
                                </div>
                                    <h2 className="text-2xl font-bold">{response.message}</h2>
                                    <p className="mt-2 mb-4">
                                        Reference No : {response.data.invoice_ref_number}
                                    </p>                                    
                                    <a href="/home" className="bg-white-500 text-black rounded-full border border-green-600 px-4 py-2 mt-2">
                                        Home
                                    </a>
                                </div>
                            </div>
                        : 
                            <div className="bg-gray-100 p-6 rounded-lg shadow-md">                
                                <div className='text-center justify-center'>
                                <div className='text-center flex flex-col justify-center items-center'>
                                    <FaExclamationTriangle className='text-red-400 text-6xl mb-4 justify-center' />
                                </div>
                                    <h2 className="text-2xl font-bold">{response.message}</h2>

                                    <a href="/home" className="inline-block bg-white-500 text-black rounded-full border border-green-600 mt-2 px-4 py-2">
                                        Home
                                    </a>                   
                                </div>
                            </div>
                        }
                    </>
                }
                </div> 
            </div>  
        </div>
    )
}

