'use client'
import {useEffect, useState, React} from 'react'
import { Html5QrcodeScanner } from "html5-qrcode";
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
                    <div id="reader">
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
