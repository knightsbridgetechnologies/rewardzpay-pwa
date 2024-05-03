import React from 'react'
import Image from 'next/image'

const Report = () => {
  return (
    <div>
        <a href="/report">
            <div className="md-xl:p-6 sm:p-3 md-xl:bg-gray-100 md-xl:rounded-lg md-xl:shadow-md flex items-center md-xl:justify-center">
              <div className="mr-4">
                  <Image src="/reports.png" width={50} height={50} alt="Reports Icon" priority/>
              </div>
              <div>
                  <p className="md-xl:text-2xl sm:text-[22px] font-bold">E-Voucher Redemption Report</p>
              </div>
            </div>
        </a>
    </div>
  )
}

export default Report
