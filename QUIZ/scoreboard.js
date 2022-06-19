let results = [];
let contain = document.getElementById("contain");
let scoreboard = document.getElementById("scoreboard");
let table = document.getElementsByTagName("table")[0];

function createScoreboard() {
    console.log(results);
    contain.style.display = "none";
    scoreboard.style.display = "block";
    
    for (let i=0; i < results.length; i++) {
        const tr = document.createElement("tr");
        let result = "incorrect";
        
        if (results[i].state) {
            result = "correct";
        } else {
            result = "incorrect"
        }
        tr.innerHTML = "<td>"+i+"</td> <td>"+results[i]["question"]+"</td> <td>"+results[i]["correct answer"]+ "</td> <td>"+results[i]["your answer"]+ "</td><td>"+result+"</td>"
        
        table.appendChild(tr);
    }
    let correct = results.filter((row) => {
        return row["state"];
    }).length;
    console.log(Object.keys(results[0]).length)
    const text = document.getElementsByTagName("td")[Object.keys(results[0]).length];
    text.textContent += correct+"/"+results.length;
}



