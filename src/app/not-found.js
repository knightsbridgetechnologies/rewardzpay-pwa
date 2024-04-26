import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Custom404() {
    return (
        <>
            <section className='text-center flex flex-col justify-center items-center h-96'>
                <FaExclamationTriangle className='text-yellow-400 text-6xl mb-4' />
                <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
                <p className='text-xl mb-5'>This page does not exist</p>
            </section>
        </>

    );
} 


