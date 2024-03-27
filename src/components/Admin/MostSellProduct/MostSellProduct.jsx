
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const MostSellProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the lastProducts API endpoint
    fetch("http://127.0.0.1:8000/api/panel/most-selling-products/")
      .then((response) => response.json())
      .then((data) => {
        // Set the products data to state
        setProducts(data.most_selling_products);

        // Once data is fetched, prepare data for the chart
        renderChart(data.most_selling_products);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderChart = (productData) => {
    // Extract product names and prices for chart labels and data
    const productNames = productData.map((product) => product.name);
    const productQuantity = productData.map((product) => parseFloat(product.quantity_sold));

    // Prepare data for the chart
    const chartData = {
      labels: productNames,
      datasets: [
        {
          label: "Product Quantity",
          data: productQuantity,
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          borderColor: "rgba(255, 206, 86, 1)",
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  };

  return (
    <div className="container">
      <h3>Best Seller</h3>
      <div style={{ height: "400px" }}>
        <Bar data={renderChart(products)} options={{ maintainAspectRatio: false }} />
      </div>
     
    </div>
  );
};

export default  MostSellProduct 
