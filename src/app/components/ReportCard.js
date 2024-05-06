import React from 'react'

const ReportCard = ({voucher}) => {

    return (
        <>            
            <div className="justify-center items-center h-center">
                <div className="p-3 bg-white rounded-md">
                    <ul className="max-w-md mt-2">
                        <li className="pb-3 sm:pb-4">
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">                       
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    {voucher.voucher_ref_no}
                                    </p>                          
                                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {voucher.redeemed_date}
                                    </p>
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    LKR {voucher.denomination}
                                </div>
                            </div>
                        </li>               
                    </ul>
                    <hr />
                </div>
            </div>
        </>
    )
}

export default ReportCard
