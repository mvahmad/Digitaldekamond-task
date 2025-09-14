"use client";
import { Button } from "@/app/components/ui/button";
import { redirect, useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { User } from "./type";
export default function Dashboard() {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
    const userInfoString = localStorage.getItem("userData");
        if (userInfoString) {
            try {
                const arr = JSON.parse(userInfoString);
                if (
                Array.isArray(arr) &&
                arr.length > 0 &&
                Array.isArray(arr[0].results) &&
                arr[0].results.length > 0
                ) {
                setUser(arr[0].results[0]);
                } else {
                router.replace("/"); 
                }
            } catch {
                router.replace("/");
            }
        } else {
        router.replace("/"); 
        }
    }, [router]);
    
  const handelLogOut = ()=>{
    localStorage.clear();
    setUser(null);
    redirect("/")

  }

  if (!user) {
    return <div className="p-8">No user data found.</div>;
  }

  return (
    <div className="flex flex-col items-start  p-8 gap-4">
        <div className="font-bold text-xl">Welcom {user.name.title} {user.name.first} {user.name.last}</div>
        {/*  */}
      <Button onClick={handelLogOut} >Log Out</Button>
    </div>
  );
}