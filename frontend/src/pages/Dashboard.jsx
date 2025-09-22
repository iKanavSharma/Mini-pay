import { Appbar } from "../components/Appbar"
import { Users } from "../components/Users"
import { Balance } from "../components/Balance"
import { useEffect,useState } from "react"
import axios from "axios"

export const Dashboard=()=>{

    const [balance,setBalance]=useState(null);

    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/account/balance",{
            headers:{
                Authorization:"Bearer "+localStorage.getItem("token")
            },
        })
        .then((res)=>{
            setBalance(res.data.balance);
        })
        .catch((e)=>{
            console.error("Failed to fetch balance",err);
        })
    },[])

    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={balance!==null ? balance : "Loading..."}/>
            <Users/>
        </div>
    </div>
}