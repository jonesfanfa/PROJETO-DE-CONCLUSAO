const url = 'https://api.mercadolibre.com/sites/MLB/search?q=notebooks';

function fetchProdutos() {
    fetch(url)
        .then(response => response.json())

        .then(data => {
            if (data.results) {
                const productList = document.querySelector('#product-list');

                const limitadaResult = data.results.slice(0,12);
                
                limitadaR.forEach(product => {
                  const productHtml = `
                  <div class="col-md-4">

                <div class="card">
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">R$ ${product.price.toFixed(2)}</p>        
                <button class="btn btn-primary add-to-cart"       
                data-id="${product.id}"      
                data-title="${product.title}"        
                data-price="${product.price}"        
                data-thumbnail="${product.thumbnail}">Comprar</button>
                </div>
                 `;
 
 productList.insertAdjacentHTML('beforeend', productHtml);

             });
        }
    })

    .catch(error => {
        console.error('Erro ao buscar produtos:', error);
    });
}


