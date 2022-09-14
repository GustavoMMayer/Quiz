//inicial data

let currentQuestion =0;
let correctAnswers = 0;
showQuestion();

// events
document.querySelector('.scoreArea button').addEventListener('click',reset);

//functions

function showQuestion(){
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];

        let pct= (currentQuestion/questions.length)*100;

        document.querySelector('.progress--bar').style.width = `${pct}%`;
       
        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = q.question;

        
        
        let optionHtml = '';
        for(let i in q.options){
            optionHtml+= `<div data-op='${i}' class='option'><span>${parseInt(i)+1}</span>${q.options[i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionHtml;

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent);
        });

    }else{
        finisgQuiz();
    }
}

function optionClickEvent (e){
    let clickedOptions = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOptions){
        correctAnswers ++;
    };
    currentQuestion++;
    showQuestion();

}

function finisgQuiz(){
    let points = Math.floor((correctAnswers/questions.length)*100);
    let msg = '';
    let msgColor= '';

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} quesões e acertou ${correctAnswers}`
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';

    if(points >=70){
        msg = "Parabéns, vc arrombou"
    }else if(points>30 && points<70){
        msg = "Foi razoavel, poderia ter sido melhor"
        msgColor = "yellow"
    }else{
        msg = "Está mau... vai estudar"
        msgColor = "red"
    }
    
    document.querySelector('.scoreText1').innerHTML = msg;
    document.querySelector('.scorePct').style.color =msgColor;
}

    
function reset(){
    currentQuestion =0;
    correctAnswers = 0;
    showQuestion()

}