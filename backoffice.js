const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2NjgyN2EzM2ZjOTAwMTk2NTg1NjYiLCJpYXQiOjE3MDg1NTAxODMsImV4cCI6MTcwOTc1OTc4M30.JcSkmZkbzYeZAt90Q2nqEHt8Qu28GHsXQHvZF4JeFa4";
const infoBox = document.getElementById('info-container');
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
            createinfo(product);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });

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
document.getElementById('addBtn').addEventListener('click', function () {
    const name = document.getElementById('recipient-name').value;
    const description = document.getElementById('recipient-descriptioin').value;
    const brand = document.getElementById('recipient-brand').value;
    const imageUrl = document.getElementById('recipient-imageUrl').value;
    const price = document.getElementById('recipient-price').value;

    const productData = {
        name: name,
        description: description,
        brand: brand,
        imageUrl: imageUrl,
        price: price
    };

    postData(apiUrl, productData)
        .then(responseData => {
            alert("prodotto aggiunto")
            console.log("Prodotto aggiunto:", responseData);
        })
        .catch(error => {
            console.error(error.status);
        });
});

function createinfo(product) {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('book-item', 'bg-dark', 'text-light', 'card', 'col-6', 'col-md-4', 'col-lg-3', 'm-1', 'p-2', 'shadow-lg');
    rowDiv.style.width = '15rem';
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

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'mx-2');
    deleteButton.textContent = 'Cancella';
    deleteButton.addEventListener('click', function () {
        const productId = product._id;
        handleDelete(productId);
    });

    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary');
    editButton.textContent = 'Modifica';
    editButton.addEventListener('click', function () {
        handleEdit(product._id);
    });

    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardBrand);
    cardBody.appendChild(cardPrice);
    cardBody.appendChild(deleteButton);
    cardBody.appendChild(editButton);
    const card = document.createElement('div');
    card.appendChild(cardBody);
    rowDiv.appendChild(card);
    infoBox.appendChild(rowDiv);
}

function handleDelete(productId) {

    fetch(apiUrl + productId, {
        method: 'DELETE',
        headers: {
            'Authorization': key,
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Errore HTTP! Stato: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Product deleted:', data);
      
        })
        .catch(error => {
            console.error('Errore durante la richiesta DELETE:', error);
        });
}

function handleEdit(productId) {
    console.log('Editing with ID:', productId);
}
//aggiungere sezione modifica