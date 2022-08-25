

function primeGenerator(lowerNumber,higherNumber) {
// looping from lowerNumber to higherNumber
for (let i = lowerNumber; i <= higherNumber; i++) {
    let flag = 0;
    var myArray = Array();

    // looping through 2 to user input number
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
            flag = 1;
            break;
        }
    }

    // if number greater than 1 and not divisible by other numbers
    if (i > 1 && flag == 0) {
        myArray.push(i);
        // console.log(i);
    }
}
console.info(myArray);
return myArray;
};
module.exports.primeGenerator=primeGenerator;