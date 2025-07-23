var results = [];

document.addEventListener('DOMContentLoaded', function(){
    if (typeof questions !== 'undefined') {
        if(Array.isArray(questions) && questions.length > 0){
            launchReviews();
            actionCheckAnswer();
        } else {
            console.warn('questions is empty !');
        }
    } else {
        console.error('questions does not exist !');
    }
});

function launchReviews(){
    results = Array.from(questions).map(() => false);
    displayQuestionBox(0);
}

function displayQuestionBox(questionNumber){
    const dialog = document.createElement('div');
    dialog.className = 'dialog';
    dialog.dataset.correct = 0;

    const label = document.createElement('label');
    label.htmlFor = 'answer';
    label.innerText = questions[questionNumber][0];
    dialog.appendChild(label);

    const textarea = document.createElement('textarea');
    textarea.id = label.htmlFor;
    dialog.appendChild(textarea);

    const btns = document.createElement('div');
    btns.classList = 'btns';
    dialog.appendChild(btns);

    const btn = document.createElement('button');
    btn.innerText = 'Valider la réponse';
    btns.appendChild(btn);

    document.body.appendChild(dialog);
}

function checkAnswer(){

    Array.from(questions).forEach((array, idx) => {
        if(document.querySelector('label').innerText === array[0] && document.querySelector('textarea').value === array[1]){
            results[idx] = true;
        }
    });
    document.querySelector('.dialog').dataset.correct = results;
}

function actionCheckAnswer(){
    document.querySelector('button').addEventListener('click', checkAnswer);

    document.querySelector('textarea').addEventListener('keyup', function(event){
        if(event.key === "Enter"){
            checkAnswer();
        }
    });
}