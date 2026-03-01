import React, { Component } from 'react';

import TotalCard from '../../components/TotalCard/TotalCard.js';
import LineChart from '../../components/LineChart/LineChart.js';
import {Container, Row, Col} from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './ChartsPanel.css';


class ChartsPanel extends Component {
    state = {
        loading: true,
        loading2: true,
        error: false,
    }

    componentDidMount () {
        fetch('/data/ny_current.json')
            .then( response => response.json() )
            .then( data => {
                this.setState({current: data, loading: false});
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true, loading: false});
            });

        fetch('/data/ny_timeseries.json')
            .then( response => response.json() )
            .then( data => {
                const actualsTimeseries = data.actualsTimeseries.reverse();
                const slicedTime = [];
                const maxVal = 10;
                const delta = Math.floor(actualsTimeseries.length / maxVal);

                for ( let i=0; i < actualsTimeseries.length; i=i+delta) {
                    slicedTime.push(actualsTimeseries[i]);
                }

                this.setState({historic: slicedTime.reverse(), loading2: false});
            } )
            .catch(error => {
                console.log(error);
                this.setState({error: true, loading2: false});
            });

    }
    
    render () {
        let displayTotal = <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>
        //console.log( this.state.current );
        if (!this.state.loading){
            displayTotal = <TotalCard current={this.state.current}/>;
        }

        let displayLine = <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
        //console.log( this.state.current );
        if (!this.state.loading2){
            displayLine = <LineChart historic={this.state.historic}/>;
            //console.log( this.state.historic );
        }
        

        return (
            <div >
            <Container>
                <Row>
                    <h5 className="Header">Using archived data from <a href="https://covidactnow.org/data-api" target="_blank" rel="noreferrer">Covid Act Now</a></h5>
                </Row>
                <Row>
                    <p className="Header">Total current data:</p>
                </Row>
                <Row className='Part'>
                    <Col>
                    {displayTotal}
                    </Col>
                </Row>
                <Row>
                    <p className="Header">Total historical data:</p>
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