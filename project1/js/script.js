let canvas = document.getElementById("game")
let ctx = canvas.getContext("2d")

// ctx.beginPath()
// ctx.rect(50, 50, 250, 125)
// ctx.fillStyle = "lightgreen"
// ctx.fill()
// ctx.closePath()

// ctx.beginPath()
// ctx.arc(250, 450, 50, 0, Math.PI * 2,false)
// ctx.strokeStyle = "yellow"
// ctx.stroke()
// ctx.closePath()

// ctx.beginPath()
// ctx.rect(500, 250, 200, 200)
// ctx.strokeStyle = "yellow"
// ctx.stroke()
// ctx.closePath()

let x = canvas.width/2;
let y = canvas.height - 50;

let dx = -2
let dy = -2

let ballRadius = 15

let platformHeight = 20
let platformWidth = 220

let platformX = (canvas.width-platformWidth) / 2


let blocksRow = 5
let blocksColumn = 7

let blockHeight = 35 
let blockWidth = 150

let blockMargin = 15

let blockLeft = 30
let blockTop = 30

let score = 0 

let lives = 3

let speed = 1

let interval

let colorB = "lawngreen"

let colorG = "lawngreen"

let life = new Audio()

let complete = new Audio()

let complete2 = new Audio()

let menu = new Audio()

let plus_score = new Audio()

life.src = "../audio/-life.mp3"
complete.src = "../audio/complete.mp3"
complete2.src = "../audio/complete2.mp3"
menu.src = "../audio/menu.mp3"
plus_score.src = "../audio/score.mp3"

function randomBlocks(number)
{

    if(number == 4 || number == 5) {

    
    for(let i = 0; i < blocksColumn; i++)
    {
        bricks[i] = []

        for(let j = 0; j < blocksRow; j++)
        {
            let rand = Math.floor(Math.random() * (2 - 1 + 1)) + 1; // 1 ili 2

            if(rand == 2)
            {
                bricks[i][j] = {x:0, y:0, status: 2}
            }
else {
            bricks[i][j] = {x:0, y:0, status: 1}
        }
        }

    }
}
else {
    for(let i = 0; i < blocksColumn; i++)
    {
        bricks[i] = []

        for(let j = 0; j < blocksRow; j++)
        {
          
            bricks[i][j] = {x:0, y:0, status: 1}

        }

    }
}
}
let bricks = []

   

    function drowBlock() 
    {
        for(let i = 0; i < blocksColumn; i++)
        for(let j = 0; j < blocksRow; j++)
        {
            if(bricks[i][j].status == 2)
            {
            
                        let bX = i * (blockWidth + blockMargin) + blockLeft
                        let bY = j *(blockHeight + blockMargin) + blockTop
            
                        bricks[i][j].x = bX;
                        bricks[i][j].y = bY;
            
                        ctx.beginPath()
                            ctx.rect(bX, bY, blockWidth, blockHeight)
                        ctx.fillStyle = "gold"
                        ctx.fill()
                        ctx.strokeStyle = " 3px red"
                        ctx.stroke()
                        ctx.closePath()
                    }
             else if(bricks[i][j].status == 1)
{

            let bX = i * (blockWidth + blockMargin) + blockLeft
            let bY = j *(blockHeight + blockMargin) + blockTop

            bricks[i][j].x = bX;
            bricks[i][j].y = bY;

            ctx.beginPath()
                ctx.rect(bX, bY, blockWidth, blockHeight)
            ctx.fillStyle = colorG
            ctx.fill()
            ctx.closePath()
        }
    }
    }

    function destroy()
    {
        for(let i = 0; i < blocksColumn; i++)
        for(let j = 0; j < blocksRow; j++)
        {
            let b = bricks[i][j]

            
            if(b.status == 2)
            {
                if( x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight)
                {
                    dy = -dy;
                    b.status = 1
                    plus_score.play()
                }
            }
        

             else if(b.status == 1)
            {
                if( x > b.x && x < b.x + blockWidth && y > b.y && y < b.y + blockHeight)
                {
                    dy = -dy;
                    b.status = 0
                    score++
                    plus_score.play()
                }
            }
        }
    }

    function drawScore()
    {
        ctx.font = "22px Arial"
        ctx.fillStyle = "gold"
        ctx.fillText("Score: " + score, canvas.width/2, 20)
    }


    function drawLives()
    {
        ctx.font = "22px Arial"
        ctx.fillStyle = "gold"
        ctx.fillText("Lives: " + lives, canvas.width - 140, 20)
    }


document.addEventListener("keydown",  pressDown, false)
document.addEventListener("keyup",  pressUp, false)

document.addEventListener("mousemove", mousehandler, false)

