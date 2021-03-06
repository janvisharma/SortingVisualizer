import React from "react";
import "./SortingVisualizer.css";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
// const this.state.value = 100 // size of array
class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.myArrayBars = []; // use an array

    this.state = {
      array: [],
      value: 30,
      generateButton: false,
    };

    this.arrayRef = []; // refs using callback method
  }

  async bubbleSorthelper() {
    this.setState({ generateButton: true });
    var array = this.state.array;

    console.log(this.arrayRef);
    //const sortedArray = bubbleSort(array);
    //this.setState({sortedArray})
    var i, j;
    // var arrayBars = document.getElementsByClassName('bar');

    // let us use refs instead

    for (i = 0; i < array.length; i++) {
      for (j = 0; j < array.length - i - 1; j++) {
        if (array[j + 1] < array[j]) {
          var temp = array[j];
          array[j] = array[j + 1];
          array[j + 1] = temp;
          this.arrayRef[j].style.backgroundColor = "#2d00f7"; // '#d63447';
          this.arrayRef[j + 1].style.backgroundColor = "#2d00f7"; //'#d63447';
          await new Promise((resolve) => setTimeout(resolve, 10));
        }
        this.arrayRef[j].style.backgroundColor = "#d100d1"; //'#3da4ab';
        this.arrayRef[j + 1].style.backgroundColor = "#d100d1"; //'#3da4ab';
      }
      this.setState({ array });
      this.arrayRef[array.length - i - 1].style.backgroundColor = "#e0aaff"; //'#bbf1c8';
    }
    this.setState({ array });
    // var n = this.state.value

    for (i = 0; i < this.state.array.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 0.5));
      if (this.arrayRef[i]) {
        this.arrayRef[i].style.backgroundColor = "#3da4ab";
      } else {
        break;
      }
    }
    this.setState({ generateButton: false });
  }
  async selectionSort() {
    this.setState({ generateButton: true });
    var array = this.state.array;
    // var arrayBars = document.getElementsByClassName('bar')

    var small,
      pos = 0,
      i,
      k,
      temp;

    for (i = 0; i < this.state.array.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 5));
      this.arrayRef[i].style.backgroundColor = "#3a86ff";
      small = array[i];
      pos = i;
      for (k = i + 1; k < this.state.array.length; k++) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        this.arrayRef[k].style.backgroundColor = "#ffbe0b";
        if (array[k] < small) {
          small = array[k];
          pos = k;
        }
        await new Promise((resolve) => setTimeout(resolve, 5));
        this.arrayRef[k].style.backgroundColor = "#3a86ff";
      }

      temp = array[i];
      array[i] = small;
      array[pos] = temp;
      this.setState({ array });

      await new Promise((resolve) => setTimeout(resolve, 7));
      this.arrayRef[i].style.backgroundColor = "#ff006e";
    }
    this.setState({ array });
    for (i = 0; i < this.state.array.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 0.5));
      this.arrayRef[i].style.backgroundColor = "#3da4ab";
    }
    this.setState({ generateButton: false });
  }

  sleepSome(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async Partition(array, p, r) {
    var x = array[r];
    var i = p - 1;

    var j, temp;

    for (j = p; j < r; j++) {
      temp = 0;
      if (array[j] <= x) {
        this.arrayRef[j].style.backgroundColor = "#FDE74C";
        await this.sleepSome(100);
        this.arrayRef[j].style.backgroundColor = "#6FBF4A"; //"#5BC0EB";

        i = i + 1;
        temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
      await this.sleepSome(12);
      this.setState({ array });
    }
    temp = 0;
    temp = array[r];
    array[r] = array[i + 1];
    array[i + 1] = temp;

    await this.sleepSome(100);
    this.arrayRef[i + 1].style.backgroundColor = "#E55934";

    await this.sleepSome(100);
    this.setState({ array });

    return i + 1;
  }

  async quickSort(array, p, r) {
    if (p < r) {
      var q = await this.Partition(array, p, r);
      console.log(p, " ", r);
      await this.quickSort(array, p, q - 1);
      await this.quickSort(array, q + 1, r);
    }
  }

  async quickSortHelper() {
    this.setState({ generateButton: true });

    console.log(this.state.generateButton);

    var array = this.state.array;

    // instead of using the state value, use the state array's length

    await this.quickSort(array, 0, array.length - 1);

    this.setState({ array });
    this.setState({ generateButton: false });

    var i;
    for (i = 0; i < this.arrayRef.length; i++) {
      await this.sleepSome(10);
      if (this.arrayRef[i]) {
        this.arrayRef[i].style.backgroundColor = "#3da4ab";
      } else {
        console.log(i);
        console.log(this.arrayRef[i]);
        console.log(this.arrayRef.length);
      }
    }
  }
  async merge(array, start, mid, end) {
    var n1 = mid - start + 1;
    var n2 = end - mid;

    var left = [];
    var right = [];

    var i,
      j,
      k = 0;

    for (i = 0; i < n1; i++) {
      left[i] = array[start + i];
    }
    for (j = 0; j < n2; j++) {
      right[j] = array[mid + 1 + j];
    }

    var i = 0,
      j = 0,
      k = start;

    while (i < n1 && j < n2) {
      if (left[i] <= right[j]) {
        this.arrayRef[k].style.backgroundColor = "#fe938c";
        await this.sleepSome(70);
        this.arrayRef[k].style.backgroundColor = "#3da4ab";
        array[k] = left[i];
        i += 1;
        k += 1;
        this.setState({ array });
        await this.sleepSome(15);
      } else {
        this.arrayRef[k].style.backgroundColor = "#fe938c";
        await this.sleepSome(70);
        this.arrayRef[k].style.backgroundColor = "#3da4ab";
        array[k] = right[j];
        j += 1;
        k += 1;
        this.setState({ array });
        await this.sleepSome(15);
      }
    }

    while (i < n1) {
      this.arrayRef[k].style.backgroundColor = "#fe938c";
      await this.sleepSome(70);
      this.arrayRef[k].style.backgroundColor = "#3da4ab";

      array[k] = left[i];
      i += 1;
      k += 1;
      this.setState({ array });
      await this.sleepSome(15);
    }
    while (j < n2) {
      this.arrayRef[k].style.backgroundColor = "#fe938c";
      await this.sleepSome(70);
      this.arrayRef[k].style.backgroundColor = "#3da4ab";

      array[k] = right[j];
      j += 1;
      k += 1;
      this.setState({ array });
      await this.sleepSome(15);
    }

    this.setState({ array });
    await this.sleepSome(75);
  }

  async mergeSort(array, start, end) {
    if (start < end) {
      var mid = Math.floor(start + (end - start) / 2);
      this.arrayRef[mid].style.backgroundColor = "#e01a4f";
      await this.sleepSome(70);

      await this.mergeSort(array, start, mid);
      await this.mergeSort(array, mid + 1, end);
      await this.merge(array, start, mid, end);
    }
  }

  async mergeSortHelper() {
    var array = this.state.array;
    this.setState({ generateButton: true });
    await this.mergeSort(array, 0, array.length - 1);
    this.setState({ generateButton: false });

    this.setState({ array });
  }

  async insertionSort() {
    this.setState({ generateButton: true }); // disable the generateArrayButton
    var array = this.state.array; // current array to be sorted

    var i, j;
    for (i = 0; i < this.state.array.length; i++) {
      var temp = array[i];
      await new Promise((resolve) => setTimeout(resolve, 5));
      this.arrayRef[i].style.backgroundColor = "#ff1654";

      j = i - 1;
      while (j >= 0 && array[j] > temp) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        this.arrayRef[j].style.backgroundColor = "#ff1654";
        array[j + 1] = array[j];
        await new Promise((resolve) => setTimeout(resolve, 1));
        this.arrayRef[j].style.backgroundColor = "#7678ed"; //'#ffa6c1';
        j = j - 1;
      }
      this.arrayRef[i].style.backgroundColor = "#7678ed"; //'#ffa6c1';

      array[j + 1] = temp;
      this.setState({ array });
    }
    for (i = 0; i < this.state.array.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 0.5));
      if (this.arrayRef[i]) {
        this.arrayRef[i].style.backgroundColor = "#3da4ab";
      }
    }
    this.setState({ generateButton: false });
  }

  componentDidMount() {
    this.randomizeArray();
  }

  randomizeArray() {
    const array = [];
    for (let i = 0; i < this.state.value; i++) {
      array.push(Math.floor(Math.random() * 550 + 5));
    }
    this.setState({ array });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
    this.randomizeArray();
  }
  render() {
    const { array } = this.state;
    return (
      <Container fluid style={{ backgroundColor: "black" }}>
        <div className="header">
          <h1>Sorting Visualizer</h1>
        </div>
        <div className="range-slider">
          <Button
            style={{ margin: "10px" }}
            disabled={this.state.generateButton}
            variant="outline-primary"
            onClick={this.randomizeArray.bind(this)}
          >
            Generate New Array
          </Button>{" "}
          <RangeSlider
            // onChange={changeEvent => this.setState({ value: changeEvent.target.value})}
            value={this.state.value}
            disabled={this.state.generateButton}
            onChange={this.handleChange.bind(this)}
            variant="info"
            min="30"
            max="100"
          />
          <Button
            style={{ margin: "10px" }}
            variant="outline-primary"
            onClick={this.bubbleSorthelper.bind(this)}
          >
            Bubble Sort
          </Button>{" "}
          <Button
            style={{ margin: "10px" }}
            variant="outline-primary"
            onClick={this.mergeSortHelper.bind(this)}
          >
            Merge Sort
          </Button>{" "}
          <Button
            style={{ margin: "10px" }}
            variant="outline-primary"
            onClick={this.quickSortHelper.bind(this)}
          >
            Quick Sort
          </Button>{" "}
          <Button
            style={{ margin: "10px" }}
            variant="outline-primary"
            onClick={this.insertionSort.bind(this)}
          >
            Insertion Sort
          </Button>{" "}
          <Button
            style={{ margin: "10px" }}
            variant="outline-primary"
            onClick={this.selectionSort.bind(this)}
          >
            Selection Sort
          </Button>{" "}
        </div>
        <div className="array-bars">
          {array.map((value, index) => (
            <div>
              <div
                className="bar"
                key={index}
                ref={(value) => (this.arrayRef[index] = value)}
                style={{ height: `${value}px` }}
              ></div>
            </div>
          ))}
        </div>
      </Container>
    );
  }
}

export default SortingVisualizer;
