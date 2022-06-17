const fhint = ['Name of a city', 'Name of a transportation', 'Name of a famous person', 'Name of an animal', 'Name of a country'];
const lhint = ['Capital of America', 'Can fly', 'Spiderman', 'King of the jungle', 'Southeast Asia'];
const answer = ['WASHINGTON DC', 'PLANE', 'TOM HOLLAND', 'LION', 'VIETNAM'];


let first;
let last;
let ans;
let letters;
let num;
let word;
let timeout;
let lives;
let canvas;
let ctx;


window.onload = () => {
  canvas = document.querySelector('#canvas');
  ctx = canvas.getContext('2d');
  pick();
  gap();
  let again = document.querySelectorAll('.again');
  for (const x of again) {
    x.onclick = () => {
      pick();
      gap();
    }
  }
  document.querySelector('#lhint').onclick = hint;
  letters = document.querySelectorAll('.letters div');
  for (const x of letters) x.onclick = MainActivity;
}


function pick() {
  num = Math.floor(Math.random() * 5);
  first = fhint[num];
  last = lhint[num];
  ans = answer[num];
  document.querySelector('div.fhint').innerText = first;
  document.querySelector('.lhint').innerText = '';
  document.querySelector('.word').innerText = '';
  document.querySelector('#end').className = '';
  document.querySelector('#win').className = '';
  document.querySelector('#lose').className = '';
  lives = 10;
  document.querySelector('span').innerText = lives;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
} 


function gap() {
  word = document.querySelector('.word');
  for (const x of ans) {
    let a = (x == ' ') ? ' \xa0':'_\xa0';
    word.innerText += a;
  }
}


function hint() {
  document.querySelector('.lhint').innerText = last;
} 


function MainActivity() {
  let letter = this.innerText;
  const pos = [];
  let str, str1;
  if (ans.indexOf(letter) == -1) {
    lives --;
    document.querySelector('span').innerText = lives;
    Hang();
    return;
  }
  for (const x in ans) {
    if (ans[x] == letter) pos.push(x);
  }
  str = document.querySelector('.word').innerText;
  for (const x of pos) {
    str1 = str.split('\xa0');
    str1[x] = letter;
    str = str1.join('\xa0');
  }
  document.querySelector('.word').innerText = str;
  timeout = setTimeout(checkWin, 500);
}



function checkWin() {
  if (word.innerText.indexOf('_') == -1) {
    document.querySelector('#end').className = 'end_dis';
    document.querySelector('#win').className = 'status';
  }
  clearTimeout(timeout);
}


function Hang() {
  switch (lives) {
    case 9:
      drawSelf1();
      break;
    case 8:
      drawSelf2();
      break;
    case 7:
      drawStick();
      break;
    case 6:
      drawRope();
      break;
    case 5:
      drawHead();
      break
    case 4:
      drawBody();
      break;
    case 3:
      drawLeftArm();
      break;
    case 2:
      drawRightArm();
      break
    case 1:
      drawLeftLeg();
      break;
    case 0:
      drawRightLeg();
      timeout = setTimeout(Lose, 500);
      break;
  }
}


function drawSelf1() {
  ctx.moveTo(0, canvas.height)
  ctx.lineTo(20, canvas.height - 20);
  ctx.stroke();
  ctx.moveTo(20, canvas.height - 20);
  ctx.lineTo(120, canvas.height - 20);
  ctx.stroke();
  ctx.moveTo(120, canvas.height - 20 );
  ctx.lineTo(140, canvas.height);
  ctx.stroke();
}


function drawSelf2() {
  ctx.moveTo(70, canvas.height - 20);
  ctx.lineTo(70, 20);
  ctx.stroke();
}


function drawStick() {
  ctx.moveTo(70, 20);
  ctx.lineTo(170, 20);
  ctx.stroke();
}

function drawRope() {
  ctx.moveTo(170, 20);
  ctx.lineTo(170, 50);
  ctx.stroke();
}

function drawHead() {
  ctx.beginPath();
  ctx.arc(170, 65, 15, 0, 2 * Math.PI);
  ctx.stroke();
}


function drawBody() {
  ctx.moveTo(170, 80);
  ctx.lineTo(170, 120);
  ctx.stroke();
}

function drawLeftArm() {
  ctx.moveTo(170, 100);
  ctx.lineTo(140, 90);
  ctx.stroke();
}


function drawRightArm() {
  ctx.moveTo(170, 100);
  ctx.lineTo(200, 90);
  ctx.stroke();
}

function drawLeftLeg() {
  ctx.moveTo(170, 120);
  ctx.lineTo(140, 140);
  ctx.stroke();
}

function drawRightLeg() {
  ctx.moveTo(170, 120);
  ctx.lineTo(200, 140);
  ctx.stroke();
} 

function Lose() {
  document.querySelector('#end').className  = 'end_dis';
  document.querySelector('#lose').className = 'status';
  clearTimeout(timeout);
}
