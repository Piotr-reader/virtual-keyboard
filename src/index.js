import data from "./data";
import components from "./components";
import "./styles/style.scss";
const { controlBtnArr, en_symb, en_num_ext, en_alphabet, en_symb_ext, ru_alphabet, en_num, ru_num, ru_symb, ru_num_ext, ru_symb_ext } = data;
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
let alphabet_alphabet = en_alphabet;
let alphabet_num = en_num;
let alphabet_symb = en_symb;
let alphabet_num_ext = en_num_ext;
let alphabet_symb_ext = en_symb_ext;
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
      btn.classList.add("dbl_btn");
      break;
    case "Alt<span>Right</span>":
      btn.classList.add("alt_right");
      btn.classList.add("dbl_btn");
      break;
    case "Alt<span>Left</span>":
      btn.classList.add("alt_left");
      btn.classList.add("dbl_btn");
      break;
    case "Shift<span>Right</span>":
      btn.classList.add("shift_right");

      break;
    case "Shift<span>Left</span>":
      btn.classList.add("shift_left");

      break;
    case "Ctrl":
      btn.classList.add("ctrl");
      btn.classList.add("dbl_btn");
      break;
    default:
      break;
  }
});

const gridContainer = document.querySelector(".grid_container");
const btnShiftLeft = document.querySelector(".shift_left");
const btnShiftRight = document.querySelector(".shift_right");
const btnCapslock = document.querySelector(".caps_lock");
const btnCtrl = document.querySelector(".ctrl");
const btnAltLeft = document.querySelector(".alt_left");
const btnAltRight = document.querySelector(".alt_right");
const textAreaText = document.querySelector(".text_write");

// create alphabet Russian
const changeLang = () => {
  if (alphabet[0] === "`" || alphabet[0] === "~") {
    alphabet_alphabet = ru_alphabet;
    alphabet_num = ru_num;
    alphabet_symb = ru_symb;
    alphabet_num_ext = ru_num_ext;
    alphabet_symb_ext = ru_symb_ext;
    alphabet_toUppercase = [];
    ru_alphabet.forEach((elem) => alphabet_toUppercase.push(elem.toUpperCase()));
  } else {
    alphabet_alphabet = en_alphabet;
    alphabet_num = en_num;
    alphabet_symb = en_symb;
    alphabet_num_ext = en_num_ext;
    alphabet_symb_ext = en_symb_ext;
    alphabet_toUppercase = [];
    alphabet = [];
    en_alphabet.forEach((elem) => alphabet_toUppercase.push(elem.toUpperCase()));
  }
  alphabet = alphabet_num.concat(alphabet_alphabet).concat(alphabet_num_ext);
  for (let i = 0; i < alphabet.length; i++) {
    [...allLi][i].innerHTML = alphabet[i];
  }
  if (btnCapslock.classList.contains("to_upper_case")) {
    alphabet = alphabet_symb.concat(alphabet_toUppercase).concat(alphabet_symb_ext);
    updateAphabet();
  } else {
    alphabet = alphabet_num.concat(alphabet_alphabet).concat(alphabet_num_ext);
    updateAphabet();
  }
};
// btn toggle class - 'to_upper_case'
const toggleClass = () => {
  [...allLi].forEach((btn) => {
    btn.addEventListener("mousedown", (e) => {
      e.target.classList.toggle("to_upper_case");
    });
    btn.addEventListener("mouseup", (e) => {
      if (!e.target.classList.contains("dbl_btn")) {
        e.target.classList.remove("to_upper_case");
      }
    });
    btn.addEventListener("mouseout", (e) => {
      if (!e.target.classList.contains("dbl_btn")) {
        e.target.classList.remove("to_upper_case");
      }
    });
  });
};
toggleClass();
//function toUpperCase
let toUpper = [];
const updateAphabet = () => {
  for (let i = 0; i < alphabet.length; i++) {
    [...allLi][i].innerHTML = alphabet[i];
  }
};
en_alphabet.forEach((elem) => toUpper.push(elem.toUpperCase()));
const hasupper = (e) => {
  if (e.target.classList.contains("to_upper_case")) {
    alphabet = alphabet_symb.concat(alphabet_toUppercase).concat(alphabet_symb_ext);
    updateAphabet();
  } else {
    alphabet = alphabet_num.concat(alphabet_alphabet).concat(alphabet_num_ext);
    updateAphabet();
  }
};
// shift
const shiftDown = (e) => {
  if (!btnCapslock.classList.contains("active")) {
    hasupper(e);
  } else {
    alphabet = alphabet_num.concat(alphabet_alphabet).concat(alphabet_num_ext);
    updateAphabet();
  }
};
const shiftUp = (e) => {
  if (!btnCapslock.classList.contains("active")) {
    hasupper(e);
  } else {
    alphabet = alphabet_symb.concat(alphabet_toUppercase).concat(alphabet_symb_ext);
    updateAphabet();
  }
};
// CapsLock
const capsLock = (e) => {
  e.target.classList.toggle("active");
  hasupper(e);
};
// alt and ctrl
const toggleActive = (e) => {
  if (e.target.innerHTML === "Alt<span>Right</span>") {
    btnAltLeft.classList.remove("active");
    btnAltLeft.classList.remove("to_upper_case");
  }
  if (e.target.innerHTML === "Alt<span>Left</span>") {
    btnAltRight.classList.remove("active");
    btnAltRight.classList.remove("to_upper_case");
  }
  e.target.classList.toggle("active");
  removeActive();
};
const removeActive = () => {
  if (btnCtrl.classList.contains("active") && (btnAltLeft.classList.contains("active") || btnAltRight.classList.contains("active"))) {
    btnCtrl.classList.remove("active");
    btnCtrl.classList.remove("to_upper_case");
    btnAltLeft.classList.remove("active");
    btnAltLeft.classList.remove("to_upper_case");
    btnAltRight.classList.remove("active");
    btnAltRight.classList.remove("to_upper_case");
    changeLang();
  }
};
const removeActiveKeyboard = () => {
  if (btnCtrl.classList.contains("active") && btnAltLeft.classList.contains("active")) {
    changeLang();
  }
};

// document.addEventListener("keydown", keyDown);
// document.addEventListener("keyup", keyUp);
btnCapslock.addEventListener("click", capsLock);
btnShiftLeft.addEventListener("mousedown", shiftDown);
btnShiftLeft.addEventListener("mouseup", shiftUp);
btnShiftRight.addEventListener("mousedown", shiftDown);
btnShiftRight.addEventListener("mouseup", shiftUp);
btnAltLeft.addEventListener("click", toggleActive);
btnAltRight.addEventListener("click", toggleActive);
btnCtrl.addEventListener("click", toggleActive);
