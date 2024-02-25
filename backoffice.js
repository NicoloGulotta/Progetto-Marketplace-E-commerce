const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ2NjgyN2EzM2ZjOTAwMTk2NTg1NjYiLCJpYXQiOjE3MDg1NTAxODMsImV4cCI6MTcwOTc1OTc4M30.JcSkmZkbzYeZAt90Q2nqEHt8Qu28GHsXQHvZF4JeFa4";
const infoBox = document.getElementById('info-container');
let currentProductId;

window.onload = function () {

    function populateForm(product) {
        document.getElementById('recipient-name').value = product.name;
        document.getElementById('recipient-description').value = product.description;
        document.getElementById('recipient-brand').value = product.brand;
        document.getElementById('recipient-imageUrl').value = product.imageUrl;
        document.getElementById('recipient-price').value = product.price;
    }

    document.getElementById('cancelEditBtn').addEventListener('click', function () {
        document.getElementById('editFormContainer').style.display = 'none';
    });

    document.getElementById('confirmEditBtn').addEventListener('click', function () {
        const newName = document.getElementById('recipient-name').value;
        const newDescription = document.getElementById('recipient-description').value;
        const newBrand = document.getElementById('recipient-brand').value;
        const newImageUrl = document.getElementById('recipient-imageUrl').value;
        const newPrice = document.getElementById('recipient-price').value;

        const updatedProductData = {
            name: newName,
            description: newDescription,
            brand: newBrand,
            imageUrl: newImageUrl,
            price: newPrice
        };

        Editpost(currentProductId, updatedProductData);
        document.getElementById('editFormContainer').style.display = 'none';
    });

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
        const description = document.getElementById('recipient-description').value;
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
                alert("Prodotto aggiunto con successo!");
                postData();
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
        cardBrand.textContent = 'Brand: ' + product.brand;

        const cardDesc = document.createElement('p');
        cardDesc.classList.add('card-text');
        cardDesc.textContent = product.description;

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('card-text');
        cardPrice.textContent = 'Price: $' + product.price;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger', 'mx-2');
        deleteButton.textContent = 'Cancella';
        deleteButton.addEventListener('click', function () {
            const productId = product._id;
            postDelete(productId);
        });

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary');
        editBtn.textContent = 'Modifica';
        editBtn.addEventListener('click', function () {
            currentProductId = product._id;
            populateForm(product);
            document.getElementById('editFormContainer').style.display = 'block';
        });

        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardBrand);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(deleteButton);
        cardBody.appendChild(editBtn);

        const card = document.createElement('div');
        card.appendChild(cardBody);
        rowDiv.appendChild(card);
        infoBox.appendChild(rowDiv);
    }

    function postDelete(productId) {
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
                alert("Prodotto eliminato con successo!");
                // Aggiungi la logica aggiuntiva necessaria dopo aver eliminato un prodotto
            })
            .catch(error => {
                console.error('Errore durante la richiesta DELETE:', error);
            });
    }

    async function putData(url, data) {
        try {
            const response = await fetch(url, {
                method: 'PUT',
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

            console.log("Elemento modificato:", responseData);
            return responseData;
        } catch (error) {
            console.error("Errore durante la richiesta PUT:", error);
            throw error;
        }
    }

    function Editpost(productId, newData) {
        putData(apiUrl + productId, newData)
            .then(responseData => {
                alert("Prodotto modificato con successo!");
                // Aggiungi la logica aggiuntiva necessaria dopo aver modificato un prodotto
            })
            .catch(error => {
                console.error(error.status);
            });
    }
};
