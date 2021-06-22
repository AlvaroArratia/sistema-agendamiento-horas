const createEvent = async (event) => {
    try {
        const response = await fetch("https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(event),
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getAllEvents = async () => {
    try {
        const response = await fetch("https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events", {
            method: "GET",
        });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const getEventById = async (eventId) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events/${eventId}`, {
                method: "GET",
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const updateEvent = async (eventChanged) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events/${eventChanged.id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(eventChanged),
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

const deleteEvent = async (eventId) => {
    try {
        const response = await fetch(
            `https://my-json-server.typicode.com/bastidiaaz/frontend-test-json-api/events/${eventId}`, {
                method: "DELETE",
            });
        console.log(response);
        return response.json();
    } catch (error) {
        console.error(error);
    }
};

export default {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
}