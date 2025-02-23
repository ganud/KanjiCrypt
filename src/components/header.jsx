import { encrypt, convertBase4, getRandomCharacter } from "../../convert";
export default function Header({ toggleDark }) {
  function reset() {
    const caption = document.getElementById("caption");
    if (caption) {
      caption.textContent = "Encrypt your text with Kanji!";
    }
  }
  let flickerIntervals = []; // Store intervals to clear them on mouse leave
  function hoverEffect(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("caption");

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
    encryptTab.addEventListener(
      "mouseleave",
      () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval); // Stop all flickering
        flickerIntervals = []; // Reset interval storage
      },
      { once: true }
    ); // Runs only once per hover event
  }

  return (
    <>
      <div class="navbar bg-base-100">
        <div class="flex-1">
          <div className="flex">
            <a class="btn btn-ghost text-xl">KanjiCrypt</a>
            <div
              id="caption"
              onMouseEnter={() => {
                hoverEffect("Encrypt your text with Kanji!");
              }}
              onMouseLeave={() => {
                reset();
              }}
              className="flex self-center"
            >
              Encrypt your text with Kanji!
            </div>
          </div>
        </div>
        <div class="flex-none">
          {/* Dark mode toggle */}
          <input
            type="checkbox"
            className="toggle"
            defaultChecked
            onClick={toggleDark}
          />
        </div>
      </div>
      {/* <div className="navbar bg-base-100">
        <a className="btn btn-ghost text-xl">KanjiCrypt</a>
        <h2 className=" px-2">Encrypt your text with Kanji!</h2>
      </div> */}
    </>
  );
}
