import Image from 'next/image'
import classes from './page.module.css'
import {blogs} from "../lib/data"
import BlogCard from "../components/blogcard/BlogCard"

export async function fetchBlog(){
  const res = await fetch(`http://localhost:3000/api/blog` ,{cache: "no-store"});
  return res.json();
}

export default async function Home() {
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
