"use client"
import { useState } from "react"
import { IranPhoneInput } from "../iranPhoneNumberInput/page"
import { Button } from "../ui/button"


export default function LoginForm (){
    const [phone , setPhone] = useState("")
    return (
         <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                    Login
                </h1>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    
                </p>
      <form onSubmit={()=>{}} className="space-y-5">
        
      <div className="flex flex-col gap-2">
          
        <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
        </label>
           <IranPhoneInput value={phone} onChange={setPhone} />
      </div>
        <Button
          className="text-white w-full "
          type="submit"
        >
          {"Login"}
        </Button>
    </form>
    </div>
    )
}