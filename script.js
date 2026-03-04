const startbtn = document.getElementById("startbtn")
const question = document.getElementById("question")
const ans1 = document.getElementById("ans1")
const ans2 = document.getElementById("ans2")
const ans3 = document.getElementById("ans3")
const ans4 = document.getElementById("ans4")
const lockin = document.getElementById("lockin")
const quiz = document.getElementById("quiz")
const finish = document.getElementById("finish")
const start = document.getElementById("start")
const finishscore = document.getElementById("finishscore");

let target = null;
let pitanja = [];
let LockedIn = false;
let ansn=null;
let ans = null;
let score = 0;
let round = 1;
let GameStarted = false;

fetch("pitanja.json")
  .then(response => response.json())
  .then(data => {
    pitanja = data;
    console.log("Pitanja ucitana:", pitanja);
    
  })
  .catch(err => console.error("Failed to load locations:", err));
document.querySelectorAll("#ans button").forEach(btn => {
  btn.onclick = () => {
    if(!LockedIn){
      ans = btn.dataset.layer;
      console.log("ans selected:", ans);

      
      if (ans === "ans1") ansn=1;
      else if (ans === "ans2") ansn=2;
      else if (ans === "ans3") ansn=3;
      else if (ans === "ans4") ansn=4;
      
      lockin.disabled = false;
    };
    
  };
});
function setupRound()
{
  ans= null;
  ansn = null;
  LockedIn=false;
  lockin.disabled= true;
  lockin.innerText = "Lock In"; 
  
  const randomIndex = Math.floor(Math.random() * pitanja.length);
  target = pitanja.splice(randomIndex, 1)[0];
  console.log("New target for this round:", target);
  question.innerText = target.question;
  ans1.innerText = target.a1;
  ans2.innerText = target.a2;
  ans3.innerText = target.a3;
  ans4.innerText = target.a4;
  
}
function goNext() {
  round += 1;
  if (round > 5) {
    FinishGame(); 
  } else {
    setupRound();
  }
}
function LockIn() {
  LockedIn = true;
  if( ansn === target.ans )
  {
    score +=1;
  }
  if (round === 5) {
    finish.classList.remove("hidden");
    lockin.disabled = true; 
  } else {
    lockin.innerText = "Go Next";
  }

}
function showGameUI()
{
  quiz.classList.remove("hidden");
  start.classList.add("hidden");
}
function GameStart()
{
  GameStarted= true;
  setupRound();
  showGameUI();
  
}
function FinishGame()
{
  quiz.classList.add("hidden");

  finish.classList.remove("hidden");
  finishscore.innerText =  score + "/5";





}
lockin.onclick = () => {
  if (!LockedIn) {
    LockIn();
  } else {
    goNext();
  }
}
startbtn.onclick=()=>{
  GameStart();

}
finish.onclick=()=>{
  FinishGame();
}
