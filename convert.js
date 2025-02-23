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
        const nextKey = (parseInt(key[i]) === 3) ? "0" : (parseInt(key[i]) + 1).toString();
        let jumped = 0;
        let jumped2 = false;

        if (!"qwertyuiopasdfghjklzxcvbnm".includes(char.toLowerCase())) {
            result += char;
        }
        else {

            while (data.kanji[useKey][char].length === 0) {//find where kanji exists if array empty
                useKey = (parseInt(useKey) === 3) ? "0" : (parseInt(useKey) + 1).toString(); //increment key
                jumped++;
            }

            if (data.kanji[useKey][char].length <= (data.kanji[nextKey][char].length * .2)) { //if the next key is 5x bigger then just use that, makes cypher more robust
                result += getRandomElement(data.kanji[nextKey][char]);
                jumped2 = true;
            }
            else result += getRandomElement(data.kanji[useKey][char]);
        }
        for (let i = 0; i < jumped; i++) {
            result += "​"
        }
        if (jumped2) {
            result += "‌"
        }
    }

    return result;
}

export function decrypt(input, key) {
    let result = "";
    let skips = 0;

    while (key.length < input.length) {
        key += key;
    }

    for (let i = 0; i < input.length; i++) {

        if (i >= input.length) break;
        while (input[i] === "​" || input[i] === "‌") {
            i++;  //skip all . and ,
            skips++;
        }
        if (i >= input.length) break;
        
        const char = input[i];
        let useKey = key[i - skips].toString();
        let checkNext = 0;
        let check2 = false;

        while (input[i + checkNext + 1] == "​") { //how many invis spaces there are
            checkNext++;
        }
        if (input[i + checkNext + 1] == "‌") {
            check2 = true;
        }

        for (let i = 0; i < checkNext; i++) {

            useKey = (parseInt(useKey, 10) === 3) ? "0" : (parseInt(useKey, 10) + 1).toString();
        }
        if (check2) useKey = (parseInt(useKey, 10) === 3) ? "0" : (parseInt(useKey, 10) + 1).toString();

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
            return letter; //return the letter where character found
        }
    }
    if (char == "​" || char == "‌") {
        return char;
    }
    else return char; //return null if character not found
}


let flickerIntervals = [];

export function hoverEffect2(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("decryptTab");

    if (!encryptTab) return;

    let flickerText = input.split(""); //convert input to an array
    let index = 0;
    let isHovering = true; //track if cursor still hovering

    function flickerCharacter(i) { //flicker a single char
        let flickerCount = 5 + i; //increase duration for later chars

        let flickerInterval = setInterval(() => {
            if (!isHovering) {
                clearInterval(flickerInterval);
                return;
            }
            if (flickerCount-- <= 0) {
                clearInterval(flickerInterval);
                flickerText[i] = endResult[i]; //set result encrypted character
            } else {
                flickerText[i] = getRandomCharacter(); //random flicker
            }
            encryptTab.textContent = flickerText.join("");
        }, 50);

        flickerIntervals.push(flickerInterval);
    }

    // Function to progressively flicker characters
    function startFlickering() {
        if (!isHovering || index >= input.length) return; //stop if not hovering

        let timeout = setTimeout(() => {
            if (!isHovering) return; //stop if cursor leaves
            flickerCharacter(index);
            index++;
            startFlickering();
        }, index * 100);

        flickerIntervals.push(timeout);
    }

    //start flickering when hovering
    isHovering = true;
    startFlickering();

    //cleanup function on mouseleave
    encryptTab.addEventListener("mouseleave", () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval);
        flickerIntervals = [];
    }, { once: true }); //runs only once per hover event
}

export function hoverEffect(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("encryptTab");

    if (!encryptTab) return;

    let flickerText = input.split("");
    let index = 0;
    let isHovering = true;

    function flickerCharacter(i) {
        let flickerCount = 5 + i;

        let flickerInterval = setInterval(() => {
            if (!isHovering) {
                clearInterval(flickerInterval);
                return;
            }
            if (flickerCount-- <= 0) {
                clearInterval(flickerInterval);
                flickerText[i] = endResult[i];
            } else {
                flickerText[i] = getRandomCharacter();
            }
            encryptTab.textContent = flickerText.join("");
        }, 50);

        flickerIntervals.push(flickerInterval);
    }

    function startFlickering() {
        if (!isHovering || index >= input.length) return;

        let timeout = setTimeout(() => {
            if (!isHovering) return;
            flickerCharacter(index);
            index++;
            startFlickering();
        }, index * 100);

        flickerIntervals.push(timeout);
    }

    isHovering = true;
    startFlickering();

    encryptTab.addEventListener("mouseleave", () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval);
        flickerIntervals = [];
    }, { once: true });
}

export function getRandomCharacter() {
    const keys = Object.keys(data.kanji);
    if (keys.length === 0) return null;
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; //pick random key
    const letterEntries = Object.entries(data.kanji[randomKey]); //get letter-kanji pairs
    const [randomLetter, kanjiList] = letterEntries[Math.floor(Math.random() * letterEntries.length)]; //pick random letter
    return kanjiList[Math.floor(Math.random() * kanjiList.length)]; // return random kanji
}

console.log(decrypt(encrypt("hello", convertBase4("hello")), convertBase4("hello")));
