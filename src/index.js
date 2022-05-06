import data from './data';
import components from './components';
import './styles/style.scss';
const {
  controlBtnArr,
  enSymb,
  enNumExt,
  enAlphabet,
  enSymbExt,
  ruAlphabet,
  enNum,
  ruNum,
  ruSymb,
  ruNumExt,
  ruSymbExt,
  dataAttribute,
  innerP
} = data;
const {
  createWrapper, createComponents, createBtnControls, createLi, createP
} = components;

createWrapper('div', 'wrapper');
const wrapperContainer = document.querySelector('.wrapper');
createComponents('textarea', 'text_write', wrapperContainer);
const textareaContainer = document.querySelector('.text_write');
textareaContainer.name = 'text';
textareaContainer.rows = '5';
textareaContainer.placeholder = 'Type something here...';
createComponents('div', 'keyboard', wrapperContainer);
const keyboardContainer = document.querySelector('.keyboard');
createComponents('ul', 'grid_container', keyboardContainer);
const ulContainer = document.querySelector('.grid_container');
createP('p', innerP, wrapperContainer);
// create alphabet English
let alphabetChange = true;
let localstorage = localStorage.getItem('alphabetChange');

if (localstorage !== null) {
  alphabetChange = JSON.parse(localstorage);
}

let alphabetAlphabet = [];
let alphabetNum = [];
let alphabetSymb = [];
let alphabetNumExt = [];
let alphabetSymbExt = [];
let alphabetToUppercase = [];
let alphabet = [];
if (alphabetChange) {
  alphabetAlphabet = enAlphabet;
  alphabetNum = enNum;
  alphabetSymb = enSymb;
  alphabetNumExt = enNumExt;
  alphabetSymbExt = enSymbExt;
  enAlphabet.forEach((elem) => alphabetToUppercase.push(elem.toUpperCase()));
  alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
  for (let i = 0; i < alphabet.length; i += 1) {
    createLi('li', `${alphabet[i]}`, ulContainer, `${dataAttribute[i]}`);
  }
  for (let i = 0; i < controlBtnArr.length; i += 1) {
    createBtnControls('li', 'btn_control', `${controlBtnArr[i]}`, ulContainer);
  }
} else {
  alphabetAlphabet = ruAlphabet;
  alphabetNum = ruNum;
  alphabetSymb = ruSymb;
  alphabetNumExt = ruNumExt;
  alphabetSymbExt = ruSymbExt;
  ruAlphabet.forEach((elem) => alphabetToUppercase.push(elem.toUpperCase()));
  alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
  for (let i = 0; i < alphabet.length; i += 1) {
    createLi('li', `${alphabet[i]}`, ulContainer, `${dataAttribute[i]}`);
  }
  for (let i = 0; i < controlBtnArr.length; i += 1) {
    createBtnControls('li', 'btn_control', `${controlBtnArr[i]}`, ulContainer);
  }
}

let allLi = ulContainer.children;
[...allLi].forEach((btn) => {
  switch (btn.innerHTML) {
    case 'CapsLock':
      btn.classList.add('caps_lock');
      btn.classList.add('dbl_btn');
      break;
    case 'Alt<span>Right</span>':
      btn.classList.add('alt_right');
      btn.classList.add('dbl_btn');
      break;
    case 'Alt<span>Left</span>':
      btn.classList.add('alt_left');
      btn.classList.add('dbl_btn');
      break;
    case 'Shift<span>Right</span>':
      btn.classList.add('shift_right');
      break;
    case 'Shift<span>Left</span>':
      btn.classList.add('shift_left');
      break;
    case 'Ctrl':
      btn.classList.add('ctrl');
      btn.classList.add('dbl_btn');
      break;
    case '<span>Space</span>':
      btn.classList.add('space');
      break;
    case 'Del':
      btn.classList.add('delete_cl');
      break;
    default:
      break;
  }
});

const btnShiftLeft = document.querySelector('.shift_left');
const btnShiftRight = document.querySelector('.shift_right');
const btnCapslock = document.querySelector('.caps_lock');
const btnCtrl = document.querySelector('.ctrl');
const btnAltLeft = document.querySelector('.alt_left');
const btnAltRight = document.querySelector('.alt_right');
const textAreaText = document.querySelector('.text_write');
const btnSpace = document.querySelector('.space');
const btnDelete = document.querySelector('.delete_cl');

