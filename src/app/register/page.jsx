'use client'
import React, { useState } from 'react'
import classes from "./register.module.css"
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handelSubmit= async(e)=>{
        e.preventDefault();
        if(username === '' || email === '' || password === ''){
            toast.error("fill all the filed");
            return;
        }
        if(password < 3){
            toast.error("password must be 4 characters");
            return ;
        }
        try {
            const res = await fetch('https://blogs-coding-tech-aksz-ot4o96k28-sonupandit9693.vercel.app/api/register',{
                headers:{
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({username, email, password})
            });
            console.log(await res.json());
            if(res.ok){
                toast.success("Successfully register the user")
                setTimeout(()=>{
                    signIn();
                },1000)
                return
            }else{
                toast.error("Error occured while registering")
                return 
            }

        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2>Register</h2>
            <form onSubmit={handelSubmit}>
                <input type="text" placeholder='Enter your username' onChange={(e)=> setUsername(e.target.value)} />
                <input type="email" placeholder='Enter your email' onChange={(e)=> setEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)} />
                <button className={classes.submitButton}>Register</button>
                <button className={classes.registerNow} onClick={()=> signIn()}>
                    Don&apos;t have an account? <br/> <span> Register now.</span>
                </button>
            </form>
        </div>
        <ToastContainer/>
    </div>
  )
}

export default Register
