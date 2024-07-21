"use client"
import { useRouter } from "next/navigation"

export default function Button(){
    const router = useRouter()

    const handleRedirect=()=>{
        router.push('https://resume.roh.it.com')
        router.refresh()
    }
    
    return(
        <button className="resume" onClick={handleRedirect}></button>
    )
}