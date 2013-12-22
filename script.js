//Global
var currentQuestion = 0;
var score = 0;
$(document).ready(function() {
	generateQuestion.init();
	generateOptions();
	$("input[type='radio'][name='options']").click(evaluation);
	$("a").click(newQuestion);
});

//question objects
var Question = function(currentQuestion,options,correctAnswer) {
	this.currentQuestion = currentQuestion;
	this.options = options;
	this.correctAnswer = correctAnswer;
};

var questions = [];
questions[0] = new Question("What is hiding under the Sword Lake in Hanoi", ["A lion", "A turtle", "A shark", "A gold fish", "Just crappy things"], 1);
questions[1] = new Question("How many streets are there in Hanoi's Old Town", ["34","35","36","37","38"], 2);
questions[2] = new Question("In which movie, Robin Williams performed as a Radio DJ?", ["Good Will Hunting","Jumanji","Good Morning, Vietnam","Aladdin","Hook"], 2);
questions[3] = new Question("Tom Cruise performed in which Vietnam War movies?", ["Platoon","Heaven and Earth","Good Morning, Vietnam","Born on the 4th of July","Full Metal Jacket"], 3);
questions[4] = new Question("And what do the Vietnamese want to get rid of right now?", ["Communism","China","Dog meat","Pho","Russian Vodka"], 0);

//generate question on the screen
var generateQuestion = {
	init:function() {
		generateQuestion.scoreCounter();
		generateQuestion.questionCounter(currentQuestion);
		generateQuestion.generate();
	},
	generate:function() {
		$(".question").append("<p>"+ questions[currentQuestion].currentQuestion +"</p>");
	},
	questionCounter:function(currentQuestion) {
		var counter = currentQuestion+1;
		$(".info").append("<p>" + "Question " + counter +" out of 5" +"</p>");
		$("body").addClass("question"+counter);
	},
	scoreCounter:function() {
		$(".score p").remove();
		$(".score").append("<p>"+ "You've got " +score+ "/5 correct" +"</p>");
	}
};

//generate options on the screen
var generateOptions = function() {
	$(".answer").append("<ul>");
	for (var i = 0; i < questions[currentQuestion].options.length; i++) {
		$(".answer ul").append('<input type="radio" name="options" value=' +(i)+ '>' + questions[currentQuestion].options[i] + '<br>');
	}
};

//evaluate the answers
var evaluation = function() {
		//evaluate the user input
		//If it was RIGHT
		if (this.value == questions[currentQuestion].correctAnswer) {
			//show the confirmation
			$(".answer").append("<p>That's CORRECT!</p>");
			//Increment user's game point:
			score++;
			generateQuestion.scoreCounter();
			//Move to next question:evaluate.newQuestion()
			//currentQuestion++;
			//newQuestion();
			
		//If it was INCORRECT
		} else{
			//show the correct question
			var correct = questions[currentQuestion].correctAnswer;
			$(".answer").append("<p>The correct answer is " + questions[currentQuestion].options[correct] +" </p>");
			//Move to next question: evaluate.newQuestion()
			//currentQuestion++;
			//newQuestion();
		}
	};
var newQuestion = function() {
	//remove previous question out of the screen
		$("div.question > p").remove();
		$(".score > p").remove();
		$(".info > p").remove();
		$(".answer > ul").remove();
		$(".answer > p").remove();
		//show new Question to the screen
		currentQuestion++;
		if (currentQuestion < 5) {
			generateQuestion.init();
			//show new options to the screen
			generateOptions();
			$("input[type='radio'][name='options']").click(evaluation);
		}
		if (currentQuestion === 5) {
			generateQuestion.scoreCounter();
			$(".info > p").hide();
			$("a div").remove();
			$("a").append("<p>COMPLETED</p>");
		}
	};