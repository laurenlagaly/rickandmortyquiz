var STORE = [
  {
      question: "What does Rick use as a car battery?", 
      choices: ["A flux capacitor", "A tiny universe", "A plumbus", "Kalaxian crystals"],
      answer: 1
  },
  {
      question: "What currency is used in the Thirsty Step Tavern?", 
      choices: ["Schnickels", "Blemflarcks", "Brappels", "Schmeckels"],
      answer: 3
  },
  {
      question: "What does wubbalubbadubdub mean?", 
      choices: ["It's Rick's nonsensical catchphrase.", "It's an alien swear word.", "I am in great pain, please help me.", "Answers 1 and 3"],
      answer: 3
  },
  {
      question: "What 1980s Sci-Fi film served as inspiration for the characters Rick and Morty?", 
      choices: ["Dune", "Blade Runner", "Back to the Future", "Tron"],
      answer: 2
  },
  {
      question: "What happened to Rick and Morty's original dimension, C-137?", 
      choices: ["It was overrun by monsters who are in love with Morty.", "It was blown up by the Cromulons.", "It got lost in a time rift.", "It was destroyed with an anti-matter handgun."],
      answer: 0
  },
  {
      question: "What is the name of Water-T's home planet?", 
      choices: ["Numbericon", "Alphabetrium", "Gromflom Prime", "Iceberg Slim"],
      answer: 1
  },
  {
      question: "When Rick and Morty are trying to find a new planet, which of these was not one of their options?", 
      choices: ["Purge Planet", "On a Cob Planet", "An incredibly small planet", "Screaming Sun Planet"],
      answer: 0
  },
  {
      question: "When Summer gets a job at a thrift store, the owner gives Rick a cursed microscope. What does it do?", 
      choices: ["Causes impotence", "Makes people better looking", "Lowers IQ", "Makes Pluto a planet again"],
      answer: 2
  },
  {
      question: "What does Morty's dog rename himself?", 
      choices: ["Snowflake", "Marshmallow", "Sniffles", "Snowball"],
      answer: 3
  },
  {
      question: "What causes the time rifts in Season 2 Episode 1?", 
      choices: ["Existential crises", "Uncertainty", "Stupidity", "Sarcasm"],
      answer: 1
  }   
  ];
  
var currentScore = {
  correct: [],
  incorrect: []
};

var rickMortyQuiz = {
  question:0,
  startQuiz:function(){
    $("#start").click(function()  {
    $("#dynamic-col").removeClass("col-3 start-box").addClass("col-6");
    $(this).hide();
    $(".question-answer-text").show();
    rickMortyQuiz.renderCurrentQuestion();
  });
  $("span.close").click(function (){
    $("#myModal").hide();
  });
  window.onclick = function(event) { if (event.target == $("#myModal")[0]) { $("#myModal").hide()} };
  },
  renderCurrentQuestion:function(){
    var currentQuestion = STORE[rickMortyQuiz.question];
    $("input[type='radio']").attr('checked', false)
    $("#question-text").text(currentQuestion.question);
    $('.answer span').each(function(i,x){
      $(x).text(currentQuestion.choices[i]);
    });
    $("#question-number-status").text("Question " + (rickMortyQuiz.question + 1) + " of " + STORE.length);
    rickMortyQuiz.displayCurrentScore();
  },
  displayCurrentScore:function(txt){
    var correctTotal = currentScore.correct.length;
    var incorrectTotal = currentScore.incorrect.length;
    console.log(txt);
    console.log(txt === undefined);
    txt === undefined ? txt = "Current" : txt = txt;
    $(".current-score").text(txt + " Score: " + correctTotal + " correct, " + incorrectTotal + " incorrect");
  },
  playAgain:function(){
    $(".question-answer-text").hide();
    $("#end").show();
    rickMortyQuiz.displayCurrentScore("Final");
    $("#end-btn").click(function()  {
      $("#end").hide();
      rickMortyQuiz.question = 0;
      $(".question-answer-text").show();
      currentScore.correct = [];
      currentScore.incorrect = [];
      rickMortyQuiz.renderCurrentQuestion();
  });
  },
  runQuiz:function(){
    rickMortyQuiz.startQuiz();
    rickMortyQuiz.submitAnswer();
  },
  submitAnswer:function(){
    $('#answer-list').on('submit',function(event){
    event.preventDefault();
    var question = rickMortyQuiz.question;
    var userQA = {
        userQ: question,
        userA: $('input[name=answerChoice]:checked').val()
      };
    if(STORE[question].answer == parseInt($('input[name=answerChoice]:checked').val())) {
      $("#myModal").show();
      $("#myModal img").attr("src", "correctAnswer.gif");
      $(".modal-header h2").html("<h2>You were correct!</h2>");
      currentScore.correct.push(userQA);
    }
    else {
      $("#myModal").show();
      $("#myModal img").attr("src", "incorrectAnswer.gif");
      $(".modal-header h2").html("<h2>You were incorrect!</h2>");
      var i = STORE[question].answer;
      currentScore.incorrect.push(userQA);
    }
    
    if (question < (STORE.length - 1)) {
    rickMortyQuiz.question++;
    console.log(STORE.length + ".");
    rickMortyQuiz.renderCurrentQuestion();
    }
    else {
      rickMortyQuiz.playAgain();
    }
  })
  }
}

$(rickMortyQuiz.runQuiz);

  