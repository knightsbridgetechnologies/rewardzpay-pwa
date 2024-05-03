'use client'
import React, { useEffect, useState } from 'react'
import { getReportData,logout,emailReportData } from '../action'
import ReportCard from '../components/ReportCard'
import { useRouter  } from "next/navigation"
import { ColorRing } from 'react-loader-spinner'
import {toast} from 'react-hot-toast'
import { FaArrowLeft, FaHome, FaShareAlt, FaSearch, FaFilter, FaPowerOff  } from 'react-icons/fa'

export default  function page() {

    const router = useRouter();

    async function logoutUser() {
        await logout()
        router.push("/")
    }

    async function gotoHome(){
        router.push("/home")
    }

    async function shareReportData(){
        const response = await emailReportData(params)

        if(response.error){
            toast.error(response.message)
        }else{
            toast.success(response.message)
        }
    }

    const[params,setParams] = useState({
        start_date:'',
        end_date:'',
        voucher_reference:''
    })

    const [data,setData] = useState({
        error:null,
        data:null
    })

    useEffect(() => {
        async function fetchData() {
            const response = await getReportData(params)
            setData(response)
        }
        fetchData()
    },[params])

    return (
        <div>
            <nav className=" bg-primary py-4 ">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center px-3 text-left text-white font-medium text-xl">
                        <button onClick={gotoHome}><FaArrowLeft className='mr-2 font-semibold cursor-pointer'/></button>    
                        Redemption Report
                    </div>
                    
                    <div className="px-3 text-right font-sm font-normal text-white mt-2">
                        
                        {/* <input type='text' 
                            className='border rounded-lg  p-1 border-black-700 bg-primary text-white' 
                            value={params.voucher_reference} 
                            onChange={(e) => setParams({...params,voucher_reference: e.target.value})} 
                            placeholder='Search by reference no'
                        /> */}
                        <button onClick={gotoHome} href="/home" className='text-white mr-7 pl-1'><FaSearch /></button>
                        <button onClick={gotoHome} href="/home" className='text-white mr-7 pl-1'><FaFilter /></button>
                        <button  onClick={shareReportData} className='text-white mr-7 pl-1'><FaShareAlt /></button >                
                    </div>
                </div>
               
            </nav>
            
            <div className="flex justify-center items-center">
                <div className="p-6 bg-white rounded-md">
                    {data.error == false ? 
                        data.data.map((voucher,index) => <ReportCard key={index} voucher={voucher}/> )                    
                    : 
                    <>
                        {data.error == true ? "No redemptions found": 
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
                            </div>
                        }
                    </>
                    }
                </div>
            </div>
        </div>
    )
}

