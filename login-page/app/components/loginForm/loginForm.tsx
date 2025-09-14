"use client"
import { useState } from "react"
import  IranPhoneInput  from "../iranPhoneNumberInput/iranPhoneNumberInput"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { isValidIranPhone } from "@/app/lib/utils"; 
import { useRouter } from "next/navigation"

interface ApiErrorType {
  message: string;
  statusCode?: number;
}



export default function LoginForm (){
    const [phone , setPhone] = useState("")
    const [phoneError, setPhoneError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);
    const router = useRouter()

    const handlePhoneChange = (value: string) => {
      setPhone(value);
      if (!isValidIranPhone(value)) {
        setPhoneError("Phone number is not valid");  
      } else {
        setPhoneError(null);
      }
    };

    const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setApiError(null);
  setLoading(true);

  try {
    const res = await fetch("https://randomuser.me/api/?results=1&nat=us", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error: ApiErrorType = {
        message: "Failed to login",
        statusCode: res.status,
      };
      throw error;
    }

    const data = await res.json();
    localStorage.setItem("Phone Number", phone);
    localStorage.setItem("userData", JSON.stringify([data], null, 2));
    router.push("/dashboard");
  } catch (error) {
    if (typeof error === "object" && error !== null && "message" in error) {
      const typedError = error as ApiErrorType;
      setApiError(
        typedError.statusCode
          ? `Error ${typedError.statusCode}: ${typedError.message}`
          : typedError.message
      );
    } else {
      setApiError("An unknown error occurred");
    }
  } finally {
    setLoading(false);
  }
};
    return (
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 ">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Login
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center"></p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-2">
            <Label>Phone Number</Label>
            <IranPhoneInput value={phone} onChange={handlePhoneChange} error={phoneError || undefined} />
          </div>
          <Button
            className="text-white w-full"
            type="submit"
            disabled={loading || !!phoneError || !phone}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          {apiError && <div className="text-red-500">{apiError}</div>}
        </form>
      </div>
    )
}