import data from './public/kanji_sorted.json' with { type: "json" };
/*
    1 - chinese
    2 - japanese
    3 - korean
    0 - vietnamese
*/

export function encrypt(input, key) {
    let result = "";

    while (key.length < input.length) {
        key += key;
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i].toLowerCase();
        let useKey = key[i].toString();

        if (!"qwertyuiopasdfghjklzxcvbnm".includes(char.toLowerCase())) {
            result += char;
        }
        else {
            result += getRandomElement(data.kanji[useKey][char]);
        }
    }

    return result;
}

export function decrypt(input, key) {
    let result = "";

    while (key.length < input.length) {
        key += key;
    }

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        let useKey = key[i].toString();

        result += find(char, useKey);

    }

    return result;
}


export function convertBase4(str) {
    return str.split('')
        .map(char => parseInt(char.charCodeAt(0)).toString(4))
        .join('');
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}


function find(char, key) {
    for (let letter in data.kanji[key]) { //iterate through letters a, b, c... z
        if (data.kanji[key][letter].includes(char)) {
            return letter; // Return the letter where the character is found
        }
    }
    return char; // Return null if character is not found in the given key
}

    const a = encrypt("hello there", convertBase4("poop"));
    console.log("hello there");
    console.log(a);
    console.log(convertBase4("poop"));
    console.log(decrypt(a, convertBase4("poop")));

