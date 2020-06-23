import React from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
// const this.state.value = 100 // size of array 
class SortingVisualizer extends React.Component{
    
    constructor(props) { 
        super(props);

        this.state = {
            array: [],
            value: 30,
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
            arrayBars[array.length-i-1].style.backgroundColor = '#e0aaff';//'#bbf1c8';
        }
        this.setState({array})
        for(i=0;i<this.state.value;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5));
            arrayBars[i].style.backgroundColor = '#3da4ab';
        }
        this.setState({generateButton: false})

    }
    async selectionSort(){
        this.setState({generateButton: true})
        var array = this.state.array
        var arrayBars = document.getElementsByClassName('bar')

        var small, pos=0, i, k, temp

        for(i=0;i<this.state.value;i++){
            await new Promise(resolve => setTimeout(resolve, 5));
            arrayBars[i].style.backgroundColor = '#3a86ff'

            small = array[i]
            pos = i            
            for(k=i+1;k<this.state.value;k++){
                await new Promise(resolve => setTimeout(resolve, 5));
                arrayBars[k].style.backgroundColor = '#ffbe0b';
                if(array[k]<small){
                    small = array[k]
                    pos = k
                }
                await new Promise(resolve => setTimeout(resolve, 5));
                arrayBars[k].style.backgroundColor = '#3a86ff';
            }
        
            temp = array[i]
            array[i] = small
            array[pos] = temp
            this.setState({array})

            await new Promise(resolve => setTimeout(resolve, 7));
            arrayBars[i].style.backgroundColor = '#ff006e'
        }
        this.setState({array})
        for(i=0;i<this.state.value;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5));
            arrayBars[i].style.backgroundColor = '#3da4ab';
        }
        this.setState({generateButton: false})
    }
   
    async insertionSort() {
        this.setState({generateButton: true}) // disable the generateArrayButton
        var array = this.state.array // current array to be sorted 
        var arrayBars = document.getElementsByClassName('bar'); // for animations

        var i, j;
        for(i=0;i<this.state.value;i++){
            var temp = array[i];
            await new Promise(resolve => setTimeout(resolve, 5));
            arrayBars[i].style.backgroundColor = '#ff1654';
            j = i-1;
            while(j>=0 && array[j]>temp){
                await new Promise(resolve => setTimeout(resolve, 5));
                arrayBars[j].style.backgroundColor = '#ff1654';
                array[j+1] = array[j];
                await new Promise(resolve => setTimeout(resolve, 1));
                arrayBars[j].style.backgroundColor = '#7678ed'//'#ffa6c1';
                j = j - 1;
            }
            arrayBars[i].style.backgroundColor = '#7678ed' //'#ffa6c1';

            array[j+1] = temp;
            this.setState({array})
        }
        
        for(i=0;i<this.state.value;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5));
            arrayBars[i].style.backgroundColor = '#3da4ab';
        }
        this.setState({generateButton: false})

    }

    componentDidMount() {
        this.randomizeArray();
    }

    randomizeArray() {
        const array = [];
        for(let i = 0; i<this.state.value;i++){
            array.push(Math.floor((Math.random() * 550) + 5));
        }
        this.setState({array});
    }    
    handleChange(event) {
        this.setState({value: event.target.value});
        this.randomizeArray()
    }
    render(){
        const {array} = this.state;
        return (
            // <div className="container">
            <Container fluid style={{backgroundColor:'black'}}>
                <div className="header"><h1>Sorting Visualizer</h1></div>
                <div className='range-slider'>
                <Button style={{margin: '10px'}} disabled={this.state.generateButton} variant="outline-primary" onClick={this.randomizeArray.bind(this)}>Generate New Array</Button>{' '}
                <RangeSlider
                // onChange={changeEvent => this.setState({ value: changeEvent.target.value})}
                value = {this.state.value}
                disabled={this.state.generateButton}
                onChange={this.handleChange.bind(this)}
                variant="info"
                min="30"
                max="100"
                />
                <Button style={{margin: '10px'}} variant="outline-primary" onClick={this.bubbleSorthelper.bind(this)}>Bubble Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary">Merge Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary" >Quick Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary" onClick={this.insertionSort.bind(this)}>Insertion Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary"onClick={this.selectionSort.bind(this)}>Selection Sort</Button>{' '}
                </div>
                <div className="array-bars">
                {array.map((value, index) => (<div className="bar" key={index} style={{height: `${value}px`}}></div>))}
                </div>
                
            </Container>
        );
    }
}

export default SortingVisualizer;