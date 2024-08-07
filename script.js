const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

// Função para buscar produtos
function fetchProdutos() {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                const productList = document.getElementById('product-list');

                // Limitar produtos até 12
                const limitadaResult = data.results.slice(0, 12);

                // Construção do HTML dos produtos
                let productsHtml = '';
                limitadaResult.forEach(product => {
                    productsHtml += `
                        <div class="col-md-3">
                            <div class="card">
                                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <p class="card-text">R$ ${product.price.toFixed(2)}</p>
                                    <button class="btn btn-primary add-cart"
                                        data-id="${product.id}"
                                        data-title="${product.title}"
                                        data-price="${product.price}"
                                        data-thumbnail="${product.thumbnail}">Comprar</button>
                                </div>
                            </div>
                        </div>
                    `;
                });

                // Adiciona o HTML
                productList.innerHTML = productsHtml;

                // Adiciona eventos aos botões
                document.querySelectorAll('.add-cart').forEach(button => {
                    button.addEventListener('click', (event) => {
                        const product = {
                            id: event.target.getAttribute('data-id'),
                            title: event.target.getAttribute('data-title'),
                            price: parseFloat(event.target.getAttribute('data-price')),
                            thumbnail: event.target.getAttribute('data-thumbnail')
                        };
                        addCart(product);
                    });
                });
            }
        })
        .catch(error => {
            console.error('Erro ao buscar produtos:', error);
        });
}

function addCart(product) {
    let cart = localStorage.getItem('cart');

    if (!cart) {
        cart = [];
    } else {
        cart = JSON.parse(cart);
    }

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Produto adicionado ao carrinho!');
}

function displayCartItens() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('total');
    const buttonCart = document.getElementById('buttonCart');

    // Recupera o carrinho do armazenamento local
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Carrinho vazio.</p>';
        totalContainer.innerHTML = '<p>Total: R$ 0,00</p>';
        return;
    }

    let cartHtml = '';
    let total = 0;
    
    cart.forEach(item => {
        cartHtml += `
            <div class="cart-item">
                <img src="${item.thumbnail}" alt="${item.title}" style="width: 100px;">
                <p>${item.title}</p>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
        `;
        total += item.price;
    });

    cartItemsContainer.innerHTML = cartHtml;
    totalContainer.innerHTML = `<p>Total: R$ ${total.toFixed(2)}</p>`;

    if (buttonCart) {
        buttonCart.addEventListener('click', () => checkout());
    } else {
        console.error('Botão de checkout não encontrado.');
    }
}

function checkout() {
    localStorage.removeItem('cart');
    alert('Compra finalizada.');
    window.location.href = 'index.html';
}

if (document.getElementById('product-list')) {
    document.addEventListener('DOMContentLoaded', fetchProdutos);
}

if (document.getElementById('cart-items')) {
    document.addEventListener('DOMContentLoaded', displayCartItens);
}
