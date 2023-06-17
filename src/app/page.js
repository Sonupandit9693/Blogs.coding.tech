import Image from 'next/image'
import classes from './page.module.css'
import {blogs} from "../lib/data"
import BlogCard from "../components/blogcard/BlogCard"

export default function Home() {
  return (
    <div className={classes.container}>
    <h2>Sonu kumar Blog website</h2>
      <div className={classes.wrapper}>
      {blogs?.length > 0 
       ? blogs.map((blog) => (
        <BlogCard key={blog.title} blog={blog}/>
      )) : <h3 className={classes.noBlogs}>No blogs are currently in the</h3>}
     </div>
    </div>
  )
}
