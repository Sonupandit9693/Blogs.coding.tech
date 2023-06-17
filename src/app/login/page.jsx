"use client"
import React, { useState } from 'react'
import classes from "./Login.module.css"
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {signIn} from "next-auth/react"

const Login = () => {
    const [email , setEmail] = useState("");
    const [password, setPassword] = useState('');
    const router = useRouter();

    async function handelSubmit(e){
        e.preventDefault();

        if(password === "" || email === ""){
            toast.error("fill all fiels!");
        }
        if(password.length < 3){
            toast.error("Password must be 6 character")
        }

        try {
            const res = await signIn('credentials', {email, password, redirect: false});
            if(res?.error == null){
                router.push("/");
            }else{
                toast.error("Error occured while loading")
            }
            
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
           <h2>Log In</h2> 
           <form onSubmit={handelSubmit} action="">
            <input type="email" placeholder='Enter your email' onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Enter your password'onChange={(e)=>setPassword(e.target.value)} />
            <button className={classes.submitButton}>Log in</button>
            <Link className={classes.loginNow} href="/register">
                Dont have an account? <br />
               <span>Register now</span> 
            </Link>
           </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Login
