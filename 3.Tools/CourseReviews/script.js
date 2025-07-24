// Stores the result of each question (true if answered correctly, false otherwise)
var results = [];
// Stores the indices of questions that have not been answered correctly yet
var uncorrectQuestions = [];

// Wait for the DOM to be fully loaded before starting the review logic
document.addEventListener('DOMContentLoaded', function () {
    // Check if the 'questions' variable exists and is a non-empty array
    if (typeof questions !== 'undefined') {
        if (Array.isArray(questions) && questions.length > 0) {
            // Initialize the review session
            launchReviews();
        } else {
            // Warn if questions array is empty
            console.warn('questions is empty !');
        }
    } else {
        // Error if questions variable does not exist
        console.error('questions does not exist !');
    }
});

/**
 * Initializes the review session by resetting results and uncorrectQuestions,
 * then displays the first question.
 */
function launchReviews() {
    // Set all results to false (not answered correctly)
    results = Array.from(questions).map(() => false);
    // All questions are initially uncorrect
    uncorrectQuestions = results.map((elt, idx) => idx);
    // Display a random uncorrect question
    displayQuestionBox(getIndexUncorrect());
}

/**
 * Displays the question box for the given question number.
 * Shows the question, textarea for answer, and validation button.
 * Also updates indicators and sets up event listeners.
 * @param {number} questionNumber - Index of the question to display
 */
function displayQuestionBox(questionNumber) {
    // Clear previous content in the display area
    document.querySelector('#display').innerHTML = "";
    // Create dialog container
    const dialog = document.createElement('div');
    dialog.className = 'dialog';

    // Create and append the question label
    const label = document.createElement('label');
    label.htmlFor = 'answer';
    label.innerText = questions[questionNumber][0];
    dialog.appendChild(label);

    // Create and append the textarea for user answer
    const textarea = document.createElement('textarea');
    textarea.id = label.htmlFor;
    dialog.appendChild(textarea);

    // Create and append the button container
    const btns = document.createElement('div');
    btns.classList = 'btns';
    dialog.appendChild(btns);

    // Create and append the validation button
    const btn = document.createElement('button');
    btn.innerText = 'Valider la réponse';
    btns.appendChild(btn);

    // Create and append a warning/alert area for feedback
    const warning = document.createElement('div');
    warning.classList = 'alert';
    warning.innerText = 'Ceci est un test d\'avertissement';
    btns.appendChild(warning);

    // Add the dialog to the display area
    document.querySelector('#display').appendChild(dialog);

    // Update question indicators (success/fail for each question)
    questionsIndicators();
    // Set up event listeners for answer validation
    actionCheckAnswer();

    // Focus the answer element
    document.querySelector('#answer').focus();
}

/**
 * Checks the user's answer for the current question.
 * If correct, updates results and removes from uncorrectQuestions.
 * Displays next question or congratulates if all are answered.
 */
function checkAnswer() {
    let delay = 3000; // Default delay before showing next question
    // Iterate through all questions to find the current one
    Array.from(questions).forEach((array, idx) => {
        // Check if the array exists as an array
        if (Array.isArray(array)) {
            // If the displayed question matches and the answer is correct
            if (document.querySelector('label').innerText === array[0] && document.querySelector('textarea').value.trim() === array[1]) {
                results[idx] = true;
                // Remove the question from uncorrectQuestions
                uncorrectQuestions.splice(uncorrectQuestions.indexOf(idx), 1);
                delay = 0; // No delay if correct
            } else if (document.querySelector('label').innerText === array[0] && document.querySelector('textarea').value.trim() !== array[1]) {
                // If answer is incorrect, show the correct answer in alert
                document.querySelector('.alert').innerText = "Fail ! The complete answer is \n\"" + array[1] + "\"";
                document.querySelector('.alert').classList.add('visible');
                delay = 3000; // Delay before next question
            }
        }
    });

    // If there are still uncorrect questions, display another one
    if (uncorrectQuestions.length > 0) {
        setTimeout(() => {
            displayQuestionBox(getIndexUncorrect());
            document.querySelector('#answer').focus();
        }, delay);
    } else {
        // All questions answered correctly
        questionsIndicators();
        document.querySelector('#display').innerHTML = "You answered all questions ! Congratulations !";
    }
}

/**
 * Sets up event listeners for the validation button and textarea.
 * Allows answer submission via button click or pressing Enter.
 */
function actionCheckAnswer() {
    // Validate answer on button click
    document.querySelector('button').addEventListener('click', checkAnswer);

    // Validate answer on Enter key in textarea
    document.querySelector('textarea').addEventListener('keydown', function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            checkAnswer();
        }
    });
}

/**
 * Returns a random index from the uncorrectQuestions array.
 * Used to select the next question to display.
 * @returns {number} Index of a random uncorrect question
 */
function getIndexUncorrect() {
    return uncorrectQuestions[Math.floor(Math.random() * uncorrectQuestions.length)];
}

/**
 * Updates the visual indicators for each question.
 * Shows success or fail status for each question.
 */
function questionsIndicators() {
    // Clear previous indicators
    document.querySelector('#indicators').innerHTML = '';

    // Create and append an indicator for each question
    results.forEach((result, idx) => {
        const indicator = document.createElement('span');
        indicator.id = 'result' + idx;
        indicator.classList = result ? 'success' : 'fail';
        document.querySelector('#indicators').appendChild(indicator);
    });
}