import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  labels: ['Desktop', 'Tablet', 'Mobile', 'Unknown'],
  legend: {
    show: false,
    position: 'bottom',
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%', // Increase the size of the donut chart
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 400, // Increase the width of the chart
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 250,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const [state] = useState({
    series: [65, 34, 12, 56],
  });

  return (
    <div className="sm:px-7.5 col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-5">
      <div className="mb-3 justify-center flex gap-4"> {/* Centering the title */}
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            Operations
          </h5>
        </div>
      </div>
      <div className="flex justify-center mb-2 mt-30"> {/* Centering the chart and moving it down */}
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-y-3 -mx-8"> {/* Centering the legend */}
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex items-center w-full">
            <span className="block w-full max-w-3 h-3 mr-2 bg-primary rounded-full"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span> Sales </span>
              <span> 65% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex items-center w-full">
            <span className="block w-full max-w-3 h-3 mr-2 bg-[#6577F3] rounded-full"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span> Estimates </span>
              <span> 34% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex items-center w-full">
            <span className="block w-full max-w-3 h-3 mr-2 bg-[#8FD0EF] rounded-full"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span> Projects </span>
              <span> 45% </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex items-center w-full">
            <span className="block w-full max-w-3 h-3 mr-2 bg-[#0FADCF] rounded-full"></span>
            <p className="flex justify-between w-full text-sm font-medium text-black dark:text-white">
              <span> Customers </span>
              <span> 12% </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
