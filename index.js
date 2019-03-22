//вводим договоренность: все переменные взятые с DOM начинаются с $
let $start = document.querySelector('#start'); //button
let $game =  document.querySelector('#game'); //game background
let $time = document.querySelector('#time'); // time
let $timeHeader = document.querySelector('#time-header'); //заголовок - время игры
let $resultHeader = document.querySelector('#result-header'); //заголовок - ваш результат
let $gameTime = document.querySelector('#game-time'); //инпут времени

let score = 0;
let colors = ['yellow', 'red', 'tomato', 'pink', 'blue'];

changeTime(); //выставляем время в соответствии со значение импута

//клик начать игру
$start.addEventListener('click', startGame);

// события изменения значения инпута - время
$gameTime.addEventListener('input', changeTime);

function changeTime(){
    $time.innerHTML = $gameTime.value;
    show($timeHeader);
    hide($resultHeader);
}

//начало игры
function startGame(){
    score = 0;
    this.classList.add('hide'); // $start.classList.add('hide'); прячем кнопку
    $game.style.backgroundColor = '#fff';
    changeTime(); //выставляем время в соответствии со значение импута
    renderBox(); //отображаем квадрат
    showTime(); //запускае счетчик времени
    $gameTime.setAttribute('disabled', 'true'); //блокируем инпут от изменения на время игры
}

//отрисовываем квадрат
function renderBox(){
    let sq = document.createElement('div');
    let dataSq = $game.getBoundingClientRect();// получаем все размеры и координаты игрового поля
    let boxSize = randomValue(50, 100); //размер квадрата
    let topSq = dataSq.height - boxSize; //высчтиываем максимально возможное значение top
    let leftSq = dataSq.width - boxSize; //высчтиываем максимально возможное значение left
    
    let numColor = randomColor(colors.length);    
    sq.style.background = colors[numColor];   
    sq.style.height = sq.style.width = boxSize + 'px';
    sq.style.position = 'absolute';
    sq.style.top = randomValue(0, topSq) + 'px';
    sq.style.left = randomValue(0, leftSq) + 'px';
    sq.classList.add('box'); //добавляем класс, что бы по нему остлеживать клик при делегировании
    $game.appendChild(sq); // вставляем квадрат в игровое поле
}

//таймер обратоного отсчета
function showTime(){
    let timeNow = +$time.textContent;
    let timer = setInterval(function(){
        if(timeNow > 0.1){
            timeNow -= 0.1;
            $time.textContent = timeNow.toFixed(1);
        }else {
            clearInterval(timer);
            hide($timeHeader);
            show($resultHeader);
            $resultHeader.querySelector('span').innerHTML = score;
            $start.classList.remove('hide');
            $game.style.backgroundColor = '#ccc';
            $game.innerHTML = '';
            $gameTime.removeAttribute('disabled');
        }
    }, 100);
}

//клик по квадрату
$game.addEventListener('click', function(e){
    if(e.target.classList.contains('box')){
        score++;
        $game.innerHTML = '';        
        renderBox();
    }
});

//возвращает случайное целое число в диапазоне min и max
function randomValue(min, max){
    return Math.floor(Math.random()*(max-min) + min);
}

//возвращает число, которое определяем цвет
function randomColor(long){
    return Math.floor(Math.random()*(long));
}

//что-то показываем
function show(elem){
    elem.classList.remove('hide');
}
//что-то скрываем
function hide(elem){
    elem.classList.add('hide');
}