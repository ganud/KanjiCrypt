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


let flickerIntervals = []; // Store intervals to clear them on mouse leave

export function hoverEffect2(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("decryptTab");

    if (!encryptTab) return;

    let flickerText = input.split(""); // Convert input to an array
    let index = 0; // Start from the first character
    let isHovering = true; // Track if the cursor is still hovering

    // Function to flicker a single character
    function flickerCharacter(i) {
        let flickerCount = 5 + i; // Increase flicker duration for later characters

        let flickerInterval = setInterval(() => {
            if (!isHovering) {
                clearInterval(flickerInterval);
                return;
            }
            if (flickerCount-- <= 0) {
                clearInterval(flickerInterval);
                flickerText[i] = endResult[i]; // Set final character
            } else {
                flickerText[i] = getRandomCharacter(); // Random flickering
            }
            encryptTab.textContent = flickerText.join("");
        }, 50);

        flickerIntervals.push(flickerInterval); // Store interval for cleanup
    }

    // Function to progressively flicker characters
    function startFlickering() {
        if (!isHovering || index >= input.length) return; // Stop if not hovering

        let timeout = setTimeout(() => {
            if (!isHovering) return; // Stop if cursor leaves
            flickerCharacter(index);
            index++;
            startFlickering(); // Move to the next character
        }, index * 100); // Progressive delay

        flickerIntervals.push(timeout); // Store timeout for cleanup
    }

    // Start flickering when hovering
    isHovering = true;
    startFlickering();

    // Cleanup function on mouse leave
    encryptTab.addEventListener("mouseleave", () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval); // Stop all flickering
        flickerIntervals = []; // Reset interval storage
    }, { once: true }); // Runs only once per hover event
}

export function hoverEffect(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("encryptTab");

    if (!encryptTab) return;

    let flickerText = input.split(""); // Convert input to an array
    let index = 0; // Start from the first character
    let isHovering = true; // Track if the cursor is still hovering

    // Function to flicker a single character
    function flickerCharacter(i) {
        let flickerCount = 5 + i; // Increase flicker duration for later characters

        let flickerInterval = setInterval(() => {
            if (!isHovering) {
                clearInterval(flickerInterval);
                return;
            }
            if (flickerCount-- <= 0) {
                clearInterval(flickerInterval);
                flickerText[i] = endResult[i]; // Set final character
            } else {
                flickerText[i] = getRandomCharacter(); // Random flickering
            }
            encryptTab.textContent = flickerText.join("");
        }, 50);

        flickerIntervals.push(flickerInterval); // Store interval for cleanup
    }

    // Function to progressively flicker characters
    function startFlickering() {
        if (!isHovering || index >= input.length) return; // Stop if not hovering

        let timeout = setTimeout(() => {
            if (!isHovering) return; // Stop if cursor leaves
            flickerCharacter(index);
            index++;
            startFlickering(); // Move to the next character
        }, index * 100); // Progressive delay

        flickerIntervals.push(timeout); // Store timeout for cleanup
    }

    // Start flickering when hovering
    isHovering = true;
    startFlickering();

    // Cleanup function on mouse leave
    encryptTab.addEventListener("mouseleave", () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval); // Stop all flickering
        flickerIntervals = []; // Reset interval storage
    }, { once: true }); // Runs only once per hover event
}





export function getRandomCharacter() {
    const keys = Object.keys(data.kanji); // Get available keys (e.g., "0", "1", "2", "3")
    if (keys.length === 0) return null; // Prevent errors if JSON is empty
    const randomKey = keys[Math.floor(Math.random() * keys.length)]; // Pick a random key
    const letterEntries = Object.entries(data.kanji[randomKey]); // Get letter-kanji pairs
    const [randomLetter, kanjiList] = letterEntries[Math.floor(Math.random() * letterEntries.length)]; // Pick a random letter
    return kanjiList[Math.floor(Math.random() * kanjiList.length)]; // Return a random kanji
}
