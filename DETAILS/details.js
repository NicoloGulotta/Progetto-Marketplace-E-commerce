const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2NjgyN2EzM2ZjOTAwMTk2NTg1NjYiLCJpYXQiOjE3MDg1NTAxODMsImV4cCI6MTcwOTc1OTc4M30.JcSkmZkbzYeZAt90Q2nqEHt8Qu28GHsXQHvZF4JeFa4";
const CardDetailBox = document.getElementById('Card-box');
const paramObj = new URLSearchParams(window.location.search);
let myPostId = paramObj.get("_id");
console.log('myPostId:', myPostId);
document.addEventListener('DOMContentLoaded', function () {
    createDetailCard();
});

async function createDetailCard() {
    try {
        if (myPostId) {
            const res = await fetch(apiUrl + myPostId, {
                method: 'GET',
                headers: {
                    'Authorization': key,
                    'Content-Type': 'application/json'
                }
            });

            const Card = await res.json();
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('bg-dark','text-light', 'card', 'col-12', 'm-1', 'p-2', 'shadow-lg');
            rowDiv.style.width = '300px';
           
            


            const cardImage = document.createElement('img');
            cardImage.classList.add('card-img-top');
            cardImage.src = Card.imageUrl;
            cardImage.alt = Card.name;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'font-weight-bold');
            cardTitle.textContent = Card.name;

            const cardBrand = document.createElement('p');
            cardBrand.classList.add('card-text');
            cardBrand.textContent = 'Brand: ' + Card.brand;

            const cardDesc = document.createElement('p');
            cardDesc.classList.add('card-text');
            cardDesc.textContent ='Description: ' +  Card.description;

            const cardPrice = document.createElement('p');
            cardPrice.classList.add('card-text');
            cardPrice.textContent = 'Price: $' + Card.price;

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardBrand);
            cardBody.appendChild(cardDesc);
            cardBody.appendChild(cardPrice);

            const card = document.createElement('div');
            card.appendChild(cardImage);
            card.appendChild(cardBody);

            rowDiv.appendChild(card);
            CardDetailBox.appendChild(rowDiv);
        } else {
            console.error('ID non valido o mancante nella query string');
        }
    } catch (err) {
        console.error(err);
    }
}
