function generate(docs, schema) {
  var count = 0;
  var finalarray = [];
  while (count < docs) {
    for (keys in schema) {
      // console.log(keys);
      var result = randomise(schema[keys]);
    }
    count++;
  }
}


function randomise(type) {
  var flagok = false;
  var limit = 5;

  var randtext = "";
  while (!flagok) {

    if (typeof type == "string") {
      for (var char = 0; char <= limit; char++) {
        let randval = Math.floor((Math.random() * 25) + 1);
        // if((randval >=65 && randval <=90) || (randval >=97 && randval <=122) )
        if (randval <= 25) {
          randtext += String.fromCharCode(97 + randval);
        }
      }
      console.log(randtext);
      flagok = true;

    }else if(typeof type == "number"){
      let randval = Math.floor((Math.random() * 60) + 1);
      if(randval>20){
        console.log(randval);
        flagok = true ;
      }
    } else {
      console.log("there is certainly some problem");
      flagok = true;
    }
  }

}

generate(2, {
  name: "string",
  age: 0,
  place: "string"
})
