const createCharger = async (charger) => {
    try {
        const response = await fetch("https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/chargers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(charger),
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getAllChargers = async () => {
    try {
        const response = await fetch("https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/chargers", {
            method: "GET",
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getChargerById = async (chargerId) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/chargers/${chargerId}`, {
                method: "GET",
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const updateCharger = async (chargerChanged) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/chargers/${chargerChanged.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(chargerChanged),
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteCharger = async (chargerId) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/chargers/${chargerId}`, {
                method: "DELETE",
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export default {
    createCharger,
    getAllChargers,
    getChargerById,
    updateCharger,
    deleteCharger
}