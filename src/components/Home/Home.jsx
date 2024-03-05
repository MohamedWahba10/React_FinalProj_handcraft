import React, { useState } from 'react';
import img1 from '../../assets/images/image3.jpg';
import styles from "./Home.module.css";
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (index) => {

    setSelectedCategory(index);

  };

  return (
    <>
      <MainSlider />

      <div className="container">
        <div className="row">
          <div className="md-col-3 text-center mt-5">
            <h2>what's new ?</h2>
          </div>
        </div>
        <div className="d-flex mx-auto border-none rounded-2 bg-secondary pointer rounded border-secondary p-1 mb-4 bg-light justify-content-between text-black" style={{ width: '30rem', color: 'grey' }}>
          {['category 1', 'category 2', 'category 3', 'category 4'].map((category, index) => (
            <div
              key={index}
              className={` p-2 ${selectedCategory === index ? 'border border-secondary-emphasis rounded-4 rounded bg-secondary-emphasis shadow ' : ''}`}
              onClick={() => handleCategoryClick(index)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="row">
          {[1, 2, 3, 4].map((cardIndex) => (
            <div key={cardIndex} className="col-md-3 col-sm-12 ">
              <div className="card" style={{ width: '18rem', height: '12rem' }}>
                <img src={img1} alt="" />
                <div className="card-body gy-5">
                  <h5 className="card-title">{`Category ${selectedCategory + 1} Card ${cardIndex}`}</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
