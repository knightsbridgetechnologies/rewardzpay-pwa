import React, { useState } from 'react'
import { resetClientPassword } from '../action'
import {toast} from 'react-hot-toast'
import { useRouter  } from "next/navigation"
import { z } from 'zod'
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6"

const schema = z.object({
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
    passwordCnf: z.string().min(8, {message: 'Password confirmation must be at least 8 characters'})
    }).refine((data) => data.password === data.passwordCnf, {message: 'Password does not match'
})

const ChangePassword = ({userCode,resetPassword,accessToken}) => {

    const[buttonName, setButtonName] = useState('CHANGE PASSWORD')

    function chnageButtonName(){
        setButtonName('PLEASE WAIT ...')
    }

    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        passwordCnf: ""
    });
    const {password, passwordCnf} = formData;

    function onChange(e) {
        setFormData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
        }) );
    }

    async function submitPassword(formData){

        const ChangePasswordCredential = {
            password: formData.get('password'),
            passwordCnf: formData.get('passwordCnf'),
        }

        const result = schema.safeParse(ChangePasswordCredential) 

        if(!result.success){

            result.error.issues.forEach((issue) => {               
                toast.error(issue.message)
            })
            setButtonName('CHANGE PASSWORD')
        }else{

            const password = formData.get('password')
            const passwordConfirmation = formData.get('passwordCnf')
    
            const response = await resetClientPassword(userCode,resetPassword,password,passwordConfirmation,accessToken)
            
    
            if(response.error == false){
                toast.success(response.message)
                setButtonName('CHANGE PASSWORD')
                router.push("/")
    
            }else{
                toast.error(response.message)
                setButtonName('CHANGE PASSWORD')
                router.push("/signup")
            }

        }
    }

    return (
        <div>
            <form className="flex flex-col mt-3" action={submitPassword}>
               
                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted sm:text-sm"> <FaLock className='text-muted' /></span>
                    </div>
                    <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        name="password"
                        onChange={onChange}
                        id='password'
                        className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="New Password" />

                    {showPassword ?  
                    
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEyeSlash />
                        </span>
                    </div> 
                        : 
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEye />
                        </span>
                    </div> 
                    }  
                </div>

                <div className="relative mt-2 rounded-md shadow-sm">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span className="text-muted sm:text-sm"> <FaLock className='text-muted' /></span>
                    </div>
                    <input 
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordCnf}
                        name="passwordCnf"
                        onChange={onChange}
                        id='passwordCnf'
                        className="block w-full rounded-md border border-muted py-2 pl-[2.3rem] placeholder:text-muted focus:ring-1 focus:ring-inset focus:ring-primary" placeholder="Confirm Password" />

                    {showConfirmPassword ?  
                    
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowConfirmPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEyeSlash />
                        </span>
                    </div> 
                        : 
                    <div className="cursor-pointer absolute inset-y-0 right-0 flex items-center pr-3" onClick={()=>setShowConfirmPassword((prevState)=>!prevState)} > 
                        <span className="text-muted sm:text-sm"> 
                        <FaEye />
                        </span>
                    </div> 
                    }  
                </div>                      
                <button onClick={chnageButtonName} type="submit" className="bg-secondary mt-5 text-white py-2">{buttonName}</button>                    
            </form>
        </div>
    )
}

export default ChangePassword
