import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const ProductDiscountChart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from your Django backend API
    fetch("http://127.0.0.1:8000/api/product/")
      .then((response) => response.json())
      .then((data) => {
        // Filter products that are on sale
        const onSaleProducts = data.results.filter(
          (product) => product.product.prodOnSale
        );

        // Limit the number of displayed products to at most 6
        const limitedProducts = onSaleProducts.slice(0, 6);

        // Set the filtered and limited products data to state
        setProducts(limitedProducts);

        // Once data is fetched, prepare data for the chart
        renderChart(limitedProducts);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderChart = (products) => {
    const productNames = products.map((product) => product.product.prodName);
    const discountedPrices = products.map(
      (product) => product.product.discounted_price
    );

    // Create a new chart instance
    const ctx = document.getElementById("productDiscountChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: productNames,
        datasets: [
          {
            label: "Discounted Prices",
            data: discountedPrices,
            backgroundColor: "rgba(255, 99, 132, 0.2)", // Change the background color here
            borderColor: "rgba(255, 99, 132, 1)", // Adjust color as needed
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
    <div className="container">
      <h3>Product Discounts Chart</h3>
      <canvas id="productDiscountChart" width="400" height="200"></canvas>
    </div>
  );
};

export default ProductDiscountChart;
