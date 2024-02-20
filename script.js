const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZGY4NTljNDM3MDAwMTkzYzM2YzciLCJpYXQiOjE3MDg0NDk3NDAsImV4cCI6MTcwOTY1OTM0MH0.xLGvIWN7fzfLPJCNB_5LMbDmJppr4n_vBbQuTXL9LRk";

// Funzione per inviare una richiesta POST e aggiungere un nuovo prodotto
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
            const errorMessage = await response.text();
            throw new Error(`Errore HTTP! Stato: ${response.status}, Messaggio: ${errorMessage}`);
        }

        const responseData = await response.json();
        console.log("Nuovo elemento inserito:", responseData);
        return responseData;
    } catch (error) {
        console.error("Errore durante la richiesta POST:", error);
        throw error;
    }
}

// Funzione per inviare una richiesta GET e ottenere i dati dei prodotti
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
        return responseData;
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
        throw error;
    }
}

// Funzione per creare la card di un prodotto e aggiungerla 
function CreateCard(product) {
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

// Funzione per rendere visibili i prodotti
async function renderProducts() {
    try {
        const products = await fetchData(apiUrl);
        products.forEach(product => {
            CreateCard(product);
        });
    } catch (error) {
        console.error("Errore durante la richiesta GET:", error);
    }
}

// Chiamata alla funzione per rendere visibili i prodotti
renderProducts();

// Funzione per generare un nuovo prodotto 
async function GeneratePost() {
    try {
        const newProduct = {
            name: "",
            description: "",
            imageUrl: "",
            price: ,
        };

        await postData(apiUrl, newProduct);
        await renderProducts();
    } catch (error) {
        console.error("Errore durante l'inizializzazione:", error);
    }
}
GeneratePost();

// Funzione per eliminare un prodotto
async function DeleteData(productId) {
    const deleteUrl = `${apiUrl}${productId}`;

    try {
        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': key
            }
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Errore HTTP! Stato: ${response.status}, Messaggio: ${errorMessage}`);
        }

        console.log("Elemento eliminato con successo");
    } catch (error) {
        console.error("Errore durante la richiesta DELETE:", error);
        throw error;
    }
}

// Funzione principale asincrona per eseguire operazioni
async function main() {
    try {
     
        // ID dell'elemento da eliminare
        const elementIdToDelete = ""; // Sostituisci con l'ID dell'elemento da eliminare

        // Tentativo di eliminare un elemento
        await DeleteData(elementIdToDelete);
    } catch (error) {
        console.error("Errore durante l'esecuzione del main:", error);
    }
}

// Chiamata alla funzione principale asincrona
main();