function mousehandler(e)
{
    let relX = e.clientX - canvas.offsetLeft

    if(relX > platformWidth / 2 && relX < canvas.width - platformWidth / 2)
    {
        platformX = relX - platformWidth / 2
    }

}


let right = false
let left = false

function pressDown(e)
{
    if(e.key == "Right" || e.key == "ArrowRight")
    {
            right = true
    }
    else if (e.key == "left" || e.key == "ArrowLeft")
    {
        left = true
    }
}
function pressUp(e)
{
    if(e.key == "Right" || e.key == "ArrowRight")
    {
            right = false
    }
    else if (e.key == "left" || e.key == "ArrowLeft")
    {
        left = false
    }
}


function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)



    ctx.beginPath()
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2, false)
        ctx.fillStyle = colorB
        ctx.fill()
    ctx.closePath ()

    drowBlock()
    destroy()
    drawScore()
    drawLives()

    if(score == blocksRow * blocksColumn)
    {
        win(score) 
        
    }

    if(x+dx > canvas.width -ballRadius|| x + dx < ballRadius)
    {
        dx = -dx
        life.play()
    }
    if(y + dy <ballRadius)
    {
        dy = -dy
        life.play()
    }
    else if(y + dy > canvas.height - ballRadius)
    {
        if((x > platformX && x < platformX + platformWidth) && y + dy > ( canvas.height - ballRadius - 25 ))
        {
            dy = -dy
            life.play()
        }
        else
    {

        lives --
        life.play() 
        if(!lives)
        {
           lose(score)
        }
        else {
            x = canvas.width / 2;
            y = canvas.height - 50;
            dx = 2;
            dy = 2

            let rand = Math.floor(Math.random() * (2 - 1 + 1)) + 1; 

            if(rand == 2)
            {
                dx = 2;
                dy = 2
            }
            else {
                dx = -2;
                dy = 2
            }
            platformX = (canvas.width / 2 - platformWidth / 2)
        }
       
    }
    }


    ctx.beginPath()
        ctx.rect(platformX, canvas.height - platformHeight, platformWidth, platformHeight )
        ctx.fillStyle = colorG
        ctx.fill()
    ctx.closePath()

    if(right == true)
    {
        platformX += 7
        if(platformX + platformWidth > canvas.width)
    {
        platformX = canvas.width-platformWidth
    }
    }
    else if (left == true)
    {
        platformX -= 7
        if(platformX<0) 
        {
            platformX=0
        }
    }


    x+=dx * speed
    y+=dy * speed

}

function difficult(t)
{
    
    switch (t) {
        case 1:
            platformWidth = 220
            ballRadius = 20
            break;
            case 2:
            platformWidth = 180
            ballRadius = 15
            break;
            case 3:
            platformWidth = 140
            speed = 1.5
            break;
            case 4:
             platformWidth = 100
            speed = 2
             break;
        case 5:
            platformWidth = 80
            speed = 3
    
        default:
            break;
    }
}

document.addEventListener("DOMContentLoaded" , function(){
} )

function startgame(value)
{
    let startB = document.getElementById('start')
    let game = document.getElementById('game')
    let opt = document.getElementById('opt')


    let win = document.getElementById('win')
    let lose = document.getElementById('lose')

    startB.style.display = "none"
    opt.style.display = "none"
    win.style.display = "none"
    lose.style.display = "none"
    game.style.display = "block"

    randomBlocks(value)
    interval = setInterval(draw, 10)
}

function options()
{
    let startB = document.getElementById('start')
    let win = document.getElementById('win')
    let lose = document.getElementById('lose')
    let opt = document.getElementById('opt')

    startB.style.display = "none"
    win.style.display = "none"
    lose.style.display = "none"
    opt.style.display = "block"
}
 
function optiongame()
{
    let e = document.getElementById('dif')

    let value = +e.value

    difficult(value)

    let ball = document.getElementById("ball_color")

    let game = document.getElementById('game_color')
    colorB = ball.value

    colorG = game.value
    startgame(value)

}

function win(score)
{
    let game = document.getElementById('game')

    let win = document.getElementById('win')
    
    let h2 = document.getElementById('count')

    h2.innerText = "Счёт:" + score



    win.style.display = "block"
    game.style.display = "none"

    clearInterval(interval)
}


function lose(score)
{
    let game = document.getElementById('game')

    let lose = document.getElementById('lose')
    
    let h2 = document.getElementById('countL')

    h2.innerText = "Счёт:" + score



    lose.style.display = "block"
    game.style.display = "none"

    clearInterval(interval)
}

function back_menu()
{
    clearInterval(interval)

    let lose = document.getElementById("lose")
    let win = document.getElementById("win")

    win.style.display = "none"
    lose.style.display = "none"

    let start = document.getElementById("start")

    start.style.display = "block"

    document.location.reload()

}