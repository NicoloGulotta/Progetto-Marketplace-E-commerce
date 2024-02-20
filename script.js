const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZGY4NTljNDM3MDAwMTkzYzM2YzciLCJpYXQiOjE3MDg0NDk3NDAsImV4cCI6MTcwOTY1OTM0MH0.xLGvIWN7fzfLPJCNB_5LMbDmJppr4n_vBbQuTXL9LRk";

async function postData(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': key
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Nuovo elemento inserito:", responseData);
        return responseData;
    } catch (error) {
        console.error("Errore durante la richiesta POST:", error);
        throw error;
    }
}

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': key
            }
        });

        if (!response.ok) {
            throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }

        const responseData = await response.json();
        console.log(responseData);
        return responseData;
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
        throw error;
    }
}

function createProductCard(product) {
    const cardContainer = document.getElementById('card-container');

    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row', 'justify-content-around');

    const colDiv = document.createElement('div');
    colDiv.classList.add('col-auto', 'mb-4');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow');

    const cardImage = document.createElement('img');
    cardImage.classList.add('card-img-top');
    cardImage.src = product.imageUrl;
    cardImage.alt = product.name;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = product.name;

    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card-text');
    cardDescription.textContent = product.description;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = 'Price: $' + product.price;

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardDescription);
    cardBody.appendChild(cardPrice);

    card.appendChild(cardImage);
    card.appendChild(cardBody);

    colDiv.appendChild(card);
    rowDiv.appendChild(colDiv);

    cardContainer.appendChild(rowDiv);
}

async function renderProducts() {
    try {
        const products = await fetchData(apiUrl);
        products.forEach(product => {
            createProductCard(product);
        });
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
    }
}

// Dati del nuovo elemento da inserire
const newProduct = {
    name: "Prova con img",
    description: "Descrizione del Nuovo Prodotto",
    imageUrl: "https://images.pexels.com/photos/11867612/pexels-photo-11867612.jpeg",
    price: 99.99,
};

// Inserisci il nuovo prodotto
postData(apiUrl, newProduct)
    .then(() => {
        // Dopo aver inserito il nuovo prodotto, aggiorna la visualizzazione dei prodotti
        renderProducts();
    })
    .catch(error => {
        console.error("Errore durante l'inserimento del nuovo elemento:", error);
    });
