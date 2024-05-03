'use client'
import Image from 'next/image'
import Link from 'next/link'
import Login from './components/Login'
import Navbar from './components/Navbar'
import PwaModel from './components/PwaModel'
import { useEffect,useState } from 'react'

export default function Home() {

  const [showInstallModal,setshowInstallModal] = useState(false)
  const [prompt,setPrompt] = useState(null)

  useEffect(() => {
    const handleBeforeInstallPrompt = (event) => {
        event.preventDefault();
        setPrompt(event)

        if(!window.matchMedia("(display-mode:standalone").matches){
          setshowInstallModal(true)
        }
    }
    window.addEventListener("beforeinstallprompt",handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener("beforeinstallprompt",handleBeforeInstallPrompt)

    }
  },[])

  return (
    <>
      <Navbar />
      <PwaModel show={showInstallModal} setshowInstallModal={setshowInstallModal} prompt={prompt}/>
      <div className="flex justify-center items-center md-xl:mt-[5rem] sm:mt-[3rem]">
        <div className="w-96 p-6 lg:shadow-lg bg-white rounded-md">
          <div className="flex items-center justify-center pb-3">
            <Image src="/rewardzpay.png" width={150} height={120} alt="rewardzpay" priority/>
          </div>
         
          {/* <h1 className="text-2xl font-bold text-center text-blue-900">Sign In</h1>  */}
            <Login/>
            <div className='my-2 before:border-t flex before:flex-1 items-center before:border-muted after:border-t after:flex-1 after:border-muted'>
              <p className='text-center font-semibold mx-4'>or</p>
            </div>
          <div className="flex flex-col">
            <Link href='/signup' className="bg-white-500 border border-secondary text-black py-2"><div className='flex items-center justify-center'>SIGN UP</div></Link>        
          </div>
        </div>
      </div>
    </>
  )
}
