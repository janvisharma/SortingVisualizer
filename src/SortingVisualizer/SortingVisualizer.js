import React from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import bubbleSort from '../SortingAlgorithms/SortingAlgorithms.js';

class SortingVisualizer extends React.Component{
    constructor(props) { 
        super(props);

        this.state = {
            array: [],
        };
    }

    bubbleSort(){
        const sortedArray = bubbleSort(this.state.array);
        console.log(sortedArray);

        
    }

    componentDidMount() {
        this.randomizeArray();
    }

    randomizeArray() {
        const array = [];
        for(let i = 0; i<155;i++){
            array.push(Math.floor((Math.random() * 600) + 5));
        }
        this.setState({array});
    }    
    
    render(){
        const {array} = this.state;
        return (
            <div className="container">
                <div className="header"><h1>Sorting Visualizer</h1></div>
                {array.map((value, index) => (<div className="bar" key={index} style={{height: `${value}px`}}></div>))}
                <div className="buttons">
                <Button variant="outline-primary" onClick={this.randomizeArray.bind(this)}>Generate New Array</Button>{' '}
                <Button variant="outline-primary" onClick={this.bubbleSort.bind(this)}>Bubble Sort</Button>{' '}
                <Button variant="outline-primary">Merge Sort</Button>{' '}
                <Button variant="outline-primary">Quick Sort</Button>{' '}
                <Button variant="outline-primary">Insertion Sort</Button>{' '}
                <Button variant="outline-primary">Selection Sort</Button>{' '}
                </div>
            </div>
        );
    }
}

export default SortingVisualizer;