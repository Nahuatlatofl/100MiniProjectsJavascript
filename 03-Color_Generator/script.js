let button = document.getElementById('button');
let background = document.getElementById('body');
let color = document.getElementById('color');

let hex = 
['0', '1', '2', '3', '4', '5', '6','7', 
 '8', '9', 'A', 'B', 'C', 'E', 'F'];

document.addEventListener("keydown", function (e) {
    if(e.key === "Enter" || e.key === " "){
        randomColorGenerate();
    }
});

button.addEventListener("click", function(){
    randomColorGenerate();
})

let randomColorGenerate = function () {
    randomColor = '#';
    for (let i = 0; i <= 5; i++) {
        let random = Math.floor(Math.random() * (15 - 0) + 0);
        console.log(random)
        randomColor += hex[random];
    }

    color.style.color = randomColor;
    color.textContent = randomColor;

    background.style.backgroundColor = randomColor;
}