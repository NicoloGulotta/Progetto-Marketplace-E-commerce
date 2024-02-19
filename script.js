const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const Key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzY2RmYjI0ZjYwNTAwMTkzN2Q1MTYiLCJpYXQiOjE3MDgzNzk2NDMsImV4cCI6MTcwOTU4OTI0M30.JoGncqr88_5TKFYn0meVan3AO1uN1v8tccKAPQNNs4E";

async function fetchData(url) {
    try {
        const response = await fetch(url, {
            headers: { "Authorization": Key }
        });
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

function renderCard(card) {
    const cardItemBox = document.createElement('div');
    cardItemBox.classList.add('card-item', 'bg-dark', 'text-light', 'card', 'col-6', 'col-md-4', 'col-lg-3', 'm-1', 'p-2', 'shadow-lg');
    cardItemBox.style.width = '15rem';

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = card.title;

    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card-text');
    cardPrice.textContent = 'Price: ' + card.price + '$';

    // Aggiungi i componenti creati al box della carta
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardPrice);
    cardItemBox.appendChild(cardBody);

    return cardItemBox;
}

// Esempio di utilizzo
const cardContainer = document.getElementById('card-container'); // Sostituisci con l'ID del tuo container
const cardsUrl = apiUrl + "getAll";
fetchData(cardsUrl)
    .then(cards => {
        // Aggiungi le carte al tuo DOM
        cards.forEach(card => {
            const cardElement = renderCard(card);
            cardContainer.appendChild(cardElement);
        });
    })
    .catch(error => {
        console.error(error);
    });
