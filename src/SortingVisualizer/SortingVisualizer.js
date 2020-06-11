import React from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import bubbleSort from '../SortingAlgorithms/SortingAlgorithms.js';
import { Container, Row, Col } from 'react-bootstrap';
class SortingVisualizer extends React.Component{
    constructor(props) { 
        super(props);

        this.state = {
            array: [],
            generateButton: false, 
        };
    }

    async bubbleSorthelper() {
        this.setState({generateButton: true})
        var array = this.state.array
        //const sortedArray = bubbleSort(array);
        //this.setState({sortedArray})
        var i, j;
        var arrayBars = document.getElementsByClassName('bar');

        for(i = 0; i<array.length; i++){
            for(j = 0; j<array.length-i-1; j++){
        
                if(array[j+1]<array[j]){
                    var temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    arrayBars[j].style.backgroundColor = '#2d00f7';// '#d63447';
                    arrayBars[j+1].style.backgroundColor = '#2d00f7';//'#d63447';
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
                arrayBars[j].style.backgroundColor = '#d100d1';//'#3da4ab';
                arrayBars[j+1].style.backgroundColor =  '#d100d1';//'#3da4ab';
            }
            this.setState({array})
            arrayBars[array.length-i-1].style.backgroundColor = '#8900f2';//'#bbf1c8';
        }

        for(i=0;i<180;i++){
            arrayBars[i].style.backgroundColor = '#3da4ab';
        }
        this.setState({generateButton: false})

    }

    componentDidMount() {
        this.randomizeArray();
    }

    randomizeArray() {
        const array = [];
        for(let i = 0; i<180;i++){
            array.push(Math.floor((Math.random() * 600) + 5));
        }
        this.setState({array});
    }    
    
    render(){
        const {array} = this.state;
        return (
            // <div className="container">
            <Container fluid style={{backgroundColor:'black'}}>
                <div className="header"><h1>Sorting Visualizer</h1></div>
                {array.map((value, index) => (<div className="bar" key={index} style={{height: `${value}px`}}></div>))}
                <div className="buttons">
                <Button style={{margin: '5px'}} disabled={this.state.generateButton} variant="outline-primary" onClick={this.randomizeArray.bind(this)}>Generate New Array</Button>{' '}
                <Button style={{margin: '5px'}} variant="outline-primary" onClick={this.bubbleSorthelper.bind(this)}>Bubble Sort</Button>{' '}
                <Button style={{margin: '5px'}} variant="outline-primary">Merge Sort</Button>{' '}
                <Button style={{margin: '5px'}} variant="outline-primary">Quick Sort</Button>{' '}
                <Button style={{margin: '5px'}} variant="outline-primary">Insertion Sort</Button>{' '}
                <Button style={{margin: '5px'}} variant="outline-primary">Selection Sort</Button>{' '}
                </div>
            </Container>
        );
    }
}

export default SortingVisualizer;