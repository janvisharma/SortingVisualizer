const bubbleSort = (array) => {
    var i, j;
    for(i = 0; i<array.length; i++){
        for(j = 0; j<array.length-i-1; j++){
            if(array[j+1]<array[j]){
                var temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }

    return array;
};

export default bubbleSort;