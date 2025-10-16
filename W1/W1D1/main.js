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

function sum(array) {
  return array.reduce((acc, curr) => {
    return acc + curr;
  });
}
const numbersyy = [1, 2, 3, 4, 5, 6];
console.log(sum(numbersyy));

function remouveNumber(numbArray) {
  return !(numbArray.includes(1) || numbArray.includes(3));
}
console.log(remouveNumber(numbersyy));

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
const angle = (element) =>
  element < 90
    ? "acuto"
    : element > 90 && element < 180
    ? "ottuso"
    : element === 90
    ? "retto"
    : element === 180
    ? "piatto"
    : "angolo superiore a 180";

console.log(angle(90));
console.log(angle(180));
console.log(angle(360));
console.log(angle(72));
console.log(angle(120));

function acronimo(string) {
  const words = string.split(" ");
  const firstletter = words.map((word) => word[0]);
  return firstletter.join("");
}

console.log(acronimo("o my god"));

//-------------------------------------ESERCIZI EXTRA-----------------------------------------------
//1. Partendo da una stringa (passata come parametro), ritorna il carattere più usato nella stringa stessa.
const stringexemple = "assolutissimamente";
const mostUsedChar = (string) => {
  const splittedString = string.trim().split("");
  const result = splittedString.reduce((acc, currentChar) => {
    if (acc[currentChar]) {
      acc[currentChar]++;
    } else {
      acc[currentChar] = 1;
    }
    return acc;
  }, {}); //le graffe dicono che produce un array vuoto
  console.log(result);

  /*const arryOfValues= Object.values(result)
const arryOfKeys= Object.keys(result)
console.log(arryOfKeys)
let max= Math.max(...arryOfValues)
console.log(max)
console.log(`il carattere piu utilizzato è ${arryOfKeys[max]}`)*/
};
mostUsedChar(stringexemple);

//2. Controlla che due stringhe passate come parametri siano gli anagrammi l’una dell’altra. Ignora punteggiatura e spazi e ricordate di rendere la stringa tutta in minuscolo. Se le due parole sono anagrammi, ritorna `true`, altrimenti ritorna `false`.
const firstString = "Mora, ciliegia";
const secondString = "rAmo";

const anagram = (string1, string2) => {
  const verificateIfIsAnagram = (string) =>
    string.trim().toLowerCase().split("").sort().join("");

  return verificateIfIsAnagram(string1) === verificateIfIsAnagram(string2);
};
console.log(anagram(firstString, secondString));

//3. Partendo da una lista di possibili anagrammi e da una parola (entrambi passati come parametri), ritorna un nuovo array contenente tutti gli anagrammi corretti della parola data.
const newArrayAnagram = (stringa, array) => {
  const transformString = (string) =>
    string.trim().toLowerCase().split("").sort().join("");

  const result = transformString(stringa);

  return array.filter((word) => transformString(word) === result);
};

const testString = "mora";
const testString2 = "otto";
const testArray = ["lame", "roma", "fico", "orma"];
console.log(newArrayAnagram(testString, testArray));

//4. Partendo da una stringa passata come parametro, ritorna `true` se la stringa è palindroma o `false` se non lo è.
const palindromo = (string) => {
  const stringOk = string.trim().toLowerCase();
  const stringReverse = stringOk.split("").reverse().join("");

  return stringOk === stringReverse;
};

console.log(palindromo(testString2));

//5. Partendo da un numero intero (dai parametri) ritorna un numero che contenga le stesse cifre, ma in ordine contrario. Es. 189 ⇒ 981
const testNumber = 321;
const reverseNumb = (num) => {
  return parseInt(num.toString().split("").reverse().join(""));
};
console.log(reverseNumb(testNumber));

//6. Scrivi una funzione che accetti un numero positivo X come parametro. La funzione dovrebbe stampare a console una “scala” creata con il carattere “#” e avente X scalini.
const scale = (num) => {
  for (let i = 0; i <= num; i++) {
    console.log("#".repeat(i));
  }
};
scale(10);

//7. Crea una funzione che, data una stringa come parametro, ritorni la stessa stringa, ma al contrario. Es. “Ciao” ****⇒ “oaiC”
const reverse = (string) => {
  const stringReverse = string.trim().split("").reverse().join("");
  return stringReverse;
};

console.log(reverse(testString));

//8. Crea una funzione che accetti un array e un numero Y come parametro. Dividi l’array in sotto-array aventi lunghezza Y.
const arrayTest = [1, 2, 3, 4, 5, 6, 7, 8];
const y = 2;
const arryLenght = (array, y) => {
  const result = [];
  for (let i = 0; i < array.length; i += y) {
    const newArray = array.slice(i, i + y);
    result.push(newArray);
  }
  return result;
};
console.log(arryLenght(arrayTest, y));

//9. Scrivi una funzione che accetti un numero positivo X come parametro. La funzione dovrebbe stampare a console una “piramide” create con il carattere “#” e avente X strati.
const pyramid = (num) => {
  for (let i = 1; i < num; i++) {
    const spaceToCenter = " ".repeat(num - i);
    const createPyramid = "#".repeat(i * 2 - 1);
    console.log(spaceToCenter + createPyramid);
  }
};
pyramid(10);

//10. Scrivi una funzione che accetti un intero N e ritorni una matrice a spirale NxN:
