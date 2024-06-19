
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS} from 'chart.js/auto'

const BarChart = ({data, options}) => {  
  return  <Bar data={data} options={options} />
}

export default BarChart
