// ===== FILTRO DO CATÁLOGO =====
const botoesFiltro = document.querySelectorAll(".filtro");
const cards = document.querySelectorAll(".card");

botoesFiltro.forEach(function (botao) {
  botao.addEventListener("click", function () {
    const filtro = botao.dataset.filtro;

    // mostra só os cards da categoria escolhida
    cards.forEach(function (card) {
      if (filtro === "todos" || card.dataset.categoria === filtro) {
        card.hidden = false;
      } else {
        card.hidden = true;
      }
    });

    // destaca o botão clicado
    botoesFiltro.forEach(function (b) {
      b.classList.remove("ativo");
      b.setAttribute("aria-pressed", "false");
    });
    botao.classList.add("ativo");
    botao.setAttribute("aria-pressed", "true");
  });
});

// ===== VALIDAÇÃO DO FORMULÁRIO DE CONTATO =====
const form = document.getElementById("form-contato");
const campoNome = document.getElementById("nome");
const campoTelefone = document.getElementById("telefone");
const campoMensagem = document.getElementById("mensagem");
const confirmacao = document.getElementById("confirmacao");

function mostrarErro(campo, idErro, texto) {
  document.getElementById(idErro).textContent = texto;
  if (texto === "") {
    campo.classList.remove("campo-erro");
  } else {
    campo.classList.add("campo-erro");
  }
}

form.addEventListener("submit", function (evento) {
  evento.preventDefault(); // não recarrega a página
  let valido = true;
  confirmacao.textContent = "";

  // nome: pelo menos 3 letras
  if (campoNome.value.trim().length < 3) {
    mostrarErro(campoNome, "erro-nome", "Informe seu nome, com pelo menos 3 letras.");
    valido = false;
  } else {
    mostrarErro(campoNome, "erro-nome", "");
  }

  // telefone: só os números, entre 10 e 11 dígitos (DDD + número)
  const numeros = campoTelefone.value.replace(/\D/g, "");
  if (numeros.length < 10 || numeros.length > 11) {
    mostrarErro(campoTelefone, "erro-telefone", "Informe o telefone com DDD, por exemplo (71) 99999-9999.");
    valido = false;
  } else {
    mostrarErro(campoTelefone, "erro-telefone", "");
  }

  // mensagem: pelo menos 10 caracteres
  if (campoMensagem.value.trim().length < 10) {
    mostrarErro(campoMensagem, "erro-mensagem", "Escreva seu pedido de pizza ...");
    valido = false;
  } else {
    mostrarErro(campoMensagem, "erro-mensagem", "");
  }

  if (valido) {
    confirmacao.textContent = "Pedido de pizza recebido!, " + campoNome.value.trim() + "! Vamos responder pelo WhatsApp.";
    form.reset();
  }
});
