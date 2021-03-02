import React,{useState,useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import './Chart.css';

/*const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
}*/

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const VerticalBar = () => {
    const [chartLabels,setChartLabels]=useState([]);
    const [chartData,setChartData]=useState([]);

    useEffect(()=>{
        fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=11')
        .then(response=>response.json())
        .then((jsonResponse)=>{
            var dates=Object.keys(jsonResponse.cases);
            var values=Object.values(jsonResponse.cases);
            var newValues=[];
            //Removing the first item of dates
            dates.shift();
            setChartLabels(dates);
            var i;
            for(i=1;i<=values.length-1;i++){
                newValues.push(values[i]-values[i-1]);
            }
            setChartData(newValues);
        })
    },[]);

    const data = {
        labels: chartLabels,
        datasets: [
          {
            label: '# of New Cases',
            data: chartData,
            backgroundColor: [
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
              'crimson',
            ],
            borderColor: [
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
              'red',
            ],
            borderWidth: 1,
          },
        ],
    }

    return(
        <>
            <div className='header chart-header'>
                <h4 className='title'>Worldwide new Cases</h4>
            </div>
            <Bar data={data} options={options} />  
        </>
    );
}

export default VerticalBar;