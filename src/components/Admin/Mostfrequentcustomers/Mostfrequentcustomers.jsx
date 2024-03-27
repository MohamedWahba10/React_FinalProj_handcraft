


import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";

const Mostfrequentcustomers = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the lastProducts API endpoint
    fetch("http://127.0.0.1:8000/api/panel/most-frequent-customers/")
      .then((response) => response.json())
      .then((data) => {
        // Set the products data to state
        setProducts(data.most_frequent_customers);

        // Once data is fetched, prepare data for the chart
        renderChart(data.most_frequent_customers);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderChart = (productData) => {
    // Extract product names and prices for chart labels and data
    const productNames = productData.map((product) => product.name);
    const order_count = productData.map((product) => parseFloat(product.order_count));

    // Prepare data for the chart
    const chartData = {
      labels: productNames,
      datasets: [
        {
          label: "order_count ",
          data: order_count,
          backgroundColor: "rgba(255, 99, 132, 1)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
        },
      ],
    };

    return chartData;
  };

  return (
    <div className="container">
      <h3>Top frequent customers</h3>
      <div style={{ height: "400px" }}>
        <Bar data={renderChart(products)} options={{ maintainAspectRatio: false }} />
      </div>
     
    </div>
  );
};

export default  Mostfrequentcustomers 
