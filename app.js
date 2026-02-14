let aplicacoes = JSON.parse(localStorage.getItem("aplicacoes")) || [];

const form = document.getElementById("form");
const lista = document.getElementById("lista");
const filtroStatus = document.getElementById("filtroStatus");

const totalEl = document.getElementById("total");
const entrevistasEl = document.getElementById("entrevistas");
const aprovadoEl = document.getElementById("aprovado");

// Evento do formulário
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const empresa = document.getElementById("empresa").value;
  const cargo = document.getElementById("cargo").value;
  const status = document.getElementById("status").value;
  const data = document.getElementById("data").value;
  const obs = document.getElementById("obs").value;

  const novaAplicacao = {
    id: Date.now(),
    empresa,
    cargo,
    status,
    data,
    obs
  };

  aplicacoes.push(novaAplicacao);

  salvarDados();
  atualizarTela();
  form.reset();
});

// Filtro
filtroStatus.addEventListener("change", atualizarTela);

// Salvar no localStorage
function salvarDados() {
  localStorage.setItem("aplicacoes", JSON.stringify(aplicacoes));
}

// Atualizar tela
function atualizarTela() {
  lista.innerHTML = "";

  const filtro = filtroStatus.value;

  let aplicacoesFiltradas = aplicacoes;

  if (filtro !== "Todos") {
    aplicacoesFiltradas = aplicacoes.filter(a => a.status === filtro);
  }

  aplicacoesFiltradas.forEach(aplicacao => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${aplicacao.empresa}</strong> - ${aplicacao.cargo} <br>
      Status: ${aplicacao.status} | Data: ${aplicacao.data} <br>
      ${aplicacao.obs ? "Obs: " + aplicacao.obs : ""}
      <br>
      <button onclick="removerAplicacao(${aplicacao.id})">Remover</button>
      <hr>
    `;

    lista.appendChild(li);
  });

  atualizarEstatisticas();
}

// Estatísticas com reduce
function atualizarEstatisticas() {
  const total = aplicacoes.length;

  const entrevistas = aplicacoes.filter(a => a.status === "Entrevista").length;

  const aprovados = aplicacoes.filter(a => a.status === "Aprovado").length;

  totalEl.textContent = total;
  entrevistasEl.textContent = entrevistas;
  aprovadoEl.textContent = aprovados;
}

// Remover aplicação
function removerAplicacao(id) {
  aplicacoes = aplicacoes.filter(a => a.id !== id);
  salvarDados();
  atualizarTela();
}

// Inicializar
atualizarTela();
