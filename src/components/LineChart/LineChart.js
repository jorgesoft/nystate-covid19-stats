import React from 'react'
import { Bar, Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
} from 'chart.js';
import '../LineChart/LineChart.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

const LineChart = (props) => (
    <div className="disp">
        <div id='first'>
        <Bar 
            data={{
            labels: [props.historic[0]['date'],
            props.historic[1]['date'],
            props.historic[2]['date'],
            props.historic[3]['date'],
            props.historic[4]['date'],
            props.historic[5]['date'],
            props.historic[6]['date'],
            props.historic[7]['date'],
            props.historic[8]['date'],
            props.historic[9]['date'],
            ],
            datasets: [
                {
                label: 'Historical Total Cases',
                borderWidth: 1,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)'
                    ],
                borderColor: [
                'rgba(255, 99, 132, 1)'
                ],
                hoverBackgroundColor: "#ed873e",
                hoverBorderColor: "#e35f00",
                data: [props.historic[0]['cases'],
                props.historic[1]['cases'],
                props.historic[2]['cases'],
                props.historic[3]['cases'],
                props.historic[4]['cases'],
                props.historic[5]['cases'],
                props.historic[6]['cases'],
                props.historic[7]['cases'],
                props.historic[8]['cases'],
                props.historic[9]['cases']
                ],
                }
                ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
            }}
        />
        </div>
        <div id='second'>
        <Line 
            data={{
            labels: [props.historic[0]['date'],
            props.historic[1]['date'],
            props.historic[2]['date'],
            props.historic[3]['date'],
            props.historic[4]['date'],
            props.historic[5]['date'],
            props.historic[6]['date'],
            props.historic[7]['date'],
            props.historic[8]['date'],
            props.historic[9]['date'],
                ],
                datasets: [
                    {
                        label: 'Historical New Cases',
                        borderWidth: 1,
                        backgroundColor: [
                            'rgba(255, 99, 132, 1)'
                            ],
                        borderColor: [
                        'rgba(255, 99, 132, 1)'
                        ],
                        fill: false,
                        hoverBackgroundColor: "#ed873e",
                        hoverBorderColor: "#e35f00",
                        data: [props.historic[0]['newCases'],
                        props.historic[1]['newCases'],
                        props.historic[2]['newCases'],
                        props.historic[3]['newCases'],
                        props.historic[4]['newCases'],
                        props.historic[5]['newCases'],
                        props.historic[6]['newCases'],
                        props.historic[7]['newCases'],
                        props.historic[8]['newCases'],
                        props.historic[9]['newCases']
                    ],
                    }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                }}
                />
        </div>
    </div>
)

export default LineChart