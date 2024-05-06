import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa';

const QrFail = ({props}) => {
    return (
        <div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">                
                <div className='text-center justify-center'>
                    <div className='text-center flex flex-col justify-center items-center'>
                        <FaExclamationTriangle className='text-red-400 text-6xl mb-4 justify-center' />
                    </div>
                    <h2 className="text-2xl font-bold">{props.message}</h2>

                    <a href="/home" className="inline-block bg-secondary text-white rounded mt-2 px-4 py-2">
                        Home
                    </a>                   
                </div>
            </div>
        </div>
    )
}

export default QrFail
