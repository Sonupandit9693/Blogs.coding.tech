"use client"
import React, { useState } from 'react'
import classes from "./Navbar.module.css"
import Link from 'next/link'
import Image from 'next/image'
import person from "../../../public/person.jpg"
import {AiOutlineClose} from "react-icons/ai"
import { signIn, signOut, useSession} from "next-auth/react"

const Navbar = () => {
    const CLOUD_NAME = 'dby7hnphi';
    const UPLOAD_PRESET = 'my-blog-app';
    const [showDropdown, setShowDropdown] = useState(false);
    const {data: session} = useSession();
    const handelShowDropdown = ()=>{
        setShowDropdown(prev => true);
    }

    const handelHideDropdown =()=>{
        setShowDropdown(prev => false);
    }
    const loogedIn = false;
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <h2 className={classes.left}>
                <Link href="/">SonuBlogs</Link>
            </h2>
            <ul className={classes.right}>
                {session?.user? (
                    <div>
                        <Image onClick={handelShowDropdown} src={person} width='45' height='45' alt='person' />
                        {showDropdown && (
                            <div className={classes.dropdown}>
                                <AiOutlineClose className={classes.closeIcon} onClick={handelHideDropdown}/>
                                <button onClick={()=> {signOut(); handelHideDropdown();}} className={classes.logout}>Logout</button>
                                <Link onClick={handelHideDropdown} href="/create-blog" className={classes.create}>Create</Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <button onClick={()=> {signIn()}}  className={classes.login}>Log in</button>
                        <Link href="/register">Register</Link>
                    </>
                )}
            </ul>
        </div>
    </div>
  )
}

export default Navbar
