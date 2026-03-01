import React from 'react';

import { Card, Row, Col } from 'react-bootstrap';
import { Doughnut  } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import CountUp from 'react-countup';

ChartJS.register(ArcElement, Tooltip, Legend);


const TotalCard = (props) => (
    <Row className='g-2'>
            <Col md={6} xl={4}>
                <Card className='h-100'>
                    <Card.Header as="h5" className='text-center fw-semibold py-2 fs-5'>Cases</Card.Header>
                    <Card.Body className='py-3'>
                        <Card.Title className='text-center fw-semibold fs-3 mb-2'>
                            <CountUp end={props.current.actuals.cases} duration={1} separator=","/>
                        </Card.Title>
                        <Card.Text className='text-center fs-6 mb-0'>
                        Total new cases: <CountUp end={props.current.actuals.newCases} duration={1} separator=","/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={6} xl={4}>
                <Card className='h-100'>
                <Card.Header as="h5" className='text-center fw-semibold py-2 fs-5'>Deaths</Card.Header>
                    <Card.Body className='py-3'>
                        <Card.Title className='text-center fw-semibold fs-3 mb-2'>
                            <CountUp end={props.current.actuals.deaths} duration={1} separator=","/>
                        </Card.Title>
                        <Card.Text className='text-center fs-6 mb-0'>
                        Total new deaths: <CountUp end={props.current.actuals.newDeaths} duration={1} separator=","/>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
            <Col md={12} xl={4}>
            <Card className='h-100'>
                <Card.Header as="h5" className='text-center fw-semibold py-2 fs-5'>Test Results</Card.Header>
                <Card.Body className='py-2'>
                    <div className='mx-auto w-100' style={{ maxWidth: '250px' }}>
                        <Doughnut
                            data={{
                            labels: ['Positive', 'Negative'],
                            datasets: [
                                {
                                    label: "Cases",
                                    borderWidth: 1,
                                    backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)'
                                    ],
                                    borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)'
                                    ],
                                    hoverBackgroundColor: "#ed873e",
                                    hoverBorderColor: "#e35f00",
                                    data: [props.current.actuals.positiveTests, props.current.actuals.negativeTests],
                                }
                                ]
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true,
                                cutout: '58%',
                                plugins: {
                                    legend: {
                                        position: 'top',
                                        labels: {
                                            boxWidth: 14,
                                            padding: 14,
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                </Card.Body>
            </Card>
            </Col>
        </Row>

  )
  
  export default TotalCard;