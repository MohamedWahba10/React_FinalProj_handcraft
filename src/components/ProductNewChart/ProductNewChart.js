import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const ProductNewChart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the lastProducts API endpoint
    fetch("http://127.0.0.1:8000/api/product/lastProducts")
      .then((response) => response.json())
      .then((data) => {
        // Set the products data to state
        setProducts(data.data);

        // Once data is fetched, prepare data for the chart
        renderChart(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderChart = (productData) => {
    // Extract product names and prices for chart labels and data
    const productNames = productData.map((product) => product.prodName);
    const productPrices = productData.map((product) => parseFloat(product.prodPrice));

    // Prepare data for the chart
    const chartData = {
      labels: productNames,
      datasets: [
        {
          label: "Product Prices",
          data: productPrices,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  };

  return (
    <div className="container">
      <h3>Product New Chart</h3>
      <div style={{ height: "400px" }}>
        <Bar data={renderChart(products)} options={{ maintainAspectRatio: false }} />
      </div>
     
    </div>
  );
};

export default ProductNewChart;
