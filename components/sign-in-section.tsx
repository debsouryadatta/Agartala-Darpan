"use client"

import { signInWithGoogle } from "@/actions/google-auth-action"
import SignInForm from "@/components/sign-in-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { JSX, SVGProps } from "react"

const GoogleIcon = (
   props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) => (
   <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z" />
   </svg>
);

export default function SignInSection() {
   return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-cream via-light-cream to-taupe">
         <div className="flex flex-1 flex-col justify-center px-4 py-10 lg:px-6">
            <div className="sm:mx-auto sm:w-full sm:max-w-md bg-white rounded-2xl shadow-xl p-8 border border-taupe">
               <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-burgundy/10 mb-4">
                     <svg className="w-8 h-8 text-burgundy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                     </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-burgundy mb-2">
                     Admin Portal
                  </h3>
               </div>
               {/* <div className="mt-8">
                  <Button variant="outline" className="w-full" onClick={signInWithGoogle}>
                     <GoogleIcon className="size-4" aria-hidden={true} />
                     Login with Google
                  </Button>
               </div>

               <div className="py-7">
                  <div className="relative">
                     <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"></span>
                     </div>
                     <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                           Or continue with
                        </span>
                     </div>
                  </div>
               </div> */}
               <SignInForm />

               <div className="mt-6 pt-6 border-t border-taupe">
                  <p className="text-xs text-center text-charcoal/60">
                     This portal is restricted to authorized administrators only.
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}
