import React from "react";
import classes from "./Blogcard.module.css";
import Link from "next/link";
import Image from "next/image";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const BlogCard = ({ blog: { title, desc, img } }) => {
  const isLiked = true;
  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <Link className={classes.imgContainer} href="/">
          <Image src={img} width="350" height="350" alt="blogs" />
        </Link>
        <div className={classes.blogData}>
          <div className={classes.left}>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span>Created By: <span>1st of June</span></span>
          </div>
          <div className={classes.right}>
            {12} {isLiked ? <AiFillLike size={20} /> : <AiOutlineLike size={20}/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
