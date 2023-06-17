import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the app</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque,
            eaque aut. Laudantium possimus explicabo quos voluptatibus illo
            voluptatem voluptates doloremque nostrum cum, iusto quisquam officia
            voluptatum enim perferendis nulla odit?
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contact</h2>
          <span>phone +123 456 789</span>
          <span>Github: sonupandir9693</span>
          <span>Youtube: sonu kumar</span>
        </div>
        <div className={classes.col}>
           <h2>Location</h2>
            <span>Continent : Asia</span>
            <span>Country: India</span>
            <span>Current Location: Faridabad</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
