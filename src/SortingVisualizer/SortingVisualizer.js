import React from 'react';
import './SortingVisualizer.css';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';
import RangeSlider from 'react-bootstrap-range-slider';
// const this.state.value = 100 // size of array 
class SortingVisualizer extends React.Component{
    
    constructor(props) { 
        super(props);
        this.myArrayBars = [] // use an array 
        
        this.state = {
            array: [],
            value: 30,
            generateButton: false, 
        };

        this.arrayRef = [] // refs using callback method
 
    }

    
    async bubbleSorthelper() {
        this.setState({generateButton: true})
        var array = this.state.array

        console.log(this.arrayRef)
        //const sortedArray = bubbleSort(array);
        //this.setState({sortedArray})
        var i, j;
        // var arrayBars = document.getElementsByClassName('bar');

        // let us use refs instead 

        for(i = 0; i<array.length; i++){
            for(j = 0; j<array.length-i-1; j++){
        
                if(array[j+1]<array[j]){
                    var temp = array[j];
                    array[j] = array[j+1];
                    array[j+1] = temp;
                    this.arrayRef[j].style.backgroundColor = '#2d00f7';// '#d63447';
                    this.arrayRef[j+1].style.backgroundColor = '#2d00f7';//'#d63447';
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
                this.arrayRef[j].style.backgroundColor = '#d100d1';//'#3da4ab';
                this.arrayRef[j+1].style.backgroundColor =  '#d100d1';//'#3da4ab';
            }
            this.setState({array})
            this.arrayRef[array.length-i-1].style.backgroundColor = '#e0aaff';//'#bbf1c8';
        }
        this.setState({array})
        // var n = this.state.value
        
        for(i=0;i<this.state.array.length;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5));
            if(this.arrayRef[i]){
                this.arrayRef[i].style.backgroundColor = '#3da4ab';
            }
            else{
                break
            }
        }
        this.setState({generateButton: false})
        
    }
    async selectionSort(){
        this.setState({generateButton: true})
        var array = this.state.array
        // var arrayBars = document.getElementsByClassName('bar')

        var small, pos=0, i, k, temp

        for(i=0;i<this.state.array.length;i++){
            await new Promise(resolve => setTimeout(resolve, 5));
            this.arrayRef[i].style.backgroundColor = '#3a86ff'
            small = array[i]
            pos = i            
            for(k=i+1;k<this.state.array.length;k++){
                await new Promise(resolve => setTimeout(resolve, 5));
                this.arrayRef[k].style.backgroundColor = '#ffbe0b';
                if(array[k]<small){
                    small = array[k]
                    pos = k
                }
                await new Promise(resolve => setTimeout(resolve, 5));
                this.arrayRef[k].style.backgroundColor = '#3a86ff';
            }
        
            temp = array[i]
            array[i] = small
            array[pos] = temp
            this.setState({array})

            await new Promise(resolve => setTimeout(resolve, 7));
            this.arrayRef[i].style.backgroundColor = '#ff006e'
        }
        this.setState({array})
        for(i=0;i<this.state.array.length;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5)); 
            this.arrayRef[i].style.backgroundColor = '#3da4ab';
        }
        this.setState({generateButton: false})
    }

    
    Partition(array, p, r){
        var x = array[r]
        var i = p-1

        var j,temp

        for(j=p;j<r;j++){
            temp = 0
            if(array[j]<=x){

                setTimeout(() => {
                    this.arrayRef[j].style.backgroundColor = '#89043D';
                }, 20)

                i = i+1
                temp=array[j]
                array[j] = array[i]
                array[i] = temp
            }
        }
        temp = 0 
        temp = array[r]
        array[r] = array[i+1]
        array[i+1] = temp

        setTimeout(() => {
            this.arrayRef[i+1].style.backgroundColor = '#B2ABF2';
        }, 20)

        setTimeout(() => {
            this.setState({array})
        }, 5)


        return i+1
    }
    
    quickSort(array, p, r) {
        setTimeout(() => {
            if(p<r){
                var q = this.Partition(array,p,r)
                this.quickSort(array, p, q-1)
                this.quickSort(array,q+1,r)
            }
        }, 110);
        
    }
    
    quickSortHelper(){
        this.setState({generateButton: true})
        console.log(this.state.generateButton)

        var array = this.state.array
        // var value = this.state.value
        // this.quickSort(array, 0, value-1)
        // instead of using the state value, use the state array's length 
        
        this.quickSort(array, 0, array.length-1 )
        
        setTimeout(() => {
            var i 
            array = this.arrayRef
            this.setState({generateButton: false})
            for(i=0;i<this.arrayRef.length;i++){ // or use let for i
                setTimeout((i)=>{
                    this.arrayRef[i].style.backgroundColor = '#3da4ab'
                }, 50*i, i) // pass i as a param 
            }
        }, 2000)
        
        this.setState({array})

    }
    merge(array, start, mid, end){
        var n1 = mid - start +1
        var n2 = end - mid

        var left = []
        var right = []

        var i, j, k = 0;

        for(i=0;i<n1;i++){
            left[i] = array[start + i]
        }
        for(j=0;j<n2;j++){
            right[j] = array[mid + 1 + j]
        }

        var i = 0 , j = 0 , k = start 

        while(i<n1 && j<n2){
            if(left[i]<=right[j]){
                array[k] = left[i]
                i += 1
                k += 1
            }
            else{
                array[k] = right[j]
                j += 1
                k += 1
            }
        }

        while(i<n1){
            array[k] = left[i]
            i += 1
            k += 1
        }
        while(j<n2){
            array[k] = right[j]
            j += 1
            k += 1
        }
    
               
    }
    mergeSort(array, start, end){
        if(start<end){
            var mid = Math.floor(start + (end-start)/2)
            this.arrayRef[mid].style.backgroundColor = '#6610f2'            
            this.mergeSort(array, start, mid)
            this.mergeSort(array,mid+1, end)
            this.merge(array, start, mid, end)   
        }
    }

    
    mergeSortHelper () {
        var array = this.state.array
        this.mergeSort(array, 0, array.length - 1)

        this.setState({array})
        console.log(this.state.array)

        var i 
        for(i=0;i<this.arrayRef.length;i++){ // or use let for i
            setTimeout((i)=>{
                this.arrayRef[i].style.backgroundColor = '#3da4ab'
            }, 50*i, i) // pass i as a param 
        }

    }

    async insertionSort() {
        this.setState({generateButton: true}) // disable the generateArrayButton
        var array = this.state.array // current array to be sorted 

        var i, j;
        for(i=0;i<this.state.array.length;i++){
            var temp = array[i];
            await new Promise(resolve => setTimeout(resolve, 5));
            this.arrayRef[i].style.backgroundColor = '#ff1654';
            
            j = i-1;
            while(j>=0 && array[j]>temp){
                await new Promise(resolve => setTimeout(resolve, 5));
                this.arrayRef[j].style.backgroundColor = '#ff1654';
                array[j+1] = array[j];
                await new Promise(resolve => setTimeout(resolve, 1));
                this.arrayRef[j].style.backgroundColor = '#7678ed'//'#ffa6c1';
                j = j - 1;
            }
            this.arrayRef[i].style.backgroundColor = '#7678ed' //'#ffa6c1';

            array[j+1] = temp;
            this.setState({array})
        }
        for(i=0;i<this.state.array.length;i++){
            await new Promise(resolve => setTimeout(resolve, 0.5));
            if(this.arrayRef[i]){
                this.arrayRef[i].style.backgroundColor = '#3da4ab';
            }
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
                <Button style={{margin: '10px'}} variant="outline-primary" onClick={this.mergeSortHelper.bind(this)}>Merge Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary" onClick={this.quickSortHelper.bind(this)}>Quick Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary" onClick={this.insertionSort.bind(this)}>Insertion Sort</Button>{' '}
                <Button style={{margin: '10px'}} variant="outline-primary"onClick={this.selectionSort.bind(this)}>Selection Sort</Button>{' '}
                </div>
                <div className="array-bars" >
                {array.map((value, index) => (
                    <div>
                        <div 
                        className="bar" 
                        key={index} 
                        ref = {(value) => this.arrayRef[index] = value}
                        style={{height: `${value}px`}}></div>
                    </div>
                ))}
                </div>
                
            </Container>
        );
    }
}

export default SortingVisualizer;