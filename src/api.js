export const fetchEvents = async () => {
    try {
        const response = await fetch('https://your-api-endpoint.com/events'); // Replace with your actual API endpoint
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        return data.map(event => ({
            ...event,
            imageUrl: event.imageUrl || 'https://example.com/default-image.jpg', // Default image if not provided
            maxTickets: event.maxTickets || 10 // Default max tickets if not provided
        }));
    } catch (error) {
        console.error('Error fetching events:', error);
        // Handle errors gracefully, e.g., display an error message to the user
    }
};

export const submitReservation = async (reservation) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ...reservation,
                eventName: reservation.eventId === 1 ? 'Fiesta en la Discoteca' : 'Cena en el Restaurante',
                maxTickets: reservation.maxTickets || 10 // Default max tickets if not provided
            });
        }, 1000);
    });
};
