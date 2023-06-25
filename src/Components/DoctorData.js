import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);

const DoctorsChart = () => {
  const [chartData, setChartData] = useState({});
  const options = {
    plugins:{
        legend:true,
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
    scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Cities',
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Number of Doctors',
          },
        },
      },
      tooltips: {
        enabled: true,
      },
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:8000/api/doctorsData/')

    const data = response.data;
    if (data && data.length > 0) {
        const cities = data.slice(0, 20).map(item => item.city);
        const numberOfDoctors = data.slice(0, 20).map(item => parseInt(item.number_of_doctors));

        console.log(numberOfDoctors)
        // Create the chart data object
        const chartData = {
            labels: cities,
            datasets: [
                {
                    labels: 'Number of Doctors',
                    data: numberOfDoctors,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.4,
                },
            ]
        };

        setChartData(chartData);
    }
  };

  return (
    <div>
      <h2 className='text-center text-3xl'>Data Analysis</h2>
      <div className='pl-20 pr-20 h-[500px] pt-10 flex justify-center items-center'>
        {
            Object.keys(chartData).length > 0 ? <Line data={chartData}
            options={options}
            />:null
        }
      </div>
    </div>
  );
};

export default DoctorsChart;
