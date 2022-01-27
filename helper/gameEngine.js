///path="../TSDef/p5.global-mode.d.ts";

// subreddit temps
// e.g.
// subreddits = [
//     "actual",
//     "next",
// ]
//
// listOfSubredditNames = [
//     "aksReddit",
//     "AMA",
//     "askWomen",
//     "askScience",
// ]



let alphaUps = 100;
let alphaWrong = 0;
let buttonAnswer1;
let buttonAnswer2;

let actualSubredditMax;
let actualSubredditMin;

let midX;
let midY;

let actualPostleft = {};
let actualPostright = {};

let randomSubreddit = 0;
let randomPost;
let startReddit;
let startPost;

let index = 0;
let score = 0;
let richtigoderfalsch = "Viel Glück beim Raten";

// load next subreddit into temp
function loadNextRound() {
    // load random subreddit out of subreddits[] into tempSubreddit
    // load next subreddit into subreddits[] (loadSubreddit in background)
    actualSubreddit = nextSubreddit;
    nextSubreddit = subreddits[subreddits.length - 1];

    let tempData = [];
    actualSubreddit.posts.forEach(sub => {

        tempData.push(sub.ups);

    });

    actualSubredditMax = max(tempData);
    actualSubredditMin = min(tempData);

    loadSubreddit(random(listOfSubredditNames));

    console.log("Achtual Subreddit: " + actualSubreddit.name);

    actualPostleft = random(actualSubreddit.posts);
    actualPostright = random(actualSubreddit.posts);

    subreddits.shift();

}

// to show the post (index for left or right)
function showPosts() {

    stroke(100);
    line(midX, 0, midX, height);
    noStroke();

    let rectWidth = 400;
    let rectHeight = 500;
    let rectLeftX = midX - rectWidth - 100;
    let rectRightX = midX + 100;
    let rectY = midY - 200;

    // left post
    fill(200, 100, 100, 50);
    rectMode(CORNER);
    rect(rectLeftX, rectY, rectWidth, rectHeight);
    textAlign(RIGHT, TOP);
    fill(100, 100, 100, 100);
    text(actualPostleft.title,rectLeftX + 50, rectY +100 , 300, 600);

    // right post
    fill(20, 100, 100, 50);
    rectMode(CORNER);
    rect(rectRightX, rectY, rectWidth, rectHeight);
    textAlign(LEFT, TOP);
    fill(100, 100, 100, 100);
    text(actualPostright.title, rectRightX + 50, rectY +100, 300, 600);
}

// handler onClick (index for left or right)
function selectPost(index) {
    // change gameState
}

// show gameResults
function showResults() {
    let recxmid = midX - width / 2.5;
    let recymid = midY - 200;
    let recxmid2 = midX + width / 5;

    if(actualPostleft.ups < actualPostright.ups){
        fill(120, 100, 50);
        rect(recxmid, recymid, 300, 200);

        fill(0, 100, 50);
        text(actualPostleft.ups, recxmid, recymid, 300, 200);

        fill(0, 100, 50);
        rect(recxmid2, recymid, 300, 200);

        fill(150, 100, 50);
        text(actualPostright.ups, recxmid2, recymid, 300, 200);

    }else if(actualPostleft.ups > actualPostright.ups){
        fill(0, 100, 50);
        rect(recxmid, recymid, 300, 200);

        fill(150, 100, 50);
        text(actualPostleft.ups, recxmid, recymid, 300, 200);

        fill(120, 100, 50);
        rect(recxmid2, recymid, 300, 200);

        fill(0, 100, 50);
        text(actualPostright.ups, recxmid2, recymid, 300, 200);

    }else{
        fill(120, 100, 50);
        rect(recxmid, recymid, 300, 200);

        fill(0, 100, 50);
        text(actualPostleft.ups, recxmid, recymid, 300, 200);

        fill(120, 100, 50);
        rect(recxmid2, recymid, 300, 200);

        fill(0, 100, 50);
        text(actualPostright.ups, recxmid2, recymid, 300, 200);
    }
    fill(120, 100, 50);
    text("Score: " + score, midX - 100, midY - 50, 200, 100);

    fill(0, 100, 30);
    rect(midX - 200, midY + 200, 400, 75);
    textAlign(CENTER);
    fill(0);
    text("next subreddit ==>", midX - 200, midY + 200, 400, 75);

    for(let i = 5; i >= 0; i--){
        let cDotFrom = 160;
        let cDotTo = 240;
        let y = midY + 100;
        // Dot size depending on upvote
        let diameter = map(actualSubreddit.posts[i].ups, actualSubredditMin, actualSubredditMax, 2, 150);

        // Calculate xPosition
        const x = width / 5 * (i + 1) - 170;
        console.log("x" + x);

        let cDot = lerp(cDotFrom, cDotTo, 1/25 * i);
        console.log("cDot " + cDot);
        fill(dist(mouseX, mouseY, x, y) < diameter / 2 + 10 ? cDot - 120 : cDot, 80, 100, 100);
        ellipse(x, y, dist(mouseX, mouseY, x, y) < diameter / 2 + 10 ? diameter + 0.22 * (width / 5 * (i + 1)) : diameter);

        // onHover: highlight dot & show respective title
        if(dist(mouseX, mouseY, x, y) < diameter / 2 + 10) {
            textAlign(CENTER, BOTTOM)
            fill(cDot - 120, 50, 100, 100);
            textSize(11);
            textStyle(BOLD);
            text(actualSubreddit.posts[i].ups, x, y - diameter / 2 - 20);
            textSize(16);
            textStyle(BOLD)
            text(actualSubreddit.posts[i].title, 0.2 * width, 0.75 * height, width * 0.6, height * 0.2);

            // onClick: Speak out post title
            if(!isSpeaking && mouseIsPressed) {
                let keyword = actualSubreddit.posts[i].title;
                // speakKeyword(keyword);
            }
        }
    }
}

