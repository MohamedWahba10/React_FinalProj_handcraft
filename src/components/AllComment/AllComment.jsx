import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import styles from "./AllComment.module.css";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import PersonIcon from "../../assets/images/personIcon.jpeg";

export default function AllComment() {
  const { id, prodName } = useParams();
  const [allcommentData, setAllCommentData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function allComment() {
    try {
      setIsLoading(true); // Set loading state to true before fetching
      let res = await axios.get(
        `http://localhost:8000/api/product/allRateForProduct/${id}/`
      );
      setAllCommentData(res?.data?.ratings);
      console.log(allcommentData);
    } catch (error) {
      console.error("Error while fetching comments:", error);
    } finally {
      setIsLoading(false); // Set loading state to false after fetching
    }
  }

  useEffect(() => {
    allComment();
  }, []);

  return (
    <>
      <Helmet>
        <title>Comment</title>
      </Helmet>
      <div className={`${styles.header_product} py-5 mb-5 text-center `}>
        <h1>All Comment Of Product {prodName}</h1>
        <Link to="/" className="text-decoration-none ">
          <span className={`${styles.link_home} pe-1 `}>HomePage</span>
        </Link>
        <span className={`${styles.span_profile}`}>&gt;Shop</span>
      </div>

      <div className={`container`}>
        <div className="row gy-5">
          {isLoading ? (
            <Loading />
          ) : allcommentData.length > 0 ? (
            allcommentData.map((comment, index) => (
              <div className="col-12" key={index}>
                <div className={`${styles.comment}`}>
                  <div className={`${styles.imgUSer}`}>
                    <img src={PersonIcon} alt="image icon" />
                  </div>
                  <div className={`${styles.dataComment}`}>
                    <div>
                      <h4>
                        <span>Comment By :</span> {comment.first_name_of_user}{" "}
                        {comment.last_name_of_user}
                      </h4>
                      <p>
                        <span  className={`${styles.span_word}`}>Rating : </span>
                        <i className="fa-solid fa-star text-warning pe-1 fs-4"></i>
                        <span className="fs-4">{comment.rating}</span>
                      </p>
                      <p>
                        <span className={`${styles.span_word}`}>
                            Comment :</span> 
                            <span>{comment.review}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={`col-12 text-center ${styles.No_product}`}>
              <h1>No Comments for This Product</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
