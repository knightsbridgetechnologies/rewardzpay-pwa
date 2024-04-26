import React, { useState } from 'react'
import { resetClientPassword } from '../action'
import {toast} from 'react-hot-toast'
import { useRouter  } from "next/navigation"
import { z } from 'zod'

const schema = z.object({
    password: z.string().min(8, {message: 'Password must be at least 8 characters'}),
    passwordCnf: z.string().min(8, {message: 'Password confirmation must be at least 8 characters'})
    }).refine((data) => data.password === data.passwordCnf, {message: 'Password does not match'
})

const ChangePassword = ({userCode,resetPassword,accessToken}) => {

    const[buttonName, setButtonName] = useState('SUBMIT')

    function chnageButtonName(){
        setButtonName('PLEASE WAIT ...')
    }

    const router = useRouter();

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
            setButtonName('SUBMIT')
        }else{

            const password = formData.get('password')
            const passwordConfirmation = formData.get('passwordCnf')
    
            const response = await resetClientPassword(userCode,resetPassword,password,passwordConfirmation,accessToken)
            
    
            if(response.error == false){
                toast.success(response.message)
                setButtonName('SUBMIT')
                router.push("/")
    
            }else{
                toast.error(response.message)
                setButtonName('SUBMIT')
                router.push("/signup")
            }

        }
    }

    return (
        <div>
            <form className="flex flex-col mt-3" action={submitPassword}>
                <input type="password" name="password" className="border rounded-lg p-1 border-gray-800 py-2" placeholder="password" />
                <input type="password" name="passwordCnf" className="border rounded-lg p-1 border-gray-800 py-2 mt-2" placeholder="confirm passwrd" />                        
                <button onClick={chnageButtonName} type="submit" className="bg-green-500 rounded-full mt-5 text-white py-2">{buttonName}</button>                    
            </form>
        </div>
    )
}

export default ChangePassword
