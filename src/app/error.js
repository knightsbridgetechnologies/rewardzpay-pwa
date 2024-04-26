'use client'
import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Custom500() {
    return (
        <>
            <section className='text-center flex flex-col justify-center items-center h-96'>
                <FaExclamationTriangle className='text-red-400 text-6xl mb-4' />
                <h1 className='text-6xl font-bold mb-4'>500 Server Error</h1>
                <p className='text-xl mb-5'>Server Error Occured. Please try again</p>
            </section>
        </>

    );
} 


