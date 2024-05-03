"use server"

import { cookies } from "next/headers";

export async function login(formData){

    const token = await getToken()

    if(token.error == true){
        const result = {'error':true,data:null}        
        return result;
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/rewards-login'
    const paylaod = {"email" : formData.get('email'),'password' :formData.get('password')}

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer '+token.data,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){

        const details = await response.json()

        if(details.success_code == false){

            const result = {'error':true,message:details.message}
            return result;
        }else{
            details.data.access_token = token.data
            const session = await setMerchantSession(details.data)
            const result = {'error':false,message:details.message}
            return result;
        }

    }else{
        const result = {'error':true,message:"Server error occured. Please try again"}        
        return result;
    }

}

async function getToken(){

    const url  = process.env.DEALS_MIDDLEWARE+'oauth/token'

    const paylaod = {"grant_type" : 'client_credentials','client_id' :process.env.CLIENT_ID,'client_secret': process.env.CLIENT_SECRET}

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){
        const details = await response.json()
        let result = {'error':false,data:details.access_token}
        return result;
    }else{
        let result = {'error':true,data:null}
        return result;
    }
}

async function setMerchantSession(sessionData){

    const expire = new Date(Date.now() + 10 *1000)
    cookies().set('session', JSON.stringify(sessionData), {expire, httpOnly: true})
    
}

export async function getMerchantSession(){

    if(cookies().has('session')) {
        const session = cookies().get('session').value
        return session
    }else{
        return null
    }
}

export async function validateQrCode(value){

    const sessionData = await getMerchantSession()

    const paylaod = {
        'reference_number' : value,
        'user_code' : sessionData.user_code,
        'option_type' : '1000',
        'token' : sessionData.token,
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/validate-voucher'

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionData.access_token
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){
        const details = await response.json();
        if(details.success_code == true){
            
            sessionData.qrcode = value
            await setMerchantSession(sessionData)

            let result = {'error':false,'data':details.data,'message': details.message}
            return result;
        }else{
            let result = {'error':true,'data':null,'message': details.message}
            return result;
        }
    }else{
        let result = {'error':true,'data':null,'message': 'Server error occured'}
        return result;
    }
}

export async function redeemQr(){

    const sessionData = await getMerchantSession()

    const paylaod = {
        'reference_number' : sessionData.qrcode,
        'user_code' : sessionData.user_code,
        'option_type' : '1000',
        'token' : sessionData.token,
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/redeem-voucher'

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionData.access_token
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){
        const details = await response.json();
        if(details.success_code == true){
            let result = {'error':false,'data':details.data,'message': details.message}
            return result;
        }else{
            let result = {'error':true,'data':null,'message': details.message}
            return result;
        }
    }else{
        let result = {'error':true,'data':null,'message': 'Server error occured'}
        return result;
    }
}

export async function logout(){
    cookies().set('session','',{expires: new Date(0)})
}

export async function getReportData(params){
    const sessionData = await getMerchantSession()

    const paylaod = {
        'voucher_reference' : params.voucher_reference,
        'user_code' : sessionData.user_code,
        'start_date' : params.start_date,
        'end_date' : params.end_date,
        'token' : sessionData.token,
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/deal-redemption-data'

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionData.access_token
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){
        const details = await response.json();
        if(details.success_code == true){
            let result = {'error':false,'data':details.data}
            return result;
        }else{
            let result = {'error':true,'data':null}
            return result;
        }
    }else{
        let result = {'error':true,'data':null}
        return result;
    }
}

export async function emailReportData(params)
{
    const sessionData = await getMerchantSession()

    const paylaod = {
        'start_date' : params.start_date,
        'user_code' : sessionData.user_code,
        'end_date' : params.end_date,
        'token' : sessionData.token,
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/send-deal-redemption-mail'

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+sessionData.access_token
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){
        const details = await response.json();
        if(details.success_code == true){
            let result = {'error':false,'message': details.message}
            return result;
        }else{
            let result = {'error':true,'message': details.message}
            return result;
        }
    }else{
        let result = {'error':true,'message': 'Server error occured'}
        return result;
    }
}

export async function verifyClientEmail(email,resetPassword){
    const token = await getToken()

    if(token.error == true){
        const result = {'error':true,data:null}        
        return result;
    }

    const url  = process.env.DEALS_MIDDLEWARE+'api/verify-email'
    const paylaod = {"email" : email,'reset_password' :resetPassword}

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer '+token.data,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){

        const details = await response.json()

        if(details.success_code == true){

            const result = {'error':false,message:details.message,data:details.data,token:token.data}
            return result;
        }else{
            const result = {'error':true,message:details.errors.email,data:null,token:null}
            return result
        }

    }else{
        const result = {'error':true,message:"Server error occured. Please try again",data:null,token:null}        
        return result;
    }
}

export async function verifyClientOtp(otp,userCode,verificationCode,accessToken){

    const url  = process.env.DEALS_MIDDLEWARE+'api/verify-otp'
    const paylaod = {"otp" : otp,'user_code' :userCode, 'verification_code':verificationCode}

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer '+accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){

        const details = await response.json()

        if(details.success_code == true){

            const result = {'error':false,message:details.message}
            return result
        }else{
            const result = {'error':true,message:details.errors.otp}
            return result
        }

    }else{
        const result = {'error':true,message:"Server error occured. Please try again"}        
        return result;
    }
}

export async function resetClientPassword(userCode,resetPassword,password,passwordConfirmation,accessToken){

    const url  = process.env.DEALS_MIDDLEWARE+'api/verify-password'
    const paylaod = {"user_code" : userCode,'password':password, 'password_confirmation':passwordConfirmation,'reset_password':resetPassword}

    const response = await fetch(url,{
        method: 'POST',
        headers: {
            'Authorization' : 'Bearer '+accessToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
    },
        body:JSON.stringify(paylaod),            
    })

    if(response.ok){

        const details = await response.json()

        if(details.success_code == true){

            const result = {'error':false,message:details.message}
            return result
        }else{
            const result = {'error':true,message:details.errors.password}
            return result
        }

    }else{
        const result = {'error':true,message:"Server error occured. Please try again"}        
        return result;
    }    
}