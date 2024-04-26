import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getMerchantSession } from './app/action'

export async function middleware(request) {

    try {
        const session = await getMerchantSession()

        if(session == null){
            return NextResponse.redirect(new URL('/', request.url))
        }
    } catch (error) {
        return NextResponse.redirect(new URL('/', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/home',
        '/validate',
        '/redeem',
        '/report',
    ],
}