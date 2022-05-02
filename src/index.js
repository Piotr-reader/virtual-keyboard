import data from "./data";
import components from "./components";
import "./styles/style.scss";
const { controlBtnArr, en_alphabet, ru_alphabet, alphabet_alphabet, alphabet_num, alphabet_symb, alphabet_num_ext, alphabet_symb_ext } = data;
const { createWrapper, createComponents, createBtnControls, createLi } = components;

createWrapper("div", "wrapper");
const wrapperContainer = document.querySelector(".wrapper");
createComponents("textarea", "text_write", wrapperContainer);
const textareaContainer = document.querySelector(".text_write");
textareaContainer.name = "text";
textareaContainer.rows = "8";
textareaContainer.placeholder = "Type something here...";
createComponents("div", "keyboard", wrapperContainer);
const keyboardContainer = document.querySelector(".keyboard");
createComponents("ul", "grid_container", keyboardContainer);
const ulContainer = document.querySelector(".grid_container");

// create alphabet English
let alphabet_toUppercase = [];
let alphabet = [];
en_alphabet.forEach((elem) => alphabet_toUppercase.push(elem.toUpperCase()));
alphabet = alphabet_num.concat(alphabet_alphabet).concat(alphabet_num_ext);
for (let i = 0; i < alphabet.length; i++) {
  createLi("li", `${alphabet[i]}`, ulContainer);
}
for (let i = 0; i < controlBtnArr.length; i++) {
  createBtnControls("li", "btn_control", `${controlBtnArr[i]}`, ulContainer);
}
let allLi = ulContainer.children;
[...allLi].forEach((btn) => {
  switch (btn.innerHTML) {
    case "CapsLock":
      btn.classList.add("caps_lock");
      break;
    case "Shift<span>Right</span>":
      btn.classList.add("shift_right");
      break;
    case "Shift<span>Left</span>":
      btn.classList.add("shift_left");
      break;
    case "Shift<span>Right</span>":
      btn.classList.add("alt_right");
      break;
    case "Shift<span>Left</span>":
      btn.classList.add("alt_left");
      break;
    case "Ctrl":
      btn.classList.add("ctrl");
      break;
    default:
      break;
  }
});
