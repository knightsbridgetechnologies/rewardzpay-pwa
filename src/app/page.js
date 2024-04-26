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
      <div className="flex justify-center items-center mt-40">
        <div className="w-96 p-6 shadow-lg bg-white rounded-md">
          <div className="flex items-center justify-center">
            <Image src="/rewardzpay.png" width={150} height={120} alt="rewardzpay" priority/>
          </div><hr className='mt-2 mb-2' />
          <h1 className="text-2xl font-bold text-center text-blue-900">Sign In</h1> 
            <Login/>
          <div className="flex flex-col">
            <Link href='/signup' className="bg-white-500 border border-green-600 rounded-full text-black py-2"><div className='flex items-center justify-center'>SIGN UP</div></Link>        
          </div>
        </div>
      </div>
    </>
  )
}
