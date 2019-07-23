// A simple clone of the Mastermind game that Jacqui loves so much

var colors = ['#bf00ff', '#00bfff', '#ff00bf', '#bfff00', '#00ffbf', '#ffbf00', '#ffbfff']
var found = [false, false, false, false];
var answer = [];
var guess = [];

init();

function init(){
    // Set the answer row to gray until guessed correctly
    for(var i = 0; i < 4; i++){
        var cell = document.querySelector('#answer_col' + i);
        var color = Math.floor(Math.random() * 7);

        cell.classList.add('unknown');
        answer.push(color);
    }

    createGuessRow(1);
}

function createGuessRow(rowNumber){
    // Add row
    document.querySelector('#wrapper').insertAdjacentHTML(
        'beforeend',
        `<div id="row` + rowNumber + `">
            <div class="pin" id="row` + rowNumber + `_col0">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col1">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col2">&nbsp;</div>
            <div class="pin" id="row` + rowNumber + `_col3">&nbsp;</div>
            <div class="guess" id="row` + rowNumber + `_guess">Guess!</div>
        </div>`
    );

    // Populate guess
    for(var i = 0; i < 4; i++){
        if(found[i]){
            var cell = document.querySelector('#row' + rowNumber + '_col' + i);
            cell.setAttribute('style', 'background-color: ' + colors[answer[i]]);
            guess[i] = answer[i];
        }
        else guess[i] = -1;
    }

    // Setup actions
    var colorSelect = function() {
        var col = parseInt(this.id.split('_col')[1]);
        var newColor = (guess[col] + 1) % 7;
        this.setAttribute('style', 'background-color: ' + colors[newColor]);
        guess[col] = newColor;
    }

    document.querySelector('#row' + rowNumber + '_guess').addEventListener('click', function(){
        // Disable current guess row
        this.style.display = 'none';
        document.querySelector('#row' + rowNumber + '_col0').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col1').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col2').removeEventListener('click', colorSelect);
        document.querySelector('#row' + rowNumber + '_col3').removeEventListener('click', colorSelect);

        // Determine if we found any matches
        for(var i = 0; i < 4; i++){
            if(guess[i] == answer[i]){
                found[i] = true;

                var cell = document.querySelector('#answer_col' + i);
                cell.classList.remove('unknown');
                cell.setAttribute('style', 'background-color: ' + colors[guess[i]]);
            }
        }

        // Create a new guess row if needed
        var unfound = 0;
        for(var i = 0; i < 4; i++){
            if(!found[i]) unfound++;
        }
        if(unfound > 0) createGuessRow(rowNumber + 1);
    })
    document.querySelector('#row' + rowNumber + '_col0').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col1').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col2').addEventListener('click', colorSelect);
    document.querySelector('#row' + rowNumber + '_col3').addEventListener('click', colorSelect);
}