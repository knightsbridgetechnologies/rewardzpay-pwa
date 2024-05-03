'use client'
import React from 'react'

const PwaModel = ({show, setshowInstallModal,prompt}) => {

    function onClose(){
        setshowInstallModal(false)
    }

    function onInstall(){
        if(prompt){
            prompt.prompt()
        }
    }

    const blurBackground = show ? "backdrop-blur" : ""

    return (
        show  && (
            <div className='fixed inset-0 flex items-center justify-center z-50'>
                <div className='bg-white w-94 p-4 rounded-lg shadow-lg'>
                    <h2 className='text-lg font-semibold mb-2 text-black'>Install the APP</h2>
                    <p className='text-sm mb-4 text-black'>Click the button below to install the app on your device</p>
                    <div className='flex'>
                        <button onClick={onInstall} className='bg-primary hover:bg-green-600 text-white px-4 rounded-md mr-2'>Install</button>
                        <button onClick={onClose} className=' bg-gray-200  text-black px-4  rounded-md mr-2'>Close</button>
                    </div>
                </div>
                <div className={`fixed inset-0 bg-gray-900 opacity-80 -z-10 ${blurBackground}`}></div>
            </div>
        )
    )
}

export default PwaModel