function manageGameState(timer){

    if(timer < 1){
        showPosts();

    }else if(timer === 1){
        showResults();

    }
}

function showScore(){

}

function setupGame(){

    nextSubreddit = subreddits[0];
    loadNextRound();

    // buttonAnswer1 = createButton('Answer1');
    // buttonAnswer2 = createButton('Answer2');
    //
    // buttonAnswer1.position(midX - 250, midY);
    // buttonAnswer2.position(midX - 250, midY + 50);
    //
    // buttonAnswer3 = createButton('test');
    // buttonAnswer3.position(midX - 250, midY + 100);
    //
    // randomSubreddit = int(random(0, subreddits.length));
    // randomPost = int(random(0, subreddits[randomSubreddit].posts.length));
    //
    // startReddit = int(randomSubreddit / 2);
    // startPost = int(randomPost / 2);
}

function drawGame(){

//     fill(100, 100, 100, 100);
//     text("Which Post has more likes?", midX, midY - 100);
// //score
//     fill(100, 100, 100, 100);
//     text("Score: " + score, midX + 250, midY - 100);
//
// //Richtig oder Falsch
//     fill(100, 100, 100, 100);
//     text(richtigoderfalsch, midX, midY + 300);
//
//     fill(50, 50, 50, 100);
//     text(subreddits[startReddit].posts[startPost].title, midX, midY);
//     //text(subreddits[startReddit].title, midX + 10, midY);
//
//     fill(50, 50, 50, alphaUps);
//     text(subreddits[startReddit].posts[startPost].ups, midX, midY + 10);
//     text(subreddits[startReddit].name, midX, midY - 20);
//
//     fill(50, 50, 50, 100)
//     text(subreddits[randomSubreddit].posts[randomPost].title, midX, midY + 50);
//     //text(subreddits[randomSubreddit].title, midX +10, midY + 50);
//
//     fill(50, 50, 50, 0);
//     text(subreddits[randomSubreddit].posts[randomPost].ups, midX, midY + 60);
//     fill(50, 50, 50, 100);
//     text(subreddits[randomSubreddit].name, midX, midY + 70);
//
//     buttonAnswer1.mousePressed(onclickhigher)
//     buttonAnswer2.mousePressed(onclicklower)
//     //buttonAnswer3.mousePressed(testebutton)

}

function onclickhigher() {
    if(subreddits[startReddit].posts[startPost].ups >= subreddits[randomSubreddit].posts[randomPost].ups){
        //"This is Right"
        richtigoderfalsch = "Das war Richtig der post hat " + (subreddits[startReddit].posts[startPost].ups - subreddits[randomSubreddit].posts[randomPost].ups) + " upvotes mehr "
        score++
        startReddit = randomSubreddit;
        startPost = randomPost;
        randomSubreddit = int(random(0, subreddits.length));
        randomPost = int(random(0, subreddits[randomSubreddit].posts.length));

    }else{
        richtigoderfalsch = "Das war Falsch der post hat " + (subreddits[randomSubreddit].posts[randomPost].ups - subreddits[startReddit].posts[startPost].ups) + " upvotes weniger "
        //"This is wrong"
        score = 0
        startReddit = randomSubreddit;
        startPost = randomPost;
        randomSubreddit = int(random(0, subreddits.length));
        randomPost = int(random(0, subreddits[randomSubreddit].posts.length));
    }

}

function onclicklower() {
    if(subreddits[randomSubreddit].posts[randomPost].ups >= subreddits[startReddit].posts[startPost].ups){
        richtigoderfalsch = "Das war Richtig der post hat " + (subreddits[randomSubreddit].posts[randomPost].ups - subreddits[startReddit].posts[startPost].ups) + " upvotes mehr "
        //"This is Right"
        score++
        startReddit = randomSubreddit;
        startPost = randomPost;
        randomSubreddit = int(random(0, subreddits.length));
        randomPost = int(random(0, subreddits[randomSubreddit].posts.length));

    }else{
        //"This is wrong"
        richtigoderfalsch = "Das war Falsch der post hat " + (subreddits[startReddit].posts[startPost].ups - subreddits[randomSubreddit].posts[randomPost].ups) + " upvotes weniger "
        score = 0
        startReddit = randomSubreddit;
        startPost = randomPost;
        randomSubreddit = int(random(0, subreddits.length));
        randomPost = int(random(0, subreddits[randomSubreddit].posts.length));
    }

}

/*
function testebutton(){
    console.log(subredditsImg)
    console.log(subreddits)
    console.log(subreddits.length)

}*/
