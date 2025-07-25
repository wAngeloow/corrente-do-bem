document.addEventListener("DOMContentLoaded", function () {
  // Obtém parâmetros 'cidade' e 'causa' da URL
  const urlParams = new URLSearchParams(window.location.search);
  const cidade = urlParams.get("cidade");
  const causa = urlParams.get("causa");

  // Seleciona o container onde os cards serão exibidos
  const containerCards = document.querySelector(".d-flex.flex-wrap.justify-content-center.gap-4");

  // Verifica se os parâmetros cidade e causa foram informados
  if (!cidade || !causa) {
    containerCards.innerHTML = "<p class='text-center'>Por favor, volte e selecione uma cidade e uma causa.</p>";
    return;
  }

  // Filtra os pontos de coleta com base na cidade e causa
  const pontosFiltrados = pontosDeColeta.filter(
    ponto => ponto.cidade === cidade && ponto.causa === causa
  );

  // Caso não haja pontos filtrados, exibe mensagem apropriada
  if (pontosFiltrados.length === 0) {
    containerCards.innerHTML = `
      <div class="d-flex flex-column align-items-center justify-content-center text-center w-100" style="min-height: 15vh;">
        <i class="fa-solid fa-face-frown fs-1 mb-3" style="color: #000000;"></i>
        <p class="fs-5">Nenhum ponto de coleta encontrado para ${causa} em ${cidade}.</p>
      </div>
    `;
    return;
  }

  // Limpa o container para adicionar os novos cards
  containerCards.innerHTML = "";

  // Para cada ponto filtrado, cria um card e adiciona ao container
  pontosFiltrados.forEach(ponto => {
    const card = document.createElement("article");
    card.className = "card-sugestao d-flex flex-column rounded-2";

    card.innerHTML = `
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
    `;

    containerCards.appendChild(card);
  });
});
