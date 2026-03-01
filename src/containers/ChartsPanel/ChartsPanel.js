import React, { Component } from 'react';

import TotalCard from '../../components/TotalCard/TotalCard.js';
import LineChart from '../../components/LineChart/LineChart.js';
import {Container, Row, Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';


class ChartsPanel extends Component {
    state = {
        loading: true,
        loading2: true,
        error: false,
        errorMessage: '',
        timeframeStart: null,
        timeframeEnd: null,
    }

    sampleTimeseries = (series, maxPoints) => {
        if (series.length <= maxPoints) {
            return series;
        }

        const indices = new Set();
        for (let i = 0; i < maxPoints; i += 1) {
            const index = Math.round((i * (series.length - 1)) / (maxPoints - 1));
            indices.add(index);
        }

        return [...indices]
            .sort((a, b) => a - b)
            .map((index) => series[index]);
    }

    componentDidMount () {
        const basePath = import.meta.env.BASE_URL || '/';

        fetch(`${basePath}data/ny_current.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ny_current.json (${response.status})`);
                }
                return response.json();
            })
            .then( data => {
                this.setState({current: data, loading: false});
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true, errorMessage: error.message, loading: false});
            });

        fetch(`${basePath}data/ny_timeseries.json`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to load ny_timeseries.json (${response.status})`);
                }
                return response.json();
            })
            .then( data => {
                const validTimeseries = (data.actualsTimeseries || []).filter((entry) =>
                    entry && entry.date && entry.cases != null && entry.newCases != null
                );
                const sampledTime = this.sampleTimeseries(validTimeseries, 10);
                const timeframeStart = validTimeseries.length > 0 ? validTimeseries[0].date : null;
                const timeframeEnd = validTimeseries.length > 0 ? validTimeseries[validTimeseries.length - 1].date : null;

                this.setState({
                    historic: sampledTime,
                    timeframeStart,
                    timeframeEnd,
                    loading2: false,
                });
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true, errorMessage: error.message, loading2: false});
            });

    }
    
    render () {
        let displayTotal = <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
        //console.log( this.state.current );
        if (!this.state.loading && this.state.current){
            displayTotal = <TotalCard current={this.state.current}/>;
        }

        let displayLine = <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
        //console.log( this.state.current );
        if (!this.state.loading2 && this.state.historic){
            displayLine = <LineChart historic={this.state.historic}/>;
            //console.log( this.state.historic );
        }

        const timeframeLabel = this.state.timeframeStart && this.state.timeframeEnd
            ? `${this.state.timeframeStart} to ${this.state.timeframeEnd}`
            : 'Loading historical timeframe...';
        

        return (
            <div className="px-2">
            <Container className="py-3">
                <Row>
                    <h5 className="text-start fw-semibold fs-4 mb-2">Using archived data from <a href="https://covidactnow.org/data-api" target="_blank" rel="noreferrer">Covid Act Now</a></h5>
                </Row>
                <Row>
                    <p className="text-start fs-6 mb-3"><strong>Data timeframe:</strong> {timeframeLabel}</p>
                </Row>
                <Row>
                    <p className="text-start fs-5 mb-2">Total current data:</p>
                </Row>
                {this.state.error && (
                <Row>
                    <p className="text-start text-danger mb-3">Unable to load one or more data files. {this.state.errorMessage}</p>
                </Row>
                )}
                <Row className='mb-3'>
                    <Col>
                    {displayTotal}
                    </Col>
                </Row>
                <Row>
                    <p className="text-start fs-5 mb-2">Total historical data:</p>
                </Row>
                <Row>
                    <Col>
                    {displayLine}
                    </Col>
                </Row>
            </Container>
            </div>

        );
    }
}

export default ChartsPanel;