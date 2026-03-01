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
import { Card, Col, Row } from 'react-bootstrap';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Tooltip,
    Legend
);

const LineChart = ({ historic = [] }) => {
    const labels = historic.map((entry) => entry.date);
    const totalCases = historic.map((entry) => entry.cases);
    const newCases = historic.map((entry) => entry.newCases);

    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            y: {
                ticks: {
                    callback: (value) => Number(value).toLocaleString(),
                },
            },
            x: {
                ticks: {
                    autoSkip: true,
                    maxRotation: 0,
                },
            },
        },
    };

    return (
        <Row className="g-2">
            <Col xs={12}>
            <Card>
            <Card.Header className='text-start fw-semibold fs-6 py-2'>Historical Total Cases</Card.Header>
            <Card.Body className='p-2'>
            <div className='ratio ratio-21x9'>
                    <Bar
                        data={{
                            labels,
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
                                    data: totalCases,
                                }
                            ]
                        }}
                        options={commonOptions}
                    />
                </div>
                </Card.Body>
            </Card>
            </Col>
            <Col xs={12}>
            <Card>
                <Card.Header className='text-start fw-semibold fs-6 py-2'>Historical New Cases</Card.Header>
                <Card.Body className='p-2'>
                <div className='ratio ratio-21x9'>
                    <Line
                        data={{
                            labels,
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
                                    data: newCases,
                                }
                            ]
                        }}
                        options={commonOptions}
                    />
                </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>
    );
}

export default LineChart