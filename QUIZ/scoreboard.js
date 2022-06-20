let results = [];
let contain = document.getElementById("contain");
let scoreboard = document.getElementById("scoreboard");
let table = document.getElementsByTagName("table")[0];

function createScoreboard() {
    // shows scoreboard
    contain.style.display = "none";
    scoreboard.style.display = "block";
    
    for (let i=0; i < results.length; i++) { // sets up the for questions, answers, correct answer and score.
        const tr = document.createElement("tr");
        let result = "incorrect";
        
        if (results[i].state) { // checks if player is right or wrong
            result = "correct";
        } else {
            result = "incorrect"
        }
        tr.innerHTML = "<td>"+(i+1)+"</td> <td>"+results[i]["question"]+"</td> <td>"+results[i]["your answer"]+ "</td> <td>"+results[i]["correct answer"]+ "</td><td>"+result+"</td>"
        
        table.appendChild(tr);
    }
    let correct = results.filter((row) => {
        return row["state"];
    }).length; // counts how many correct answers
   
    const score = document.getElementsByTagName("td")[Object.keys(results[0]).length]; // element for score
    score.textContent += correct+"/"+results.length; // shows correct answers / amount of questions
}



