jQuery(document).ready(function() {
    //Set Variables and Values
    var startButton;
    var gameToHTML;
    var counterTicker = 20;
    var questionCount = 0;
    var answerSelect;
    var LeClock;
    var rightAnswerTally = 0;
    var wrongAnswerTally = 0;
    var noAnswerTally = 0;

    //Sounds
    const clickSound = new Audio ("assets/audio/button-16-click.mp3");
    const correctSound = new Audio ("assets/audio/button-14-correct.mp3");
    const wrongSound = new Audio ("assets/audio/button-12-wrong.mp3");
    const timesUpSound = new Audio ("assets/audio/frontdesk-bells.mp3")
    
    //The Questions
    var questionArray = ["What chemical element gives the blood of a lobster a bluish tint?", "Bronze is an alloy consisting primarily of what two elements?", "Which is the most abundant metal in the earth's crust?", "Fe is the chemical symbol for what element?", "Cubic zirconia is a synthesized material often used in place of what precious stone?", "The filament in an incandescent light bulb is made of what element?", "Au is the symbol for what chemical element?", "Diamonds are made of almost entirely of what element?", "What is the chemical symbol for Helium?", "How many hydrogen atoms are in one molecule of water?", "Sodium Chloride is most commonly called what?", "What is the chemical formula for ozone?", "What is the chemical formula for Epsom salt?", "Who is generally acknowledged as the 'father' of the modern periodic table?", "Which element, previously used in the production of felt, lead to the expression 'mad as a hatter'?", "Which element symbol is the letter K on the periodic table?", "What is the chemical symbol for lithium?", "What is the most abundant element in the earth's atmosphere?", "What is the first element on the periodic table?", "What is the chemical formula for hydrogen peroxide?"];
    
    //Multiple Choice
    var answersArray = [["Cyan", "Iron", "Copper", "Magnesium"], ["Copper and Aluminum", "Copper and Platinum", "Copper and Silver", "Copper and Tin"], ["Aluminum", "Silver", "Iron", "Lead"], ["Platinum", "Iron", "Mercury", "Zinc"], ["Sapphire", "Ruby", "Diamond", "Amethyst"], ["Manganese", "Tungsten", "Nickel", "Cadmium"], ["Gold", "Silver", "Arsenic", "Aluminum"], ["Palladium", "Molybdenum", "Sodium", "Carbon"], ["Kr", "Ne", "He", "Xe"], ["Three", "Two", "One", "None of the Above"], ["Tenderizer", "Pepper", "Salt", "Sugar"], ["O", "H<sub>2</sub>", "O<sub>2</sub>", "O<sub>3</sub>"], ["MgSO<sub>4</sub>.7H<sub>2</sub>O", "MnSO<sub>4</sub>.7H<sub>2</sub>O", "FeSO<sub>4</sub>.7H<sub>2</sub>O", "CuSO<sub>4</sub>.7H<sub>2</sub>O"], ["New Zealand Chemist: Ernest Rutherford", "Russian Chemist: Dmitri Mendeleev", "German Chemist: Friedrich Wohler", "Dutch-American Chemist: Izaak Kolthoff"], ["Lead", "Arsenic", "Mercury", "Bismuth"], ["Copper", "Potassium", "Krypton", "Chromium"], ["Li", "Ti", "Cd", "Si"], ["Sulfur", "Carbon", "Oxygen", "Nitrogen"], ["Flourine", "Helium", "Hydrogen", "Bromine"], ["H<sub>2</sub>O", "H<sub>2</sub>O<sub>2</sub>", "H<sub>4</sub>O<sub>2</sub>", "HO<sub>2</sub>"]];

    //The Answers Key
    var correctAnswersArray = ["Copper", "Copper and Tin", "Aluminum", "Iron", "Diamond", "Tungsten", "Gold", "Carbon", "He", "Two", "Salt", "O<sub>3</sub>", "MgSO<sub>4</sub>.7H<sub>2</sub>O", "Russian Chemist: Dmitri Mendeleev", "Mercury", "Potassium", "Li", "Nitrogen", "Hydrogen", "H<sub>2</sub>O<sub>2</sub>"];

    //Add Images to Answers Key
    var imageArray = ["<img class='rounded mx-auto d-block img_right' src='assets/images/copper.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/bronze.png'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/aluminum.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/iron.JPG'>", "<img class='rounded mx-auto d-block imgRight' src='assets/images/diamond.jpg'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/tungsten.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/gold.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/carbon.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/helium.JPG'>", "<img class='rounded mx-auto d-block imgRight' src='assets/images/water-molecule.png'>", "<img class='rounded mx-auto d-block imgRight' src='assets/images/salt.jpg'>", "<img class='rounded mx-auto d-block imgRight' src='assets/images/oxygen-to-ozone.jpg'>", "<img class='rounded mx-auto d-block imgRight2' src='assets/images/magnesium-sulfate.png'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/DIMendeleev.jpg'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/mercury.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/potassium.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/lithium.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/nitrogen.JPG'>", "<img class='rounded mx-auto d-block img_right' src='assets/images/hydrogen.JPG'>", "<img class='rounded mx-auto d-block imgRight' src='assets/images/hydrogen-peroxide.png'>"];

    //Start Button on Screen
    function startScreen() {
        startButton = "<p class='text-center main-button-container'><a class='btn btn-primary btn-lg btn-block start_button href='#' role='button'>Start the Quiz!</a></p>";
        $(".triviaArea").html(startButton);
    }
    startScreen();

    //Questions to HTML
    function executeHTML() {
        gameToHTML = "<p class='text-center timer-c'>Time Remaining: <span class='timer'>20</span></p><p class='text-center question'>" + questionArray[questionCount] +"</p><p class='first_answer answer'>" + answersArray[questionCount][0] + "</p><p class='answer'>" + answersArray[questionCount][1] + "</p><p class='answer'>" + answersArray[questionCount][2] + "</p><p class='answer'>" + answersArray[questionCount][3] + "</p>";

        $(".triviaArea").html(gameToHTML);
    }

    //The Timer!
    function timer() {
        LeClock = setInterval(twentySeconds, 1000);
        function twentySeconds() {
            if (counterTicker === 0) {
                timesUpSound.play();
                clearInterval(LeClock);
                executeLossTimeOut();
            }
            if (counterTicker > 0) {
                counterTicker--;
            }
            $(".timer").html(counterTicker);
        }
    }

    //Wait Timer for Next Question
    function waitForMe() {
        if (questionCount < 19) {
            questionCount++;
            executeHTML();
            counterTicker = 20;
            timer();
        } else {
            summaryScreen(); //Out of Questions, what to do
        }
    }

    //Ran Out of Time, what happens
    function executeLossTimeOut() {
        noAnswerTally++;
        gameToHTML = "<p class='timer-c'>Time Remaining: <span class='timer'>" + counterTicker + "</span></p>" + "<p class='text-center say_something'>Time is UP! The correct answer was: " + correctAnswersArray[questionCount] + "</p>" + "<img class='rounded mx-auto d-block img_wrong' src='assets/images/x.png'>"; 

        $(".triviaArea").html(gameToHTML);
        setTimeout(waitForMe, 4000);
    }

    //Answered Question Correctly, what happens
    function executeWin() {
        rightAnswerTally++;
        gameToHTML = "<p class='text-center timer-c'>Time Remaining: <span class='timer'>" + counterTicker +"</span></p>" + "<p class='text-center say_something'>Correct! The answer is: " + correctAnswersArray[questionCount] + "</p>" + imageArray[questionCount];

        $(".triviaArea").html(gameToHTML);
        setTimeout(waitForMe, 4000);
    }

    //Answered Question Wrong, what happens
    function executeLoss() {
        wrongAnswerTally++;
        gameToHTML = "<p class='text-center timer-c'>Time Remaining: <span class='timer'>" + counterTicker + "</span></p>" + "<p class='text-center say_something'>Wrong! The correct answer is: " + correctAnswersArray[questionCount] + "</p>" + "<img class='rounded mx-auto d-block img_wrong' src='assets/images/x.png'>"; 

        $(".triviaArea").html(gameToHTML);
        setTimeout(waitForMe, 4000);
    }

    //No more questions, display Summary page
    function summaryScreen() {
        gameToHTML = "<p class='text-center timer-c'>Time Remaining: <span class='timer'>" + counterTicker + "</span></p>" + "<p class='text-center say_something'>All done, here's how you did!" + "</p>" + "<p class='summary_correct summary'>Right Answers: " + rightAnswerTally + "</p>" + "<p class='summary'>Wrong Answers: " + wrongAnswerTally + "</p>" + "<p class='summary'>Unanswered: " + noAnswerTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset_button' href='#' role='button'>Reset The Quiz!</a></p>";

        $(".triviaArea").html(gameToHTML);
    }

    //Reset Game without page reload
    function gameReset() {
        questionCount = 0;
        rightAnswerTally = 0;
        wrongAnswerTally = 0;
        noAnswerTally = 0;
        counterTicker = 20;
        executeHTML();
        timer();
    }
    
    //Click on Start Button page
    $("body").on("click", ".start_button", function(event){
        event.preventDefault();
        clickSound.play();
        executeHTML();
        timer();
    });
    
    //Click on answer to question
    $("body").on("click", ".answer", function(event) {
        clickSound.play();
        answerSelect = $(this).html();
        console.log(answerSelect)
        console.log(this)
        if (answerSelect === correctAnswersArray[questionCount]) {
            console.log(correctAnswersArray[questionCount]);
            clearInterval(LeClock);
            executeWin();
            correctSound.play();
        } else {
            clearInterval(LeClock);
            executeLoss();
            wrongSound.play();
        }
    });
    
    //Click reset button at the end of the game
    $("body").on("click", ".reset_button", function(event){
        clickSound.play();
        gameReset();
    });
});