'use client'
import React, { useEffect, useState } from 'react'
import { getReportData,logout,emailReportData } from '../action'
import ReportCard from '../components/ReportCard'
import { useRouter  } from "next/navigation"
import { ColorRing } from 'react-loader-spinner'
import {toast} from 'react-hot-toast'
import { FaArrowLeft,FaShareAlt, FaSearch, FaFilter, FaTimes  } from 'react-icons/fa'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { format } from 'date-fns';

export default  function page() {

    const router = useRouter();
    const[params,setParams] = useState({
        start_date: '',
        end_date: '',
        voucher_reference:''
    })

    const [data,setData] = useState({
        error:null,
        data:null
    })
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [showDateRangePicker, setShowDateRangePicker] = useState(false);
    const [selectionRange, setSelectionRange] = useState({
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 6)),
        key: 'selection'
    });

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        setParams('');
    };
    
    async function logoutUser() {
        await logout()
        router.push("/")
    }

    async function gotoHome(){
        router.push("/home")
    }

    const handleRangeSelect = (ranges) => {
        const formattedStartDate = format(ranges.selection.startDate, 'yyyy-MM-dd');
        const formattedEndDate = format(ranges.selection.endDate, 'yyyy-MM-dd');
        setParams({
            ...params,
            start_date: formattedStartDate,
            end_date: formattedEndDate
        });
        setSelectionRange(ranges.selection);

    };

    const handleApply = () => {
        setShowDateRangePicker(false);
    };
    
    const handleClose = () => {
        setParams({
            ...params,
            start_date: '',
            end_date: ''
        });
        setShowDateRangePicker(false);
    };
    
    async function shareReportData(){
        const response = await emailReportData(params)

        if(response.error){
            toast.error(response.message)
        }else{
            toast.success(response.message)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const response = await getReportData(params)
            setData(response)
        }
        fetchData()
    },[params])

    return (
        <div>
            {isSearchOpen && (
                <div className="fixed top-0 left-0 w-full bg-white border-0 shadow-lg py-4 px-3 flex items-center">
                    <input
                        type="text"
                        value={params.voucher_reference}
                        onChange={(e) => setParams({...params,voucher_reference: e.target.value})}
                        placeholder="Search by Reference No"
                        className="flex-grow p-2 rounded border-0 0 mr-4"
                    />
                    <button onClick={toggleSearch}>
                        <FaTimes className="text-gray-500" />
                    </button>
                </div>
            )}

            {showDateRangePicker && (
                <div className="fixed top-16 md-xl:right-0 sm:w-full bg-white border-0 shadow-lg py-4 px-3 flex items-center">
                    <div>
                        <DateRangePicker
                            editableDateInputs={false}
                            ranges={[selectionRange]}
                            onChange={handleRangeSelect}
                            staticRanges={[]}
                            inputRanges={[]}
                            color="#00254C" // Change the color of the selected range
                            rangeColors={['#00254C']} // Change the color of the range bar
                            dateDisplayFormat='yyyy-MM-dd'
                        />
                        <div className='flex justify-end space-x-2'>
                            <button onClick={handleClose} className='bg-white hover:bg-gray-100 text-gray-800 text-sm font-semibold py-1 px-4 border border-gray-400 rounded shadow'>Close</button>
                            <button onClick={handleApply} className='bg-primary hover:bg-primary-700 text-sm text-white font-semibold py-1 px-4 rounded'>Apply</button>
                        </div>
                    </div>
                </div>
            )}

            <nav className="bg-primary py-4">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center px-3 text-left text-white font-medium text-xl">
                        <button onClick={gotoHome}><FaArrowLeft className='mr-2 font-semibold cursor-pointer'/></button>    
                        <div className="truncate">Redemption <span className="whitespace-nowrap">Report</span></div>
                    </div>
                    
                    <div className="flex items-center justify-end px-3 text-right font-sm font-normal text-white">
                        <div className="flex">
                            <div className="mt-2">
                                <button id="searchBtn" className="text-white mr-4 pl-1" onClick={toggleSearch}>
                                    <FaSearch className='text-xl' />
                                </button>
                                <button onClick={() => setShowDateRangePicker(true)} className='text-white mr-4 pl-1 open-daterangepicker'><FaFilter className='text-xl' /></button>
                                <button onClick={shareReportData} className='text-white mr-4 pl-1'><FaShareAlt className='text-xl' /></button > 
                            </div>      
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

