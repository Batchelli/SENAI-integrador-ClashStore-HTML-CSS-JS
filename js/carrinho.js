if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready) // Espera o documento ser carregado antes de executar a função ready
} else {
  ready() // Se o documento já estiver carregado, executa a função ready imediatamente
}

var totalAmount = "0,00"

function ready() {
  // Botão remover produto
  const removeCartProductButtons = document.getElementsByClassName("remove-product-button")
  for (var i = 0; i < removeCartProductButtons.length; i++) {
    removeCartProductButtons[i].addEventListener("click", removeProduct) // Adiciona um evento de clique a cada botão de remoção de produto
  }

  // Mudança valor dos inputs
  const quantityInputs = document.getElementsByClassName("product-qtd-input")
  for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull) // Adiciona um evento de mudança a cada input de quantidade de produto
  }

  // Botão add produto ao carrinho
  const addToCartButtons = document.getElementsByClassName("button-hover-background")
  for (var i = 0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductToCart) // Adiciona um evento de clique a cada botão de adicionar produto ao carrinho
  }

  // Botão comprar
  const purchaseButton = document.getElementsByClassName("purchase-button")[0]
  purchaseButton.addEventListener("click", makePurchase) // Adiciona um evento de clique ao botão de compra
}

function removeProduct(event) {
  event.target.parentElement.parentElement.remove() // Remove  a linha do carrinho)
  updateTotal() // Atualiza o valor total do carrinho
}

function checkIfInputIsNull(event) {
  if (event.target.value === "0") {
    event.target.parentElement.parentElement.remove() // Se o valor do input for zero, remove o elemento pai (ou seja, remove a linha do carrinho)
  }

  updateTotal() // Atualiza o valor total do carrinho
}

function addProductToCart(event) {
  const button = event.target
  const productInfos = button.parentElement.parentElement
  const productImage = productInfos.getElementsByClassName("product-image")[0].src
  const productName = productInfos.getElementsByClassName("product-title")[0].innerText
  const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

  const productsCartNames = document.getElementsByClassName("cart-product-title")
  for (var i = 0; i < productsCartNames.length; i++) {
    if (productsCartNames[i].innerText === productName) {
      productsCartNames[i].parentElement.parentElement.getElementsByClassName("product-qtd-input")[0].value++
      updateTotal() // Se o produto já estiver no carrinho, incrementa a quantidade e atualiza o valor total
      return
    }
  }

  let newCartProduct = document.createElement("tr")
  newCartProduct.classList.add("cart-product")

  newCartProduct.innerHTML =
    `
      <td class="product-identification">
        <img src="${productImage}" alt="${productName}" class="cart-product-image">
        <strong class="cart-product-title">${productName}</strong>
      </td>
      <td>
        <span class="cart-product-price">${productPrice}</span>
      </td>
      <td>
        <input type="number" value="1" min="0" class="product-qtd-input">
        <button type="button" class="remove-product-button">Remove</button>
      </td>
    `

  const tableBody = document.querySelector(".cart-table tbody")
  tableBody.append(newCartProduct) // Adiciona a nova linha de produto ao carrinho
  updateTotal() // Atualiza o valor total do carrinho

  newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct) // Adiciona um evento de clique ao botão de remoção do produto adicionado
  newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull) // Adiciona um evento de mudança ao input de quantidade do produto adicionado
}

function makePurchase() {
  if (totalAmount === "0,00") {
    alert("Your shopping cart is empty!") // Se o valor total do carrinho for zero, exibe um alerta informando que o carrinho está vazio
  } else {
    alert(
      `
        Thank you for your purchase!
        Order value: $${totalAmount}\n
        Come back later :)
      `
    )

    document.querySelector(".cart-table tbody").innerHTML = "" // Limpa o conteúdo do carrinho
    updateTotal() // Atualiza o valor total do carrinho
  }
}

// Atualizar o valor total do carrinho
function updateTotal() {
  const cartProducts = document.getElementsByClassName("cart-product")
  totalAmount = 0

  for (var i = 0; i < cartProducts.length; i++) {
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("$", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value

    totalAmount += productPrice * productQuantity // Calcula o valor total somando o preço do produto multiplicado pela quantidade
  }

  totalAmount = totalAmount.toFixed(2)
  totalAmount = totalAmount.replace(".", ",")
  document.querySelector(".cart-total-container span").innerText = "$" + totalAmount // Atualiza o valor total exibido no carrinho
}
