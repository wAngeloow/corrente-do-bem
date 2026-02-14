// Envio do formulário "Para quem doar"
contentCausa.addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o comportamento padrão do formulário (recarregar a página)

  // Obtém o valor da cidade selecionada
  const cidade = document.getElementById("cidade").value;

  // Obtém a causa selecionada (input do tipo radio)
  const causaSelecionada = document.querySelector('input[name="causaDoacao"]:checked')?.value;

  // Validação simples para garantir que ambos os campos foram preenchidos
  if (!cidade || !causaSelecionada) {
    alert("Selecione uma cidade e uma causa.");
    return;
  }

  // Monta a URL com os parâmetros codificados para redirecionar para a página de pontos disponíveis
  const url = `./pontos-disponiveis.html?cidade=${encodeURIComponent(cidade)}&causa=${encodeURIComponent(causaSelecionada)}`;

  // Redireciona o usuário para a URL montada
  window.location.href = url;
});
