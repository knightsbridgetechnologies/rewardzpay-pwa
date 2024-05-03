import React from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import { getMerchantSession } from '../action'
import Report from '../components/Report'

export default async function page(){
    
    const session = await getMerchantSession()

    return (
        <div>
            <Navbar />
            <section className="flex md-xl:justify-center md-xl:items-center">
                <div className="md-xl:p-6 sm:w-full md:w-full bg-white md-xl:rounded-md">
                    <div className="md-xl:grid md-xl:grid-cols-2 md:grid-cols-2 md-xl:gap-4 md-xl:p-4 rounded-lg mt-5">
                        <div>
                            <a href="/validate" className="md-xl:p-6 sm:p-3 flex md-xl:items-center md-xl:bg-gray-100 md-xl:rounded-lg md-xl:shadow-md">
                                <div className="mr-4">
                                    <Image src="/validate_main_menu_icon.png" width={50} height={50} alt="Validate E-Vouchers Icon" priority/></div>
                                <div>
                                    <p className="md-xl:text-2xl sm:text-[22px] font-bold flex items-center justify-center mt-2">Validate E-Vouchers</p>
                                </div>
                            </a>
                        </div>
                        
                        <div className='sm:block md-xl:hidden md:hidden border border-muted'></div>
                    
                        {session != null ?  <Report /> : "" }

                        <div className='sm:block md-xl:hidden md:hidden border border-muted'></div>
                    </div>
                </div>
            </section>
        </div>
    )
}