// function toUpperCase
let toUpper = [];
const updateAphabet = () => {
  for (let i = 0; i < alphabet.length; i += 1) {
    [...allLi][i].innerHTML = alphabet[i];
  }
};
enAlphabet.forEach((elem) => toUpper.push(elem.toUpperCase()));
const hasupper = (e) => {
  if (e.target.classList.contains('to_upper_case')) {
    alphabet = alphabetSymb.concat(alphabetToUppercase).concat(alphabetSymbExt);
    updateAphabet();
  } else {
    alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
    updateAphabet();
  }
};
// create alphabet Russian
const changeLang = () => {
  if (alphabet[0] === '`' || alphabet[0] === '~') {
    alphabetChange = false;
    localStorage.clear();
    localStorage.setItem('alphabetChange', JSON.stringify(alphabetChange));
    alphabetAlphabet = ruAlphabet;
    alphabetNum = ruNum;
    alphabetSymb = ruSymb;
    alphabetNumExt = ruNumExt;
    alphabetSymbExt = ruSymbExt;
    alphabetToUppercase = [];
    ruAlphabet.forEach((elem) => alphabetToUppercase.push(elem.toUpperCase()));
  } else {
    alphabetChange = true;
    localStorage.clear();
    localStorage.setItem('alphabetChange', JSON.stringify(alphabetChange));
    alphabetAlphabet = enAlphabet;
    alphabetNum = enNum;
    alphabetSymb = enSymb;
    alphabetNumExt = enNumExt;
    alphabetSymbExt = enSymbExt;
    alphabetToUppercase = [];
    alphabet = [];
    enAlphabet.forEach((elem) => alphabetToUppercase.push(elem.toUpperCase()));
  }
  alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
  for (let i = 0; i < alphabet.length; i += 1) {
    [...allLi][i].innerHTML = alphabet[i];
  }
  if (btnCapslock.classList.contains('to_upper_case')) {
    alphabet = alphabetSymb.concat(alphabetToUppercase).concat(alphabetSymbExt);
    updateAphabet();
  } else {
    alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
    updateAphabet();
  }
};
// btn toggle class - 'to_upper_case'
const toggleClass = () => {
  [...allLi].forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.target.classList.toggle('to_upper_case');
    });
    btn.addEventListener('mouseup', (e) => {
      if (!e.target.classList.contains('dbl_btn')) {
        e.target.classList.remove('to_upper_case');
      }
    });
    btn.addEventListener('mouseout', (e) => {
      if (!e.target.classList.contains('dbl_btn')) {
        e.target.classList.remove('to_upper_case');
      }
    });
  });
};
toggleClass();

// shift
const shiftDown = (e) => {
  if (!btnCapslock.classList.contains('active')) {
    hasupper(e);
  } else {
    alphabet = alphabetNum.concat(alphabetAlphabet).concat(alphabetNumExt);
    updateAphabet();
  }
};
const shiftUp = (e) => {
  if (!btnCapslock.classList.contains('active')) {
    hasupper(e);
  } else {
    alphabet = alphabetSymb.concat(alphabetToUppercase).concat(alphabetSymbExt);
    updateAphabet();
  }
};
// CapsLock
const capsLock = (e) => {
  e.target.classList.toggle('active');
  hasupper(e);
};
// alt and ctrl
const removeActive = () => {
  if (btnCtrl.classList.contains('active') && (btnAltLeft.classList.contains('active') || btnAltRight.classList.contains('active'))) {
    btnCtrl.classList.remove('active');
    btnCtrl.classList.remove('to_upper_case');
    btnAltLeft.classList.remove('active');
    btnAltLeft.classList.remove('to_upper_case');
    btnAltRight.classList.remove('active');
    btnAltRight.classList.remove('to_upper_case');
    changeLang();
  }
};
const toggleActive = (e) => {
  if (e.target.innerHTML === 'Alt<span>Right</span>') {
    btnAltLeft.classList.remove('active');
    btnAltLeft.classList.remove('to_upper_case');
  }
  if (e.target.innerHTML === 'Alt<span>Left</span>') {
    btnAltRight.classList.remove('active');
    btnAltRight.classList.remove('to_upper_case');
  }
  e.target.classList.toggle('active');
  removeActive();
};

