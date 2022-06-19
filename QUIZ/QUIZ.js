const main_question = document.getElementById("question");
const navbar = document.getElementById("questions");

let answers = [];
let question_nr = 0;

let questions = [];
let max_nr = 100;
async function d(i) {
    try {
        const response = await fetch("https://opentdb.com/api.php?amount="+max_nr+"&category=9&difficulty=easy&type=multiple");
        const results = await response.json();
        
        questions = results.results;
        
        SetupNAVBAR(i);
        SetupData(questions[i])
    } catch (error) {
        console.log(error)
    }
   
}

d(question_nr);

function SetupNAVBAR(n) {
    
    const bar = document.createElement("div");
    
    bar.innerHTML = n+1;
    bar.id = n;

    bar.setAttribute("class", "bar");
   
    navbar.appendChild(bar);
    console.log(n > 10)
    if (n > 10) {
        
        navbar.removeChild(navbar.children[0]);
    }
}

function htmlDecode(input) {
    var sentence = new DOMParser().parseFromString(input, "text/html"); // decodes the data
    return sentence.documentElement.textContent;
}


function SetupData(question) {
    
    main_question.innerText = htmlDecode(question["question"]);
    
    answers.push({"answer": question["correct_answer"], "value":true});

    Array.from(question["incorrect_answers"]).forEach(incorrect_answer => {
        answers.push({"answer":htmlDecode(incorrect_answer), "value":false});
    });

    answers.sort((a,b) => { // randomizes answer list order
        return Math.random()-0.5;
    })
    
    answer_cards(answers);
    
    
};
const card_container = document.getElementById("answers");

function answer_cards(list) {
    for (let i=0; i < list.length; i++) {
        
        const card = document.createElement("div");
        card.id= "card";
        card.setAttribute("onclick",  "check_card_state("+i+")");
        card.innerHTML = "<p>"+list[i]["answer"]+"</p>";

        card_container.appendChild(card);
    }
}

function check_card_state(nr) {
    results.push({
        "question": questions[question_nr]["question"],
        "state": answers[nr]["value"], 
        "correct answer" :questions[question_nr]["correct_answer"],
        "your answer": card_container.children[nr].textContent
     });

    card_container.innerHTML = " ";
    
    if (answers[nr]["value"]) {
        
        reset("rgba(4, 192, 4, 0.504)")
        
    } else if (answers[nr]["value"] === false) {
        
        reset("rgba(235, 49, 49, 0.589)")
    }
    
    
    

}

function reset(bar_color) {
    
    
    question_nr += 1;
    navbar.children[question_nr-1].style.backgroundColor = bar_color;
    
    

    if (question_nr <= max_nr-1) {
        answers = [];
        d(question_nr);
        
    } else {
        createScoreboard();
    }
    
}