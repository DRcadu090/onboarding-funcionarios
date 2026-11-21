
function darBoasVindas() {
    document.getElementById("mensagem").textContent =
        "Que bom ter você aqui! Vamos começar sua jornada.";
}
 


function atualizarContador() {
    let tarefas = document.querySelectorAll(".lista-tarefas input");
    let concluidas = document.querySelectorAll(".lista-tarefas input:checked");

    let porcentagem = (concluidas.length / tarefas.length) * 100;

    document.getElementById("contador").textContent =
        "Tarefas concluídas: " + concluidas.length + " de " + tarefas.length;

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";

    let estadoTarefas = [];

    tarefas.forEach(function(tarefa) {
        estadoTarefas.push(tarefa.checked);
    });

    localStorage.setItem("tarefasSalvas", JSON.stringify(estadoTarefas));
}


function enviarDuvida() {
    let campo = document.getElementById("duvida");
    let lista = document.getElementById("listaDuvidas");

    let pergunta = campo.value.trim();

    if (pergunta === "") {
        alert("Digite uma dúvida antes de enviar!");
        return;
    }

    let perguntasSalvas = JSON.parse(localStorage.getItem("perguntasSalvas")) || [];

    perguntasSalvas.push(pergunta);

    localStorage.setItem("perguntasSalvas", JSON.stringify(perguntasSalvas));

    mostrarPerguntas();

    campo.value = "";
}

function mostrarPerguntas() {
    let lista = document.getElementById("listaDuvidas");

    let perguntasSalvas = JSON.parse(localStorage.getItem("perguntasSalvas")) || [];

    lista.innerHTML = "";

    perguntasSalvas.forEach(function(pergunta) {
        let novaPergunta = document.createElement("p");

        novaPergunta.textContent = "Sua dúvida: " + pergunta;

        lista.appendChild(novaPergunta);
    });
}

function enviarFeedback() {
    let campo = document.getElementById("campoFeedback");
    let mensagem = document.getElementById("mensagemFeedback");

    let opiniao = campo.value.trim();

    if (opiniao === "") {
        alert("Escreva seu feedback antes de enviar!");
        return;
    }

    let feedbacksSalvos = JSON.parse(localStorage.getItem("feedbacksSalvos")) || [];

    feedbacksSalvos.push(opiniao);

    localStorage.setItem("feedbacksSalvos", JSON.stringify(feedbacksSalvos));

    mensagem.textContent = "Obrigado por compartilhar sua opinião!";

    mostrarFeedbacks();

    campo.value = "";
}
function mostrarFeedbacks() {
    let lista = document.getElementById("listaFeedbacks");

    let feedbacksSalvos = JSON.parse(localStorage.getItem("feedbacksSalvos")) || [];

    lista.innerHTML = "";

    feedbacksSalvos.forEach(function(feedback) {
        let novoFeedback = document.createElement("p");

        novoFeedback.textContent = "Feedback enviado: " + feedback;

        lista.appendChild(novoFeedback);
    });
}

function carregarTarefas() {
    let tarefas = document.querySelectorAll(".lista-tarefas input");

    let tarefasSalvas = JSON.parse(localStorage.getItem("tarefasSalvas"));

    if (tarefasSalvas !== null) {
        tarefas.forEach(function(tarefa, indice) {
            tarefa.checked = tarefasSalvas[indice] || false;
        });
    }

    atualizarContador();
}

window.onload = function() {
    carregarTarefas();
    mostrarPerguntas();
    mostrarFeedbacks();
};
