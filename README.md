# KanjiCrypt

## About

KanjiCrypt encrypts your text with kanjis from 4 different languages (korean, japanese, chinese, vietnamese). The cypher uses a key stored in Base-4 (with each number representing the four languages that each character has a reading in), and each letter of what's being encrypted will use that key to decide what language character it will use. Each character has different readings in up to 4 languages, so the same character can represent different letters, governed by the key. This is what makes this method of cryptography so effective: Over 15,000 characters, each character can represent several different letters, which is based on linguistics and cultural history so there is no way to systematically reverse engineer. In addition, since each letter can be represented with several hundred different characters (The letter A is represented in Japanese by over 700 characters!), even encrypting the same string with the same key will lead to quite literally infinite permutations of encrypted strings. A very, VERY large sample size of sample text will be required to make cracking remotely feasible.

## Demo

https://kanjicrypt.pages.dev/

### Encryption

![title](https://i.imgur.com/d4qmNrO.png)

### Decryption

![title](https://i.imgur.com/jdu2pj5.png)

## Installation

KanjiCrypt and be installed and run locally.

Make sure node is installed, then clone this repository.

```
npm install
npm run build
npm run preview
```

## Implementation

Created using Vite + React + Tailwind + daisyUI.

- Website by [@ganud](https://github.com/ganud)
- All of the encryption and decryption by [@GIitchedGadget](https://github.com/GIitchedGadget)
