export const dynamic = "force-dynamic"
import classes from "./page.module.css";
import React from "react";
import BlogCard from "../components/blogcard/BlogCard";


const Home = async () => {
  const fetchBlog = async () => {
    const res = await fetch(`${process.env.BASE_URL}/api/blog`, {
      cache: "no-store",
    });
    if(!res.ok){
      return null;
    }
    return res.json();

    // const json = res.json();
    // const json = JSON.stringify(res);
    // const data = JSON.parse(json);

  };

  const blogs = await fetchBlog();
  if(!blogs){
   return <div>Failed to fetch Data</div>
  }
  return (
    <div className={classes.container}>
      {blogs?.length > 0 && <h2>Sonu kumar Blog&apos;s website</h2>}
      <div className={classes.wrapper}>
        {blogs?.length > 0 ? (
          blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <h3 className={classes.noBlogs}>
            No blogs are currently in the database
          </h3>
        )}
      </div>
    </div>
  );
};

export default Home;