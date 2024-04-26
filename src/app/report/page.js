'use client'
import React, { useEffect, useState } from 'react'
import { getReportData,logout,emailReportData } from '../action'
import ReportCard from '../components/ReportCard'
import { useRouter  } from "next/navigation"
import { ColorRing } from 'react-loader-spinner'
import {toast} from 'react-hot-toast'
import { FaShareAlt,FaPowerOff,FaHome   } from 'react-icons/fa'

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
            <nav className=" bg-blue-900 py-4 ">                
                <div className="px-3 text-right">                   
                    <input type='text' 
                        className='border rounded-lg  p-1 border-black-700 bg-blue-900 text-white' 
                        value={params.voucher_reference} 
                        onChange={(e) => setParams({...params,voucher_reference: e.target.value})} 
                        placeholder='Search by reference no'
                    />
                    <button onClick={gotoHome} href="/home" className='text-white mr-7 pl-1'><FaHome /></button>
                    <button  onClick={shareReportData} className='text-white mr-7 pl-1'><FaShareAlt /></button >  
                    <button  onClick={logoutUser} className='text-white '><FaPowerOff /></button >                                         
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

