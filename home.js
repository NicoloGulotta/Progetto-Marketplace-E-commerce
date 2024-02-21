const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2NjgyN2EzM2ZjOTAwMTk2NTg1NjYiLCJpYXQiOjE3MDg1NTAxODMsImV4cCI6MTcwOTc1OTc4M30.JcSkmZkbzYeZAt90Q2nqEHt8Qu28GHsXQHvZF4JeFa4";
const rowContainer =document.getElementById('card-container');
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

    const cardBrand = document.createElement('p');
    cardBrand.classList.add('card-text');
    cardBrand.textContent = 'Brand'+ product.brand;

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
//aggiungere sezione dettagli 