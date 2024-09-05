 function arrayWork()
  {
    var array = []; //create empty array named array
    sum = 0;
    for (var i=0; i<5; i++) //do this 5 times:
    {
      var val = Math.floor( Math.random()*100 ); //generate a random number between 0 and 100
      sum += val
      array.push(val);
    }
    var mean = sum/array.length; //calculate the mean of the values in the array
    //in Chrome, this is available in Developer Tools
    console.log(mean); //print value to the console for debugging
    var greater = []; //create array named greater in which to store the "greater" values
    for (var i=0; i<=5; i++)
    {
      if (array[i]>mean) //if said value is greater than the mean, add it to the array named greater
      {
        greater.push(array[i]);
      }
    } 
    document.querySelector("#arrayOut").innerHTML="The array is:"+array+"<br>The mean is:"+mean+"<br>Greater:"+greater;
	//replaces the text in id="arrayOut" with this new sentence
  }

//summary:
//create 5 random values between 0-100
//calculate the mean and push all numbers bigger than the mean into an array named "greater"
//change the text in the arrayOut id div
