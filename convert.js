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
        const char = input[i];
        let useKey = key[i].toString();

        // Ignore non alphanumeric
        if (!"qwertyuiopasdfghjklzxcvbnm".includes(char.toLowerCase())) {
            result += char;
        }
        else {
            if (isAlphanumericUppercase(char)) {
                result += "^";
            }
            result += getRandomElement(data.kanji[useKey][char.toLowerCase()]);
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

export function decryptWithCase(input, key) {
    let inputClean = [];
    let indexes = [];
    // Get a clean string without the carrots and remember their positions.
    for (let i = 0; i < input.length; i++) {
        if (input.charAt(i) == "^") {
            indexes.push(i);
        }
        else {
            inputClean.push(input.charAt(i));
        }
    }
    // Pass the clean string
    let decryptstring = decrypt(inputClean, key);
    // Reimplement the uppercase
    let decryptUpper = decryptstring;
    for (let j = 0; j < indexes.length; j++) {
        decryptUpper = uppercaseAtIndex(decryptUpper, indexes[j] - j)
    }
    
    return decryptUpper
}

function uppercaseAtIndex(str, index) {
    if (index >= str.length || index < 0) {
      return str;
    }
    return str.substring(0, index) + str.charAt(index).toUpperCase() + str.substring(index + 1);
  }
  
// converts a string ^b^o^bby into BOBby using ^ to denote
export function parseCarrotUppercase(input) {
    return input.replace(/\^([a-z])/g, (match, p1) => p1.toUpperCase());
}

export function convertBase4(str) {
    return str.split('')
        .map(char => parseInt(char.charCodeAt(0)).toString(4))
        .join('');
}

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function isAlphanumericUppercase(str) {
    if (!/^[a-zA-Z0-9]+$/.test(str)) {
      return false; // Not alphanumeric
    }
    if (str !== str.toUpperCase()) {
      return false; // Not uppercase
    }
    return true;
}


function find(char, key) {
    for (let letter in data.kanji[key]) { //iterate through letters a, b, c... z
        if (data.kanji[key][letter].includes(char)) {
            return letter; //return the letter where character found
        }
    }
    return char; //return null if character not found
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

