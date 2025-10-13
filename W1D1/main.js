/*1
function sum(a,b){
    return a===50|| b===50 || a+b===50;
}
console.log(sum(90,32))*/


/*2
function prova(stringa, a,b){
 return stringa.slice(a,b)
}
const parola="ciao"
console.log(prova(parola,1, 3))*/

/*3
function numbers(a, b){
    return (a>=40 && b>=60 || a>= 70 && b>=100)
}

console.log(numbers(30,40))
console.log(numbers(40,90))
console.log(numbers(100,90))*/

/*4
function cityName(name){
    return(name.includes("Los") || name.includes( "New"))
        
}
console.log(cityName("NewYork"))
console.log(cityName("Milano"))
console.log(cityName("LosaAngeles"))*/

function sum(array){
   return array.reduce((acc, curr)=>{
return acc + curr
    })
}
const numbersyy=[1,2,3,4,5,6]
console.log(sum(numbersyy))


function remouveNumber(numbArray){
    return !(numbArray.includes(1)|| numbArray.includes(3))
}
console.log(remouveNumber(numbersyy))


/*function angle(element){
    if(element< 90){
       return("acuto")
    }else if(element>90 && element<180){
       return("ottuso")
    }else if (element===90){
       return("retto")
    }else if(element=== 180){
       return('piatto')
    }else{
       return('ciao')
    }
}*/
const angle =(element)=>
    element<90? "acuto":
element>90&&element<180?"ottuso":
element===90?"retto":
element===180? "piatto":
"angolo superiore a 180"

console.log(angle(90))
console.log(angle(180))
console.log(angle(360))
console.log(angle(72))
console.log(angle(120))



function acronimo(string){
    const words= string.split(" ")
    const firstletter=words.map(word=> word[0])
    return firstletter.join("")
}

console.log(acronimo("o my god"))



