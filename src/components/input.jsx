import { useState } from "react";
import {
  decryptWithCase,
  encrypt,
  convertBase4,
  hoverEffect,
  hoverEffect2,
  parseCarrotUppercase,
} from "../../convert";

function resetEncrypt() {
  const encryptTab = document.getElementById("encryptTab");
  if (encryptTab) {
    encryptTab.textContent = "Encrypt";
  }
}

function resetDecrypt() {
  const decryptTab = document.getElementById("decryptTab");
  if (decryptTab) {
    decryptTab.textContent = "Decrypt";
  }
}

export default function Input() {
  const [input, setInput] = useState("");
  const [isDecrypt, setisDecrypt] = useState(false);
  const [baseFour, setBaseFour] = useState(""); //optional key entered by user

  let output = "";
  if (isDecrypt) {
    output =
      baseFour == ""
        ? decryptWithCase(input, convertBase4(input))
        : decryptWithCase(input, convertBase4(baseFour));
  } else {
    // baseFour is the key used to seed the output if it was inputted, else use current input as key
    output =
      baseFour == ""
        ? encrypt(input, convertBase4(input))
        : encrypt(input, convertBase4(baseFour));
  }

  const toggleDecrypt = () => {
    setisDecrypt(!isDecrypt);
    setInput("");
  };

  return (
    <div className="flex flex-col grow px-10 py-10 gap-4">
      {/* encrypt decrypt navigation tabs */}
      <div className="flex justify-between">
        <div role="tablist" class="tabs tabs-lifted">
          <a
            id="encryptTab"
            role="tab"
            class={isDecrypt ? "tab" : "tab tab-active"}
            onClick={toggleDecrypt}
            onMouseEnter={() => {
              hoverEffect("Encrypt");
            }}
            onMouseLeave={() => {
              resetEncrypt();
            }}
          >
            Encrypt
          </a>
          <a
            id="decryptTab"
            role="tab"
            class={isDecrypt ? "tab tab-active" : "tab"}
            onClick={toggleDecrypt}
            onMouseEnter={() => {
              hoverEffect2("Decrypt");
            }}
            onMouseLeave={() => {
              resetDecrypt();
            }}
          >
            Decrypt
          </a>
        </div>
        <button
          className="btn max-w-xs btn-ghost  btn-outline"
          onClick={() => {
            navigator.clipboard.writeText(output);
          }}
        >
          Copy Output
        </button>
      </div>
      {/* container for input and output */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 grow">
        <textarea
          class="textarea grow resize-none"
          placeholder={
            isDecrypt ? "Enter text to decrypt" : "Enter text to encrypt"
          }
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
        {/* output textarea */}
        <textarea
          class="textarea grow resize-none"
          value={output}
          placeholder={isDecrypt ? "Decrypted output" : "Encrypted output"}
        ></textarea>
      </div>
      {/* input for key */}
      <input
        type="text"
        placeholder="Enter key here"
        class="input input-bordered w-full max-w-xs"
        value={baseFour}
        onChange={(e) => {
          setBaseFour(e.target.value);
        }}
      />
    </div>
  );
}
