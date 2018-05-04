/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, activePlayer, dice;

scores = [0, 0];
activePlayer = 0;

dice = Math.floor(Math.random() * 6 + 1);

document.querySelector('#current-' + activePlayer).textContent = 0;

var x = document.querySelector('#score-0').textContent;
var multi = 1;
var roll = 1;

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function () {
    dice = Math.floor(Math.random() * 6 + 1);

    if (dice !== 1) {
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').setAttribute('src', 'dice-' + dice + '.png');
        document.querySelector('#current-' + activePlayer).textContent = Number.parseInt(document.querySelector('#current-' + activePlayer).textContent) + dice + 'x' + multi.toFixed(1);
        roll++;
        console.log(roll);
        console.log(multi);
        if (roll <= 3) {
            multi += 0.1;
        } else if (roll <= 5 ) {
            multi += 0.5;
        } else if (5 < roll) {
            multi += 1;
        }
    } else {
        document.querySelector('.dice').style.display = 'block';
        document.querySelector('.dice').setAttribute('src', 'dice-' + dice + '.png');
        document.querySelector('#current-' + activePlayer).textContent = 0;
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        roll = 1;
        multi = 1;
        if (activePlayer === 0) {
            activePlayer = 1;
        } else {
            activePlayer = 0;
        }
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
    }
});
document.querySelector('.btn-hold').addEventListener('click', function () {
    scores[activePlayer] += Math.round(Number.parseInt(document.querySelector('#current-' + activePlayer).textContent) * multi);
    roll = 1;
    multi = 1;
     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= 500) {
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        setTimeout(function() {
            alert('Игрок ' + (activePlayer + 1) + ' выигрывает со счетом ' + scores[activePlayer]);
            }, 100);
        document.querySelector('.btn-roll').classList.add('disabled');
        document.querySelector('.btn-hold').classList.add('disabled');
    }
     document.querySelector('#current-' + activePlayer).textContent = 0;
});
document.querySelector('.btn-new').addEventListener('click', function () {
    document.querySelector('.btn-roll').classList.remove('disabled');
    document.querySelector('.btn-hold').classList.remove('disabled');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('#score-0').textContent = 0;
    document.querySelector('#score-1').textContent = 0;
    document.querySelector('#current-0').textContent = 0;
    document.querySelector('#current-1').textContent = 0;
    document.querySelector('.dice').style.display = 'none';
    roll = 1;
    multi = 1;
    scores = [0, 0];
    activePlayer = 0;
});
document.querySelector('.btn-rules').addEventListener('click', function () {
   alert('Правила\nЕсть два игрока, игра идет по раундам\n' +
       'В свой ход игрок кидает кубик сколько угодно раз, его результат суммируется в окне СТАК.\n' +
       'Чем больше игрок кидает раз, тем больше увеличивается множитель его стака.\n' +
       'Но как только игрок выкидывает 1, его стак сгорает и ход переходит к другому игроку.\n' +
       'В любой момент игрок может ЗАБРАТЬ свой СТАК и добавить его в основной счет (результат округляется).\n' +
       'Выигрывает тот, кто первый наберет 500 или более очков.'
   );
});