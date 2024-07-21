"use client"
import { useRouter } from "next/navigation"

export default function Button(){
    const router = useRouter()

    const handleRedirect=()=>{
        router.push('https://drive.google.com/file/d/1C8ZvG-siYZaWv57-tv9u0jiZCRkTOqUx/view?usp=sharing')
        router.refresh()
    }
    
    return(
        <button className="resume" onClick={handleRedirect}></button>
    )
}