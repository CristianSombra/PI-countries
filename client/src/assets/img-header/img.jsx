import React from "react";
import styles from "./img.module.css";
import img from "./img-header.jpg";

const ImageHeader = () => {
  return (
    <div className={styles.imageContainer}>
      <img src={img} alt="Imagen del navbar" />
    </div>
  );
};

export default ImageHeader;