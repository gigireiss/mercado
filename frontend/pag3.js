document.addEventListener("DOMContentLoaded", () =>{

    let userData = JSON.parse(localStorage.getItem('informacoes'))
    console.log(userData);

    if (userData.perfil === "admin") {

        let html = document.querySelector('#informacoes')

        html.innerHTML = `<div style="display: flex; flex-direction: column; align-items: end">
         nome: ${userData.name} email: ${userData.email} Perfil: ${userData.perfil}
        </div>`

        html.style.display = 'block'

        userData.perfil == 'admin'
        ? document.getElementById('cadastrar_produto').style.display = 'block'
        : document.getElementById('cadastrar_produto').style.display = 'none'
    }
})
async function cadastrarProduto(event) {
    event.preventDefault()

    const title = document.getElementById('title').value
    const price = Number(document.getElementById('price').value)
    const file = document.getElementById('file').files[0]

    let formData = new FormData();

    formData.append('title', title)
    formData.append('price', price)
    formData.append('file', file)

    const response = await fetch('http://localhost:3000/produto/cadastrar', {
        method: "POST",
        boby: formData
    })

const results = await response.json()

    if (results.success) {
        let productData = results.data;
        const images = 'http://localhost:3000/uploads/';
        let html = document.getElementById('card_produto');
    
        productData.forEach(product => {
            console.log(productData);
            let card = `
            <div
                style="display: flex; flex-direction: column; justify-content: center; align-items: center; border: solid 1px #ccc; padding: 10px;">
                <img src="${images + product.image}" alt="" width="50px" height="50px">
                <p>${product.title}</p>
                <span>R$ ${product.price}</span>
                <button onclick='formEditarProduto(${JSON.stringify(product)})'>Editar</button>
            </div>
            `;
            html.innerHTML += card;
        });    
        
    } else {
        alert(results.message)
    }
}

function formEditarProduto(product) {
    console.log(product)
    let modal = document.getElementById('editar_produto')
    let images = 'http://localhost:3000/uploads/'

    document.getElementById('id_produto').value = product.id
    document.getElementById('editar_titulo').value = product.title
    document.getElementById('editar_preco').value = product.price
    document.getElementById('imagem_produto').src = images + product.image

    modal.style.display = "block"
}

async function atualizarProduto(event) {
    event.preventDefault()

    
let id = document.getElementById('id_produto').value
let titulo = document.getElementById('editar_titulo').value
let preco = document.getElementById('editar_preco').value
let file = document.getElementById('editar_imagem').files[0]

let formData = new FormData()

formData.append('titulo', titulo)
formData.append('preco', preco)
formData.append('file', file)

const response = await fetch(`http://localhost:3000/produto/${id}`, {
    method: "PUT",
    body: formData
})

const results = await response.json()

if(results.success) {
  alert(results.message)
} else {
  alert(results.message)
}

} 