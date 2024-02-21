const apiUrl = "https://striveschool-api.herokuapp.com/api/product/";
const key = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQ0ZGY4NTljNDM3MDAwMTkzYzM2YzciLCJpYXQiOjE3MDg0NDk3NDAsImV4CI6MTcwOTY1OTM0MH0.xLGvIWN7fzfLPJCNB_5LMbDmJppr4n_vBbQuTXL9LRk";
const infoBox = document.getElementById('info-container');
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