const divProducts = document.querySelector("#product-div")
const divCesto = document.querySelector("#produtos-selecionados")
const total = document.querySelector("#total")

if (!localStorage.getItem("produtos-selecionados")) {
    localStorage.setItem("produtos-selecionados", JSON.stringify([]))
}

const criarProduto = (produto) => {
    let newArticle = document.createElement("article")
    newArticle.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}">
        <p>${produto.description}</p>
        <span>${produto.price.toFixed(2)} €</span>
    `

    let botao = document.createElement("button")
    botao.textContent = "+ Adicionar ao cesto"
    botao.addEventListener("click", () => {
        let lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
        lista.push(produto)
        localStorage.setItem("produtos-selecionados", JSON.stringify(lista))
        atualizaCesto()
    })

    newArticle.append(botao)
    return newArticle
}

const criarProdutoCesto = (produto) => {
    let newArticle = document.createElement("article")
    newArticle.innerHTML = `
        <h3>${produto.title}</h3>
        <img src="${produto.image}" alt="${produto.title}">
        <p>${produto.price.toFixed(2)} €</p>
    `

    let botao = document.createElement("button")
    botao.textContent = "Remover"
    botao.addEventListener("click", () => {
        let lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
        let index = lista.findIndex((p) => p.id === produto.id)

        if (index !== -1) {
            lista.splice(index, 1)
            localStorage.setItem("produtos-selecionados", JSON.stringify(lista))
            atualizaCesto()
        }
    })

    newArticle.append(botao)
    return newArticle
}

const renderizarProdutos = (produtos) => {
    divProducts.replaceChildren()
    produtos.forEach((p) => divProducts.append(criarProduto(p)))
}

const atualizaCesto = () => {
    let lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
    divCesto.replaceChildren()

    lista.forEach((p) => divCesto.append(criarProdutoCesto(p)))

    if (lista.length === 0) {
        divCesto.textContent = "O cesto está vazio."
    }

    let precoTotal = lista.reduce((soma, p) => soma + p.price, 0)
    total.textContent = `Total: ${precoTotal.toFixed(2)} €`
}

renderizarProdutos(produtos)
atualizaCesto()
