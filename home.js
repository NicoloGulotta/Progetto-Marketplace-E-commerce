const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2NjgyN2EzM2ZjOTAwMTk2NTg1NjYiLCJpYXQiOjE3MDg1NTAxODMsImV4cCI6MTcwOTc1OTc4M30.JcSkmZkbzYeZAt90Q2nqEHt8Qu28GHsXQHvZF4JeFa4";
const rowContainer = document.getElementById('card-container');

// Funzione per estrarre il parametro _id dalla query string
function getProductIdFromQueryString() {
  const paramObj = new URLSearchParams(window.location.search);
  return paramObj.get("_id");
}

// Funzione per ottenere e visualizzare i dettagli di un singolo prodotto
async function createDetailCard(productId) {
  try {
    const res = await fetch(apiUrl + productId, {
      method: 'GET',
      headers: {
        'Authorization': key,
        'Content-Type': 'application/json'
      }
    });

    const product = await res.json();

  } catch (err) {
    console.error(err);
  }
}

// Funzione per creare una card di prodotto
function createCard(product) {
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

  // const cardBrand = document.createElement('p');
  // cardBrand.classList.add('card-text');
  // cardBrand.textContent = 'Brand: ' + product.brand;

  // const cardDesc = document.createElement('p');
  // cardDesc.classList.add('card-text');
  // cardDesc.textContent = product.description;

  const cardPrice = document.createElement('p');
  cardPrice.classList.add('card-text');
  cardPrice.textContent = 'Price: $' + product.price;

  const DetailsBtn = document.createElement('a');
  DetailsBtn.classList.add('btn', 'btn-success', 'mx-2');
  DetailsBtn.textContent = 'Mostra dettagli';
  DetailsBtn.href = 'details.html?_id=' + product._id;
  DetailsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const productId = product._id;
    window.open(`details.html?_id=${productId}`, '_blank'); 
  });
  

  cardBody.appendChild(cardTitle);
  // cardBody.appendChild(cardBrand);
  // cardBody.appendChild(cardDesc);
  cardBody.appendChild(cardPrice);
  cardBody.appendChild(DetailsBtn);

  const card = document.createElement('div');
  card.appendChild(cardImage);
  card.appendChild(cardBody);

  rowDiv.appendChild(card);
  rowContainer.appendChild(rowDiv);
}

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': key,
    'Content-Type': 'application/json'
  }
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    data.forEach(product => {
      createCard(product);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });
