"use client"
import React, { useEffect, useState } from 'react'
import classes from "./blog.module.css"
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const BlogDetails = (ctx) => {
    const [blogDetails, setBlogDetails] = useState("");
    const {data: session} = useSession();

    console.log(blogDetails);
    useEffect(()=>{
        async function fetchBlog(){
            const res = await fetch(`http://localhost:3000/api/blog/${ctx.parms.id}`, {cache: 'no-store'})
            const blog =  await res.json();
            setBlogDetails(blog);

            setIsLiked(blog.likes.includes(session?.user?._id));
            setBlogLikes(blog?.likes?.length);
        }
        session && fetchBlog();
    },[session])
  return (
    <div className={classes.container}>
        <div className={classes.wrapper}>
            <Image src={blogDetails?.imageUrl} alt='blog' width="750" height="650" />
        </div>
    </div>
  )
}

export default BlogDetails
