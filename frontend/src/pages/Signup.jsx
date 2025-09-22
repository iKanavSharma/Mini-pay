import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    {/* state hooks to store values */}

    const [firstName,setFirstname]=useState("");
    const [lastName,setLastname]=useState("");
    const [userName,setUsername]=useState("");
    const [password,setpassword]=useState("");
    const navigate=useNavigate();

    return <div className="flex justify-center bg-slate-300 h-screen">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign up"}/>
                <Subheading label={"Enter your information to create an account"}/>
                <InputBox onChange={e=>{
                    setFirstname(e.target.value);
                }} placeholder="John" label={"First Name"}/>
                <InputBox onChange={e=>{
                    setLastname(e.target.value);
                }} placeholder="Doe" label={"Last Name"}/>
                <InputBox onChange={e=>{
                    setUsername(e.target.value);
                }} placeholder="user@gmail.com" label={"Email"}/>
                <InputBox onChange={e=>{
                    setpassword(e.target.value);
                }} placeholder="12345678" label={"Password"}/>
            
                <div className="pt-4">
                    <Button onClick={async ()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                            userName,
                            firstName,
                            lastName,
                            password
                        });
                        localStorage.setItem("token",response.data.token);
                        navigate("/dashboard")
                    }} label={"Sign Up"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}/>
            </div>
        </div>
    </div>
}