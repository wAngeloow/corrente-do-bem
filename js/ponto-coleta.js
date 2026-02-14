// Função para obter valor de parâmetro na query string da URL
function getQueryParam(param) {
  const params = new URLSearchParams(window.location.search);
  return params.get(param);
}

// Atualiza dados do ponto de coleta na página ao carregar o DOM
window.addEventListener('DOMContentLoaded', () => {
  const id = getQueryParam('id');
  if (!id) return;

  // Procura o local pelo id
  const local = locais.find(l => l.id === id);
  if (!local) return;

  // Atualiza imagem do ponto
  const fotoElem = document.querySelector('.foto-ponto img');
  if (fotoElem) fotoElem.src = local.foto;

  // Atualiza nome da ONG
  const nomeElem = document.querySelector('.dados-ponto h3');
  if (nomeElem) nomeElem.textContent = local.nome;

  // Atualiza endereço e telefone de forma segura buscando ícones para identificar os elementos
  const divs = document.querySelectorAll('.dados-ponto > div.d-flex.gap-2');
  let enderecoElem, telefoneElem;

  divs.forEach(div => {
    const icon = div.querySelector('i');
    if (icon.classList.contains('fa-location-dot')) {
      enderecoElem = div.querySelector('p');
    } else if (icon.classList.contains('fa-phone')) {
      telefoneElem = div.querySelector('p');
    }
  });

  if (enderecoElem) enderecoElem.textContent = local.endereco;
  if (telefoneElem) telefoneElem.textContent = local.telefone;

  // Atualiza descrição
  const descricaoElem = document.querySelector('.dados-ponto div.d-flex p');
  if (descricaoElem) descricaoElem.textContent = local.descricao;

  // Atualiza mapa embedado
  const iframeMapa = document.querySelector('.mapa iframe');
  if (iframeMapa) iframeMapa.src = local.mapaEmbedUrl;
});

// Alternativamente, atualizar o detalhe do ponto de coleta (duplicado para algum contexto diferente)
const idPonto = getQueryParam('id');
const ponto = pontosDeColeta.find(p => p.id == idPonto);

if (ponto) {
  document.querySelector('.foto-ponto img').src = ponto.imagem;
  document.querySelector('.dados-ponto h3').textContent = ponto.nome;
  document.querySelector('.dados-ponto div:nth-child(2) p').textContent = ponto.endereco;
  document.querySelector('.dados-ponto div:nth-child(3) p').textContent = ponto.telefone;
  document.querySelector('.dados-ponto div:nth-child(4) p').textContent = ponto.descricao;
  document.querySelector('.mapa iframe').src = ponto.link;
} else {
  alert('Ponto de coleta não encontrado');
}

// Configura botão DOAR para abrir o endereço no Google Maps
document.addEventListener("DOMContentLoaded", () => {
  const botaoDoar = document.getElementById("botao-doar");
  if (!botaoDoar) return;

  botaoDoar.addEventListener("click", function () {
    const id = getQueryParam('id');
    if (!id) return;

    const ponto = pontosDeColeta.find(p => p.id == id);
    if (!ponto || !ponto.endereco) return;

    // Codifica o endereço para URL e abre no Google Maps
    const enderecoFormatado = encodeURIComponent(ponto.endereco);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${enderecoFormatado}`;
    window.open(mapsUrl, '_blank');
  });
});
