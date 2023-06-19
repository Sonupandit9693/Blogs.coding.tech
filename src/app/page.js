import classes from './page.module.css'
import React from 'react';
import BlogCard from "../components/blogcard/BlogCard"


const Home= async()=> {
  async function fetchBlog(){
    const res = await fetch(`https://blogs-coding-tech-bb5gqttrs-sonupandit9693.vercel.app/api/blog` ,{cache: "no-store"});
    return res.json();
  }
  const blogs = await fetchBlog();
  return (
    <div className={classes.container}>
    {blogs?.length > 0 && <h2>Sonu kumar Blog&apos;s website</h2>}
      <div className={classes.wrapper}>
      { blogs?.length > 0 
       ? blogs.map((blog) => (
        <BlogCard key={blog._id} blog={blog}/>
      )) : <h3 className={classes.noBlogs}>No blogs are currently in the database</h3>}
     </div>
    </div>
  )
}

export default Home;