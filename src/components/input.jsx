import { useState } from "react";
import { encrypt, convertBase4 } from "../../convert";

export default function Input() {
  const [input, setInput] = useState("");
  const [isDecrypt, setisDecrypt] = useState(false); // Flag to set decrypt
  const [baseFour, setBaseFour] = useState("");

  const toggleDecrypt = () => {
    setisDecrypt(!isDecrypt);
  };

  return (
    <div className="flex flex-col grow px-10 py-10 gap-4">
      <div role="tablist" class="tabs tabs-bordered">
        <a
          role="tab"
          class={isDecrypt ? "tab" : "tab tab-active"}
          onClick={toggleDecrypt}
        >
          Encrypt
        </a>
        <a
          role="tab"
          class={isDecrypt ? "tab tab-active" : "tab"}
          onClick={toggleDecrypt}
        >
          Decrypt
        </a>
      </div>
      {/* container for input and output */}
      <div className="flex justify-center gap-2 grow">
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
        <textarea
          class="textarea grow resize-none "
          value={
            // baseFour is the key used if it was inputted, else use the current input as the key.
            baseFour == ""
              ? encrypt(input, convertBase4(input))
              : encrypt(input, convertBase4(baseFour))
          }
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
