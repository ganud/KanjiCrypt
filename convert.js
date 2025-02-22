import data from './public/kanji_sorted.json' with { type: "json" };

/*
    1 - chinese
    2 - japanese
    3 - korean
    0 - vietnamese
*/

function encrypt(input, key) { //key characters must be 0, 1, 2, 3
    let result = ""; //output

    if (key.length > input.length) { //truncate key if key is longer than input
        key = key.slice(0, input.length);
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i].toLowerCase(); //nth letter of input
        let useKey = key[i].toString(); //nth letter of key
        const nextKey = (parseInt(key[i]) === 3) ? "0" : (parseInt(key[i]) + 1).toString();

        while (data.kanji[useKey][char].length === 0) {//find where kanji exists if array empty
            useKey = (parseInt(useKey) === 3) ? "0" : (parseInt(useKey) + 1).toString(); //increment key
        }

        if (data.kanji[useKey][char].length <= (data.kanji[nextKey][char].length * .1)) { //if the next key is 10x bigger then just use that, makes cypher more robust
            result += getRandomElement(data.kanji[nextKey][char]);
        }
        else result += getRandomElement(data.kanji[useKey][char]);
        
    }
    return result;
}

function decrypt(input, key) {
    let result = ""; // Output

    if (key.length > input.length) { // Truncate key if it's longer than input
        key = key.slice(0, input.length);
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i]; // nth letter of input
        let useKey = key[i].toString(); // nth letter of key
        const prevKey = (parseInt(key[i]) === 0) ? "3" : (parseInt(key[i]) - 1).toString();

        while (data.kanji[useKey][char].length === 0) {//find where kanji exists if array empty
            useKey = (parseInt(useKey) === 3) ? "0" : (parseInt(useKey) + 1).toString(); //increment key
        }
        console.log(data.kanji[useKey][char]);
        //console.log(useKey);

        const useKeyLetter = find(char, useKey);
        const prevKeyLetter = find(char, prevKey);

        if (!useKeyLetter || !prevKeyLetter) {
            console.warn(`No kanji mapping found for "${char}" in key "${useKey}" or "${prevKey}"`);
            result += char; // Keep original character if not found
            continue;
        }

        // Reverse engineer encryption process
        if (data.kanji[useKey][useKeyLetter].length <= (data.kanji[prevKey][prevKeyLetter].length * 0.1)) {
            result += prevKeyLetter;
        } else {
            result += useKeyLetter;
        }
    }

    return result;
}


function convertBase4(str) {
    return str.split('')
        .map(char => parseInt(char.charCodeAt(0)).toString(4))
        .join('');
}

function getRandomElement(arr) {
    if (arr.length === 0) return null; //empty array
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

function find(char, key) {

    for (let letter in data.kanji[key]) { //iterate through letters a, b, c... z
        if (data.kanji[key][letter].includes(char)) {
            return letter; // Return the letter where the character is found
        }
    }
    return null; // Return null if character is not found in the given key
}

function getRandomString(length) {
    const letters = "abcdefghijklmnopqrstuvwxyz"; // Possible letters
    let result = "";
    
    for (let i = 0; i < length; i++) {
        result += letters[Math.floor(Math.random() * letters.length)];
    }
    
    return result;
}


    console.log(decrypt(encrypt("vvvvv", convertBase4("poop")), convertBase4("poop")));
