import { encrypt, convertBase4, getRandomCharacter } from "../../convert";
export default function Header({ toggleDark }) {
  function reset() {
    const caption = document.getElementById("caption");
    if (caption) {
      caption.textContent = "Encrypt your text with Kanji!";
    }
  }
  let flickerIntervals = [];
  function hoverEffect(input) {
    const endResult = encrypt(input, convertBase4(input));
    const encryptTab = document.getElementById("caption");

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

    encryptTab.addEventListener(
      "mouseleave",
      () => {
        isHovering = false;
        flickerIntervals.forEach(clearInterval);
        flickerIntervals = [];
      },
      { once: true }
    );
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
          {/* dark mode toggle */}
          <input
            type="checkbox"
            className="toggle"
            defaultChecked
            onClick={toggleDark}
          />
        </div>
      </div>
    </>
  );
}
