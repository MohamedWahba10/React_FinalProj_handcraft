import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const CountProdUserChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data from your Django backend API
    fetch("http://127.0.0.1:8000/api/panel/count-prod-user/")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Once data is fetched, prepare data for the chart
        renderChart(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderChart = (data) => {
    if (!data) return;

    const { total_products, total_users } = data;
    const productCount = total_products;
    const vendorCount = total_users.vendors;
    const customerCount = total_users.customers;

    // Create a new chart instance
    const ctx = document.getElementById("countProdUserChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Products", "Vendors", "Customers"],
        datasets: [
          {
            label: "Count",
            data: [productCount, vendorCount, customerCount],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
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
      <h3>Count of Products and Users Chart</h3>
      <canvas id="countProdUserChart" width="400" height="200"></canvas>
    </div>
  );
};

export default CountProdUserChart;
