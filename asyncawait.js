console.log("ticekt 1 go ");
console.log("ticekt 2 go ");

var hasTicekt = false ;
let bringTicket = new Promise((resolve,reject)=>{
  if(hasTicekt){
    setTimeout(()=>{
      resolve('got the ticket')

    } , 3000) ; 
  }
})
