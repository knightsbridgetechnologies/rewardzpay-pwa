'use client'
import {useEffect, useState, React} from 'react'
import { Html5QrcodeScanner,Html5QrcodeScanType } from "html5-qrcode";
import Navbar from '../components/Navbar';
import { validateQrCode } from '../action';
import QrSuccess from '../components/QrSuccess';
import QrFail from '../components/QrFail';
import { ColorRing } from 'react-loader-spinner'

const page = () => {

    const [scanResult, setScanResult] = useState({
        'error' : null,
        'data': null,
        'message' : null
    })

    const [qrCode, setqrCode] = useState(null)
    const [hideBar, sethideBar] = useState(false)

    useEffect(() =>{
        const scanner = new Html5QrcodeScanner('reader',{
            qrbox:{
            width: 10000,
            height:10000
            },
            fps: 2,
            rememberLastUsedCamera: true,
            supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        })

        scanner.render(success,error)

        async function success(result){
            sethideBar(true)
            scanner.clear()
            const response = await validateQrCode(result)
            setScanResult(response)
            setqrCode(result)
            
        }

        function error(error){
            //toast.error('An error Occured')
        }
    },[])

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mt-40">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    {
                        scanResult.error == null ?
                        <div className='bg-blue-200 rounded-md p-1'>
                            <h4 className='flex justify-center items-center'>Steps to open camera</h4>
                            <p>Step 1: Click Request Camera Permissions</p>
                            <p>Step 2: Allow app to access camera</p>
                            <p>Step 3: Select back camera to scan image</p>
                            <p>Step 4: Click start scanning option</p>
                        </div> : ""
                    }
                    <div id="reader" className='mt-2'>
                    </div> 
                        {scanResult.error == null ? 
                        <div className='flex justify-center'>
                            <ColorRing
                                visible={hideBar}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['##000080']}
                            />                            
                        </div>
                        
                            : 
                        <>
                            {scanResult.error == true ?  <QrFail props={scanResult} /> :  <QrSuccess props={scanResult}/>}
                        </> }                
                </div>     
            </div>
        </>

    )
}

export default page
