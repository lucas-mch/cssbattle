// Função para abrir o modal com os detalhes do card
document.addEventListener('DOMContentLoaded', function () {
  function openModal(details) {
    var modal = document.getElementById("myModal");
    var modalDetails = document.getElementById("modalDetails");

    // Limpa o conteúdo anterior do modal
    modalDetails.innerHTML = "";

    // Adiciona os detalhes ao modal
    modalDetails.innerHTML = details;

    // Mostra o modal
    modal.style.display = "block";
  }

  // Função para fechar o modal
  function closeModal() {
    var modal = document.getElementById("cardDetails");
    modal.style.display = "none";
  }

  // Adiciona evento de clique para fechar o modal ao clicar no botão de fechar
  document.querySelector(".close").addEventListener("click", closeModal);

  // Adiciona evento de clique para fechar o modal ao clicar fora do modal
  // window.addEventListener("click", function (event) {
  //   console.log('window global event listener.')
  //   var modal = document.getElementById("cardDetails");
  //   if (event.target == modal) {
  //     closeModal();
  //   }
  // });

  // Exemplo de uso do componente para abrir o modal com detalhes
  function openCardModal(cardId) {
    // Aqui você pode inserir a lógica para obter os detalhes do card com base no ID
    var details = "Detalhes do card " + cardId;
    openModal(details);
  }

});
