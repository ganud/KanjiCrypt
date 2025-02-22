import { useState } from "react";

export default function Input() {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col grow px-10 py-10 gap-4">
      <div role="tablist" class="tabs tabs-bordered">
        <a role="tab" class="tab tab-active">
          Encrypt
        </a>
        <a role="tab" class="tab">
          Decrypt
        </a>
      </div>
      {/* container for input and output */}
      <div className="flex justify-center gap-2 grow">
        <textarea
          class="textarea grow resize-none"
          placeholder="Encryption input"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        ></textarea>
        <textarea
          class="textarea grow resize-none "
          value={input}
          placeholder="Encryption output"
        ></textarea>
      </div>
      {/* input for key */}
      <input
        type="text"
        placeholder="Enter key here"
        class="input input-bordered w-full max-w-xs"
      />
    </div>
  );
}
