import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import ProductDiscountChart from "../ProductDiscountChart/ProductDiscountChart";

const AdminDashBoard = () => {
  const [topRatedProducts, setTopRatedProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/product/top_rating/")
      .then((response) => response.json())
      .then((data) => {
        setTopRatedProducts(data.top_rated_products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Once data is fetched, prepare data for the chart
    if (topRatedProducts.length > 0) {
      renderChart();
    }
  }, [topRatedProducts]);

  const renderChart = () => {
    const productNames = topRatedProducts.map(
      (product) => product.product_name
    );
    const averageRatings = topRatedProducts.map(
      (product) => product.average_rating
    );

    const ctx = document.getElementById("topRatedChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: productNames,
        datasets: [
          {
            label: "Average Rating",
            data: averageRatings,
            backgroundColor: "rgba(75, 192, 192, 0.2)", // Adjust color as needed
            borderColor: "rgba(75, 192, 192, 1)", // Adjust color as needed
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div className="my-5 container">
      <div className="row">
        <div className="col-md-6">
        <h3 className="mb-3">Top Rated Products Chart</h3>
        <canvas id="topRatedChart" ></canvas>
        </div>
        <div className="col-md-6">
            <ProductDiscountChart/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
