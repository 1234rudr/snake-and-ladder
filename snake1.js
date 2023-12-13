var name1  = window.prompt("enter 1st player name");
var name2 = window.prompt("enter 2nd player name")
alert('press S to roll the dice')
var player1Started = false;
// var prev1 = false;
var player2Started = false;
// var prev2 = false;
var contain = document.querySelector(".container");
var die = document.querySelector("#dice");
// var qwe = document.querySelector("body");
let turn ='red'
let stopEvent = false
// **************************************************************************888888
document.querySelector('#red').style.marginLeft = '0vmin'
document.querySelector('#red').style.marginTop = '0vmin'
document.querySelector('#blue').style.marginLeft = '0vmin'
document.querySelector('#blue').style.marginTop = '0vmin'
// *********************************************************************************
document.addEventListener('keydown',async (e)=>{
    if(e.keyCode == '83' && !stopEvent){
        stopEvent = true
        let diceNum = await roll();
      
        if (turn == "red") {
          if (!player1Started) {
            if (diceNum != 6) {
              changeTurn()
              stopEvent = false
              return
            } else {
              changeTurn()
              stopEvent = false
              player1Started = true;
              document.querySelector('#red').style.opacity = '0.9';
              return;
            }
          }
        } else {
          if (!player2Started) {
            if (diceNum != 6) {
              changeTurn()
              stopEvent = false
              return
            } else {
              changeTurn()
              stopEvent = false
              player2Started = true;
              document.querySelector('#blue').style.opacity = '0.9';
              return;
            }
          }
        }
        let isOutOfRange = checkRange(diceNum)
        await new Promise(resolve => setTimeout(resolve,400)); // first
        if(!isOutOfRange){
            await run(diceNum);
        await new Promise(resolve => setTimeout(resolve,400)); // after
        }
        let wonBy = checkWin()
        if(wonBy =='none'){
            changeTurn()
            stopEvent = false
        }
    }
})

function checkWin(){
    if(marginTop()==-88.2 && marginLeft()==0){
        if(turn == 'red'){
            document.querySelector('#p_turn').innerHTML = `${name1} wins`//make it as a dancing text
            const a = document.querySelector('.winner');
          
            a.textContent = `congratulations ${name1} you have won the game`;
            
            contain.style.opacity='0.7';
            die.style.opacity = '0.7';
            // qwe.style.opacity = '0.1';

            new Audio('win.mp3').play();
        }
        else{
            document.querySelector('#p_turn').innerHTML = `${name2} wins` //mkae 
            const a = document.querySelector('.winner');
           
            a.textContent = `congratulations ${name2} you have won the game`;
            contain.style.opacity='0.7';
            die.style.opacity = '0.7';
          
           
            
            new Audio('win.mp3').play();
        }
        
        return turn
    }
    else{
        return 'none'
    }
}


function checkRange(diceNum){
    let isOutOfRange = false
    if(marginTop() == -88.2 && (marginLeft()+Number((diceNum*-9.8).toFixed(1)))<0){
        isOutOfRange = true
    }
    return isOutOfRange
}

function changeTurn(){
    
    if(turn=='blue'){
        document.querySelector("#p_turn").innerHTML = `${name1}'s turn`
        turn = 'red'
    }
    else if(turn=='red'){
        document.querySelector("#p_turn").innerHTML = `${name2}'s turn`
        turn = 'blue'
    }
}

function run(diceNum){
    return new Promise(async(resolve,reject)=>{
        for(let i =1 ; i<=diceNum ;i++){
            let direction = getDirection();
           await move(direction);
        }
        checkLadderAndSnakes()
        resolve();
    })
}


function checkLadderAndSnakes(){
   return new Promise(async(resolve,reject)=>{
    let start =[[39.2,0],[78.4,0],[19.6,-19.6],[68.6,-39.2],[9.8,-58.8],[78.4,-58.8],[39.2,-29.4],[78.4,-39.2],[39.2,-49],[9.8,-78.4],[49,-88.2],[58.8,-78.4]]
    let end =[[49,-29.4],[88.2,-49],[9.8,-39.2],[49,-78.4],[19.6,-78.4],[88.2,-88.2],[39.2,0],[58.8,0],[68.6,0],[0,-9.8],[19.6,-29.4],[49,-58.8]]
    for(let i =0 ;i<end.length ; i++){
        if(marginLeft() == start[i][0] && marginTop() == start[i][1]){
            new Audio('bite.mp3').play()
            document.querySelector(`#${turn}`).style.marginLeft = `${end[i][0]}vmin`
            document.querySelector(`#${turn}`).style.marginTop = `${end[i][1]}vmin`
            await new Promise(resolve => setTimeout(resolve,400));
            break
        }
    }
    resolve();
   })
}



function move(direction){
    
    return new Promise(async(resolve,reject)=>{
        new Audio('walk.mp3').play()
        if(direction=='up'){
            document.querySelector(`#${turn}`).style.marginTop = String(marginTop() - 9.8) + 'vmin'
        }
        else if(direction == 'right'){
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() + 9.8) + 'vmin'
        }
        else if(direction=='left'){
            document.querySelector(`#${turn}`).style.marginLeft = String(marginLeft() - 9.8) + 'vmin'
        }
        await new Promise(resolve => setTimeout(resolve,400))
        resolve()
    })
}

function getDirection(){
    let direction;
    if((marginLeft()==88.2 && ((((marginTop()*10)%(-19.6*10))/10)==0))||(marginLeft()==0 && ((((marginTop()*10)%(-19.6*10))/10)!=0))){
        direction = 'up';
    }
    else if((((marginTop()*10)%(-19.6*10))/10)==0){
        direction = 'right';
    }
    else{
        direction = 'left';
    }
    return direction;
}

function marginLeft(){
    return Number(document.querySelector(`#${turn}`).style.marginLeft.split('v')[0])
}
function marginTop(){
    const a = Number(document.querySelector(`#${turn}`).style.marginTop.split('v')[0])
    console.log('A: ', document.querySelector(`#${turn}`).style.marginTop);
   return a;
}

 function roll(){
    return new Promise(async (resolve,reject)=>{
        let diceNum =Math.floor(Math.random() * 6) + 1
        let values = [[0-360],[-180,-360],[-180,270],[0,-90],[270,180],[90,90]]
        new Audio('dice-142528.mp3').play();
        document.querySelector(".cube_inner").style.transform = 'rotateX(360deg) rotateY(360deg)'
        await new Promise(resolve => setTimeout(resolve,750));
        document.querySelector(".cube_inner").style.transform = `rotateX(${values[diceNum-1][0]}deg) rotateY(${values[diceNum-1][1]}deg)`
        await new Promise(resolve => setTimeout(resolve,750));
        resolve( diceNum);
        // console.log(diceNum)
        })

    
}