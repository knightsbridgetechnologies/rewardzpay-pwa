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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    async function logoutUser() {
        await logout()
        router.push("/")
    }

    async function gotoHome(){
        router.push("/home")
    }

   

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

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
                        <span className='text-nowrap'>Redemption Report</span>
                    </div>
                    
                    <div className="flex items-center justify-end px-3 text-right font-sm font-normal text-white">
                        
                        {/* <input type='text' 
                            className='border rounded-lg  p-1 border-black-700 bg-primary text-white' 
                            value={params.voucher_reference} 
                            onChange={(e) => setParams({...params,voucher_reference: e.target.value})} 
                            placeholder='Search by reference no'
                        /> */}

                        <div className="flex">
                            <div className="mt-2">
                                <button id="searchBtn" className="text-white mr-4 pl-1" onClick={toggleSearch}>
                                    <FaSearch className='text-xl' />
                                </button>
                                {isSearchOpen && (
                                    <input type="text" placeholder="Search..." className="absolute top-0 right-0 mt-8 p-2 rounded border border-gray-300"/>
                                )}
                            </div>
                            <button onClick={gotoHome} href="/home" className='text-white mr-4 pl-1'><FaFilter className='text-xl' /></button>
                            <button  onClick={shareReportData} className='text-white mr-4 pl-1'><FaShareAlt className='text-xl' /></button > 
                        </div>
                                       
                    </div>
                </div>
               
            </nav>
            
            <div className="md-xl:flex md-xl:justify-center md-xl:items-center">
                <div className="md-xl:p-6 sm:p-2 bg-white rounded-md">
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

