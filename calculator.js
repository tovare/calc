// calculator.js 
import { define,html } from 'hybrids';

function clear_all(host) {
  host.op0 = 0
  host.answer = 0
  host.state = ENUM_NONE
  host.inputBuffer = ""
}

function change_sign(host) {
  // If we are editing the buffer we need to change text,
  // else we just change the number on the screen.
  if (host.inputBuffer != ""){
    if (host.inputBuffer.startsWith("-")){
      host.inputBuffer = host.inputBuffer.substr(1)
    }else{
      host.inputBuffer = "-" + host.inputBuffer
    }
  }else{
    host.answer = -host.answer
  }
}

function operator1(host,event) {
  if (host.inputBuffer != "") {
    host.answer = parseFloat(host.inputBuffer)
    host.inputBuffer = ""
  }
  host.answer = Math.sqrt(host.answer)
  host.previous = ENUM_SQRT
}


function docalc(pending,a,b){
  var c
  switch(pending){
    case ENUM_PLUS: 
    c = a+b 
    break;
    case ENUM_MULT:
      c = a*b
      break;
    case ENUM_MINUS:
      c= a-b
      break;
    case ENUM_DIVIDE:
      c=a/b
      break;
    default:
      c=b
      break;
  }
  return c
}

function operator(host,event){
  if (host.inputBuffer != "") {
    host.op0 = parseFloat(host.inputBuffer)
    host.inputBuffer = ""
    host.answer = docalc(host.pending,host.answer,host.op0)
    host.previous = host.pending
    if(event.target.value != ENUM_EQU){
      host.op0 = 0
    }
  } else if (event.target.value == ENUM_EQU) {
    host.answer = docalc(host.previous,host.answer,host.op0)
  }
  host.pending = event.target.value

  console.log("Event ", event.target.value, "Answer: ", host.answer)
}

function keypad(host,event) {
  host.inputBuffer += event.target.value
}

function comma(host){
  if (host.inputBuffer.indexOf(".")  == -1) {
    if (host.inputBuffer == "") {
      host.inputBuffer += "0."
    }else{
      host.inputBuffer += ".";
    }
  };
}

function makeDisplay(inputBuffer,answer){
  var tmp = inputBuffer
  if (tmp == "") {
    tmp = answer
  }
  return tmp
}

const ENUM_NONE    = 0,
      ENUM_PLUS    = 1,
      ENUM_MINUS   = 2,
      ENUM_DIVIDE  = 3,
      ENUM_MULT    = 4,
      ENUM_SQRT    = 5,
      ENUM_EQU    = 6;

const Calculator = {
  op0 : 0,
  answer : 0,
  inputBuffer : "",
  pending : ENUM_NONE,
  previous : ENUM_NONE,
  prenum : 0,
  display: ({inputBuffer,answer}) => makeDisplay(inputBuffer, answer),
  render: ({ display }) => html`
<link href="//fonts.googleapis.com/css?family=Orbitron&display=swap" rel="stylesheet" type="text/css">
<style>
  .display {
      font-family: 'Orbitron', sans-serif;
      font-size: 3.5em;
      grid-column: 1 / 5;
      text-align: right;
      background: #D4E2E3;
      padding-top: 0.3em;

    }
    .number-button {
      font-family: 'Orbitron', sans-serif;
      font-size: 2em;
      background: #383737;
      color: white;
      padding-top: 0.3em;
      padding-bottom: 0.3em;
    }
    .number-wide {
      font-family: 'Orbitron', sans-serif;
      font-size: 2em;
      grid-column: 1 / 3;
      background: #383737;
      color: white;
      padding-top: 0.3em;
      padding-bottom: 0.3em;
    }
    .clear-button {
      font-family: 'Orbitron', sans-serif;
      font-size: 2em;
      background: #C16F45;
      color: white;
      padding-top: 0.3em;
      padding-bottom: 0.3em;
    }

    .operator-button {
      font-family: 'Orbitron', sans-serif;
      font-size: 2em;
      background: #5C5A5A;
      color: white;
    }

    .grid-container {
      display: grid;
      grid-template-columns: auto auto auto;
      max-width: 30em;
      min-width: 12em;
      background: E1E0E0;
    }
    </style>
    <div class="grid-container">
    <div class="display">${display}</div>
    <button class="clear-button"    onclick="${clear_all}">AC</button>
    <button class="operator-button" onclick="${change_sign}">±</button>
    <button class="operator-button" onclick=${operator1} value="${ENUM_SQRT}">√</button>
    <button class="operator-button" onclick=${operator} value="${ENUM_DIVIDE}">÷</button>
    <button class="number-button"   onclick="${keypad}" value="1">1</button>
    <button class="number-button"   onclick="${keypad}" value="2">2</button>
    <button class="number-button"   onclick="${keypad}" value="3">3</button>
    <button class="operator-button" onclick=${operator} value="${ENUM_MULT}">×</button>
    <button class="number-button"   onclick="${keypad}" value="4">4</button>
    <button class="number-button"   onclick="${keypad}" value="5">5</button>
    <button class="number-button"   onclick="${keypad}"value="6">6</button>
    <button class="operator-button" onclick=${operator} value="${ENUM_MINUS}">-</button>
    <button class="number-button"   onclick="${keypad}" value="7">7</button>
    <button class="number-button"   onclick="${keypad}" value="8">8</button>
    <button class="number-button"   onclick="${keypad}" value="9">9</button>
    <button class="operator-button" onclick="${operator}" value="${ENUM_PLUS}">+</button>
    <button class="number-wide"     onclick="${keypad}" value="0">0</button>
    <button class="number-button"   onclick="${comma}">.</button>
    <button class="operator-button" onclick=${operator}  value="${ENUM_EQU}">=</button>
    </div>
  `,
};

define('my-calculator', Calculator);
