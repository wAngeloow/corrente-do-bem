// Função utilitária para embaralhar um array (Fisher-Yates)
function embaralharArray(array) {
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Função para criar o HTML de um card sugestão a partir de um ponto de coleta
function criarCardSugestao(ponto) {
  return `
    <article class="card-sugestao d-flex flex-column rounded-2">

      <!-- Foto -->
      <div class="card-foto">
        <img class="rounded-top-2" src="${ponto.imagem}" alt="Imagem do ponto de coleta ${ponto.nome}">
      </div>

      <div class="d-flex flex-column flex-grow-1 gap-3 p-3">

        <div class="d-flex gap-2 align-items-center">
          <i class="fa-solid fa-location-dot fs-5" style="color: #000000;"></i>
          <p class="texto-card mb-0">${ponto.cidade} - RS</p>
        </div>

        <div>
          <h5>${ponto.nome}</h5>
          <p class="texto-card">${ponto.descricao}</p>
        </div>

        <div class="mt-auto d-flex justify-content-center">
          <a href="./ponto-coleta.html?id=${ponto.id}" class="d-flex align-items-center justify-content-center btn-main btn-card text-dark fw-bold" style="width: 70%; text-decoration: none;">CONHECER</a>
        </div>

      </div>
    </article>
  `;
}

// Executa quando o DOM estiver totalmente carregado
document.addEventListener("DOMContentLoaded", function () {

  // Elementos da navbar e botões principais
  const slide = document.querySelector('.slide');
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const hamburger = document.getElementById('hamburger');
  const contatoBtn = document.getElementById("btn-contato");

  // Abertura do menu hamburger
  openBtn?.addEventListener('click', () => {
    slide.classList.add('active');
    hamburger.style.display = 'none';
  });

  // Fechamento do menu hamburger
  closeBtn?.addEventListener('click', () => {
    slide.classList.remove('active');
    hamburger.style.display = 'block';
  });

  // Botão de contato abre link do WhatsApp em nova aba
  contatoBtn?.addEventListener("click", () => {
    window.open("https://chat.whatsapp.com/H8fN9K9LEsvJwBuARSVAWc?mode=r_c", "_blank");
  });

  // Botões para abrir modais
  const botaoCadastro = document.getElementById("cadastrar-ponto");
  const botaoCausa = document.getElementById("encontrar-causa");
  const botoesDoar = document.querySelectorAll(".btn-doar");

  // Modais e seus conteúdos
  const modalCadastro = document.getElementById("modalCadastro");
  const modalCausa = document.getElementById("modalCausa");
  const contentCadastro = document.getElementById("contentCadastro");
  const contentCausa = document.getElementById("contentCausa");

  // Abrir modal de cadastro
  botaoCadastro?.addEventListener("click", () => {
    modalCadastro.classList.remove("d-none");
    document.body.classList.add("no-scroll");
  });

  // Abrir modal de doação pelo botão principal
  botaoCausa?.addEventListener("click", () => {
    modalCausa.classList.remove("d-none");
    document.body.classList.add("no-scroll");
  });

  // Abrir modal de doação por qualquer botão DOAR
  botoesDoar.forEach((botao) => {
    botao.addEventListener("click", () => {
      modalCausa.classList.remove("d-none");
      document.body.classList.add("no-scroll");
    });
  });

  // Fechar modal de cadastro clicando fora do conteúdo
  modalCadastro.addEventListener("click", (event) => {
    if (!contentCadastro.contains(event.target)) {
      modalCadastro.classList.add("d-none");
      document.body.classList.remove("no-scroll");
    }
  });

  // Fechar modal de doação clicando fora do conteúdo
  modalCausa.addEventListener("click", (event) => {
    if (!contentCausa.contains(event.target)) {
      modalCausa.classList.add("d-none");
      document.body.classList.remove("no-scroll");
    }
  });

  // Envio do formulário de cadastro
  contentCadastro.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("nomeCompleto").value.trim();
    const email = document.getElementById("email").value.trim();
    const instituicao = document.getElementById("instituicao").value.trim();
    const causa = document.getElementById("causa").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const motivo = document.getElementById("motivo").value.trim();

    // Validação simples dos campos
    if (!nome || !email || !instituicao || !causa || !endereco || !motivo) {
      alert("Por favor, preencha todos os campos antes de enviar.");
      return;
    }

    // Monta mensagem para WhatsApp
    const mensagem = `
*Olá, tudo bem?* Gostaria de me candidatar para ser um ponto de coleta. Seguem meus dados para cadastro:

*Nome completo:* ${nome}
*Email:* ${email}
*Instituição:* ${instituicao}
*Causa:* ${causa}
*Endereço:* ${endereco}
*Motivo:* ${motivo}
    `.trim();

    const numero = "555100000000";
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
    contentCadastro.reset();
    modalCadastro.classList.add("d-none");
    document.body.classList.remove("no-scroll");
  });

  // Cria e insere cards sugestão aleatórios (limitados a 3)
  const sugestaoContainer = document.querySelector('.sugestao .d-flex.flex-wrap.justify-content-center');

  if (typeof pontosDeColeta !== "undefined" && Array.isArray(pontosDeColeta) && sugestaoContainer) {
    const locaisAleatorios = embaralharArray(pontosDeColeta).slice(0, 3);
    const htmlCards = locaisAleatorios.map(criarCardSugestao).join('');
    sugestaoContainer.innerHTML = htmlCards;
  }

});
