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
        const useKey = key[i].toString(); //nth letter of key
        const nextKey = (parseInt(key[i]) === 3) ? "0" : (parseInt(key[i]) + 1).toString();

        if (data.kanji[useKey][char].length <= (data.kanji[nextKey][char].length * .1)) { //if the next key is 10x bigger then just use that, makes cypher more robust
            result += getRandomElement(data.kanji[nextKey][char]);
        }
        else result += getRandomElement(data.kanji[useKey][char]);
        
    }
    return result;
}

function decrypt(input, key) {
    let result = ""; //output

    if (key.length > input.length) { //truncate key if key is longer than input
        key = key.slice(0, input.length);
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i]; //nth letter of input
        const useKey = key[i].toString(); //nth letter of key
        const prevKey = (parseInt(key[i]) === 0) ? "3" : (parseInt(key[i]) - 1).toString();
    
        console.log(find(char, prevKey));
        //console.log(find(char, prevKey));
        //console.log(data.kanji[useKey][find(char, prevKey)].length);

        /*
        if (data.kanji[useKey][find(char, key[i])].length >= (data.kanji[prevKey][find(char, prevKey)].length * 10)) { //reverse engineer
            result += find(char, prevKey);
        }
        else result += find(char, key);
        */
        
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

/*
for (let i = 0; i < 100; i++) {
    console.log(encrypt("hello", convertBase4("poop")));
}
    */

console.log(decrypt("晊", "1111111"));
