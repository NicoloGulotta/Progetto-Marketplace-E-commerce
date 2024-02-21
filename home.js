const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZGY4NTljNDM3MDAwMTkzYzM2YzciLCJpYXQiOjE3MDg0NDk3NDAsImV4CI6MTcwOTY1OTM0MH0.xLGvIWN7fzfLPJCNB_5LMbDmJppr4n_vBbQuTXL9LRk";
const rowContainer = document.getElementById('card-container');

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': key
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Errore HTTP! Stato: ${response.status}, Messaggio: ${errorMessage}`);
        }

        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
        throw error;
    }
}

async function renderData() {
    try {
        const products = await fetchData(apiUrl);
        products.forEach(product => {
            createCard(product);
        });
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
    }
}


function createCard(product, showButtons) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('book-item', 'bg-dark', 'text-light', 'card', 'col-6', 'col-md-4', 'col-lg-3', 'm-1', 'p-2', 'shadow-lg');
    rowDiv.style.width = '15rem';

    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = product.imageUrl;
    cardImage.alt = product.name;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title', 'font-weight-bold');
    cardTitle.textContent = product.name;

    const cardBrand = document.createElement('p');
    cardBrand.classList.add('card-text');
    cardBrand.textContent = product.brand;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = 'Price: $' + product.price;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardPrice);

    const card = document.createElement('div');
    card.appendChild(cardImage);
    card.appendChild(cardBody);

    rowDiv.appendChild(card);
    rowContainer.appendChild(rowDiv);
}
