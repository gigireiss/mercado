if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready)
} else {
    ready()
}

function ready() {
    const removeProductButtons = document.getElementsByClassName("remove-product-button")
    for (var i = 0; i < removeProductButtons.length; i++) {
      removeProductButtons[i].addEventListener("click", removeProduct)
    }

  const quantityInputs = document.getElementsByClassName("product-qtd-input")
    for (var i = 0; i < quantityInputs.length; i++) {
    quantityInputs[i].addEventListener("change", checkIfInputIsNull)
  }

  const addToCartButtons = document.getElementsByClassName("botao-carrinho")
  for (var i =0; i < addToCartButtons.length; i++) {
    addToCartButtons[i].addEventListener("click", addProductCart)
  }
}

function checkIfInputIsNull (event) {
    if (event.target.value == '0') {
        event.target.parentElement.parentElement.remove()
    }


    updateTotal()
}



function addProductCart(event) {
    const button = event.target
    const productInfos = button.parentElement.parentElement
    const productImage = productInfos.getElementsByClassName("product-image")[0].src
    const productTitle = productInfos.getElementsByClassName("product-title")[0].innerText
    const productPrice = productInfos.getElementsByClassName("product-price")[0].innerText

    let newCartProduct = document.createElement("tr")
    newCartProduct.classList.add("cart-product")

    newCartProduct.innerHTML = 
    `
      <td class="product-identification"> 
        <img class="cart-product-image" src="${productImage}" alt="${productTitle}">
        <strong class="cart-product-title">${productTitle}</strong>
    </td>
    <td> 
        <span class="cart-product-price">${productPrice}</span>
    </td>
     <td>
        <input class="product-qtd-input" type="number" value="1" min="0">
        <button class="remove-product-button" type="button">Remover</button>
     </td>
    `

    const tablebody = document.querySelector(".cart-table tbody")
    tablebody.append(newCartProduct)

    updateTotal("")
    newCartProduct.getElementsByClassName("product-qtd-input")[0].addEventListener("change", checkIfInputIsNull)
    newCartProduct.getElementsByClassName("remove-product-button")[0].addEventListener("click", removeProduct)
}

function removeProduct(event) {
    event.target.parentElement.parentElement.remove()
    updateTotal()
}

function updateTotal() {
let totalAmount = 0
const cartProducts = document.getElementsByClassName("cart-product")
for (var i = 0; i < cartProducts.length; i++) {
  //  console.log(cartProducts[i])
    const productPrice = cartProducts[i].getElementsByClassName("cart-product-price")[0].innerText.replace("R$", "").replace(",", ".")
    const productQuantity = cartProducts[i].getElementsByClassName("product-qtd-input")[0].value


    totalAmount += productPrice * productQuantity
} 
totalAmount = totalAmount.toFixed(2)
totalAmount = totalAmount.replace(".", ",")
document.querySelector(".cart-total-container span").innerText = "R$" + totalAmount
}

async function cadastrar(event) {
  event.preventDefault();

  const name     = document.getElementById('name').value;
  const email    = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const data = {name,email,password}

  const response = await fetch('http://localhost:3001/usuario/cadastrar', {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })

  const results = await response.json();
  console.log(results)
  if(results.success) {
    alert(results.message)
    window.location.href = "./pag3.html"
  } else {
    alert(alert.message)
  }
}

async function logar(event) {
  event.preventDefault();

  const email = document.getElementById('email_login').value;
  const password = document.getElementById('password_login').value;

  const data = { email, password }

  const response = await fetch("http://localhost:3001/login", {
    method: "POST",
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  })

  let results = await response.json();

  if(results.success) {
    let userData = results.data;

    localStorage.setItem('informacoes', JSON.stringify(userData))

    window.location.href = "login.cadastro.html"

    let html = document.getElementById('informacoes')
    let dados = JSON.parse(localStorage.getItem('informacoes'))


    alert(results.message)
    window.location.href = "./pag3.html"

  } else {
    alert(results.message)
  }
}
const favoriteButtons = document.querySelectorAll('.fa-star');

favoriteButtons.forEach(button => {
  button.addEventListener('click', event => {
    event.preventDefault(); // evita que o navegador siga o link
    button.classList.toggle('active');
  });
});

function sair(){
  localStorage.removeItem('informacoes')
  window.location.href = "login.cadastro.html"
}

window.addEventListener ("load", () => {
  if (localStorage.getItem('informações')) {
    let html = document.getElementById('informações')
    let dados = JSON.parse(localStorage.getItem('informações'))
  }
})