// textareaText
const controlsBtnText = (e) => {
  switch (e.target.textContent) {
    case 'Backspace':
      if (textAreaText.selectionEnd >= 1) {
        let pointer = textAreaText.selectionEnd - 1;
        let arr = textAreaText.value.split('');
        arr.splice(textAreaText.selectionEnd - 1, 1);
        textAreaText.value = arr.join('');
        textAreaText.setSelectionRange(pointer, pointer);
      }
      break;
    case 'Del':
      if (textAreaText.selectionEnd >= 0) {
        let pointer = textAreaText.selectionEnd;
        let arr = textAreaText.value.split('');
        arr.splice(textAreaText.selectionEnd, 1);
        textAreaText.value = arr.join('');
        textAreaText.setSelectionRange(pointer, pointer);
      }
      break;
    case 'Space':
    {
      let itemSpace = ' ';
      let arrSpace = textAreaText.value.split('');
      let positionCursorSpace = textAreaText.selectionEnd;
      arrSpace.splice(textAreaText.selectionEnd, 0, itemSpace);
      textAreaText.value = arrSpace.join('');
      textAreaText.selectionEnd = positionCursorSpace + 1;
      break;
    }
    case 'Enter':
    {
      let itemEnter = '\n';
      let arrEnter = textAreaText.value.split('');
      arrEnter.splice(textAreaText.selectionEnd, 0, itemEnter);
      textAreaText.value = arrEnter.join('');
      e.preventDefault();
      break;
    }
    case 'Tab':
    {
      let item = '    ';
      let arrTab = textAreaText.value.split('');
      let positionCursor = textAreaText.selectionEnd;
      arrTab.splice(textAreaText.selectionEnd, 0, item);
      textAreaText.value = arrTab.join('');
      textAreaText.selectionEnd = positionCursor + 4;
      break;
    }
    case 'ᐊ':
      if (textAreaText.selectionEnd > 0) {
        textAreaText.selectionEnd -= 1;
      }
      break;
    case 'ᐅ':
      textAreaText.selectionStart += 1;
      break;
    case 'ᐁ':
      {
        let arr = textAreaText.value.split('');
        let positionN = [];
        let positionPrev = [];
        let positionNext = [];
        let pointer = textAreaText.selectionEnd;
        arr.forEach((letter, index) => {
          if (letter === '\n') {
            positionN.push(index);
          }
        });
        for (let i = 0; i < positionN.length; i += 1) {
          if (positionN[i] <= pointer) {
            positionPrev.push(positionN[i]);
          }
          if (positionN[i] > pointer) {
            positionNext.push(positionN[i]);
          }
        }
        positionNext.push(arr.length);
        if (positionPrev.length === 0) {
          pointer += positionNext[0];
          pointer += 1;
          textAreaText.setSelectionRange(pointer, pointer);
        }
        if (pointer < positionNext[0]) {
          if (pointer === positionPrev[0]) {
            pointer += positionPrev[0];
            pointer += 1;
            textAreaText.setSelectionRange(pointer, pointer);
          } else {
            pointer = pointer - positionPrev[positionPrev.length - 1] + positionNext[0];
            textAreaText.setSelectionRange(pointer, pointer);
          }
        }
      }
      break;
    case 'ᐃ':
      {
        let arr = textAreaText.value.split('');
        let positionN = [];
        let positionPrev = [];
        let positionNext = [];
        let pointer = textAreaText.selectionEnd;
        arr.forEach((items, index) => {
          if (items === '\n') {
            positionN.push(index);
          }
        });
        for (let i = 0; i < positionN.length; i += 1) {
          if (positionN[i] <= pointer) {
            positionPrev.push(positionN[i]);
          }
          if (positionN[i] > pointer) {
            positionNext.push(positionN[i]);
          }
        }
        positionNext.push(arr.length);
        if (positionPrev.length > 1) {
          pointer = pointer - positionPrev[positionPrev.length - 1] - 1;
          pointer = positionPrev[positionPrev.length - 2] + pointer + 1;
          textAreaText.setSelectionRange(pointer, pointer);
        } else {
          pointer = pointer - positionPrev[positionPrev.length - 1] - 1;
          textAreaText.setSelectionRange(pointer, pointer);
        }
      }
      break;
    default:
      break;
  }
};
[...allLi].forEach((btn) => {
  btn.addEventListener('click', (e) => {
    if (!e.target.classList.contains('btn_control')) {
      textAreaText.value += e.target.innerHTML;
    } else {
      controlsBtnText(e);
    }
    textAreaText.focus();
  });
});
// keyboards
const removeActiveKeyboard = () => {
  if (btnCtrl.classList.contains('active') && (btnAltLeft.classList.contains('active') || btnAltRight.classList.contains('active'))) {
    setTimeout(() => {
      changeLang();
      btnAltRight.classList.remove('to_upper_case');
      btnAltRight.classList.remove('active');
      btnAltLeft.classList.remove('to_upper_case');
      btnAltLeft.classList.remove('active');
      btnCtrl.classList.remove('to_upper_case');
      btnCtrl.classList.remove('active');
    }, 100);
  }
};
const keyDown = (e) => {
  textAreaText.focus();
  [...allLi].forEach((btn) => {
    if (!(e.code === 'CapsLock' || e.code === 'ControlLeft' || e.code === 'AltLeft' || e.code === 'AltRight')) {
      if (e.code === btn.dataset.name) {
        e.preventDefault();
        btn.classList.add('to_upper_case');
        textAreaText.value += btn.innerHTML;
      }
      if (e.key === ' ') {
        btnSpace.classList.add('to_upper_case');
      }
      if (e.key === 'Delete') {
        btnDelete.classList.add('to_upper_case');
      }
      if (e.key === 'ArrowUp') {
        if (btn.innerHTML === 'ᐃ') {
          btn.classList.add('to_upper_case');
        }
      }
      if (e.key === 'ArrowDown') {
        if (btn.innerHTML === 'ᐁ') {
          btn.classList.add('to_upper_case');
        }
      }
      if (e.key === 'ArrowLeft') {
        if (btn.innerHTML === 'ᐊ') {
          btn.classList.add('to_upper_case');
        }
      }
      if (e.key === 'ArrowRight') {
        if (btn.innerHTML === 'ᐅ') {
          btn.classList.add('to_upper_case');
        }
      }
    }
  });
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    if (e.code === 'ShiftLeft') {
      btnShiftLeft.classList.add('to_upper_case');
    } else {
      btnShiftRight.classList.add('to_upper_case');
    }
    if (btnCapslock.classList.contains('active')) {
      hasupper(e);
    } else {
      alphabet = alphabetSymb.concat(alphabetToUppercase).concat(alphabetSymbExt);
      updateAphabet();
    }
  }
  if (e.code === 'CapsLock') {
    btnCapslock.classList.toggle('to_upper_case');
    btnCapslock.classList.toggle('active');
    shiftUp(e);
  }
  if (e.code === 'ControlLeft') {
    btnCtrl.classList.toggle('to_upper_case');
    btnCtrl.classList.toggle('active');
    removeActiveKeyboard();
    e.preventDefault();
  }
  if (e.code === 'AltLeft') {
    btnAltLeft.classList.toggle('to_upper_case');
    btnAltLeft.classList.toggle('active');
    btnAltRight.classList.remove('to_upper_case');
    btnAltRight.classList.remove('active');
    removeActiveKeyboard();
    e.preventDefault();
  }
  if (e.code === 'AltRight') {
    e.preventDefault();
    btnAltRight.classList.toggle('to_upper_case');
    btnAltRight.classList.toggle('active');
    btnAltLeft.classList.remove('to_upper_case');
    btnAltLeft.classList.remove('active');
    removeActiveKeyboard();
  }
  if (e.code === 'Tab') {
    [...allLi].forEach((btn) => {
      if (btn.innerHTML === 'Tab') {
        btn.classList.add('to_upper_case');
      }
    });
    e.preventDefault();
    textAreaText.value += '    ';
  }
  if (e.code === 'Backspace') {
    [...allLi].forEach((btn) => {
      if (btn.innerHTML === 'Backspace') {
        btn.classList.add('to_upper_case');
      }
    });
  }
  if (e.code === 'Enter') {
    [...allLi].forEach((btn) => {
      if (btn.innerHTML === 'Enter') {
        btn.classList.add('to_upper_case');
      }
    });
  }
};
const keyUp = (e) => {
  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    btnShiftRight.classList.remove('to_upper_case');
    btnShiftLeft.classList.remove('to_upper_case');
    e.preventDefault();
    if (btnCapslock.classList.contains('active')) {
      shiftUp(e);
    } else {
      shiftDown(e);
    }
  }
  [...allLi].forEach((btn) => {
    if (!(e.key === 'CapsLock' || e.key === 'Control' || e.key === 'Alt')) {
      btn.classList.remove('to_upper_case');
    }
  });
};
document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
btnCapslock.addEventListener('click', capsLock);
btnShiftLeft.addEventListener('mousedown', shiftDown);
btnShiftLeft.addEventListener('mouseup', shiftUp);
btnShiftRight.addEventListener('mousedown', shiftDown);
btnShiftRight.addEventListener('mouseup', shiftUp);
btnAltLeft.addEventListener('click', toggleActive);
btnAltRight.addEventListener('click', toggleActive);
btnCtrl.addEventListener('click', toggleActive);
