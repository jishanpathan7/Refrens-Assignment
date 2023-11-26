//* Packages Imports */
import React from "react";
import { Link } from "react-router-dom";

//* Styles Imports */
import styles from "./Card.module.scss";


const Cards = ({ results, page }) => {
  let display;
  if (results) {
    display = results.map((item) => {
      let { id, image, name, location, status } = item;

      return (
        <Link
          style={{ textDecoration: "none" }}
          to={`${page}${id}`}
          key={id}
          className="col-md-3 col-sm-6 col-12 position-relative text-dark"
        >
          <div
            className={`${styles.cards} d-flex flex-column justify-content-center`}
          >
            <img
              src={image}
              alt={name}
              className={` ${styles.img} img-fluid`}
            />
            <div style={{ padding: "10px" }} className="content">
              <div className="fs-4 fw-bold mb-4">{name}</div>
              <div>
                <div className="fs-6 ">Last location</div>
                <div className=" fs-5 ">{location.name}</div>
              </div>
            </div>
          </div>
          {(() => {
            if (status === "Dead") {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-danger`}
                >
                  {status}
                </div>
              );
            } else if (status === "Alive") {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-success`}
                >
                  {status}
                </div>
              );
            } else {
              return (
                <div
                  className={`${styles.badge} position-absolute badge bg-secondary`}
                >
                  {status}
                </div>
              );
            }
          })()}
        </Link>
      );
    });
  } else {
    display = "No Cahracters Found :(";
  }
  return <>{display}</>;
};

export default Cards;
