
function one1(){

for (var i = 0; i <= 12; ++i) {
   
   if(i < 12){
    this["marker"+i] = "add here" + i;
   } else {
    this["marker"+i] = "add here" + i;
    two2();
   }
}



//The above will get what you want and retrieve it like the following:
}
var a = this.marker8;

var num = 1


function two2(){
console.log(this[`marker${12}`]);
console.log(this[`marker${num}`]) 
}

one1()