export const fetchEvents = async () => {
    return [
        { id: 1, name: 'Fiesta en la Discoteca', date: '2024-06-01' },
        { id: 2, name: 'Cena en el Restaurante', date: '2024-06-02' },
    ];
};

export const submitReservation = async (reservation) => {
    // Simular un retraso de red
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ ...reservation, eventName: reservation.eventId === 1 ? 'Fiesta en la Discoteca' : 'Cena en el Restaurante' });
        }, 1000);
    });
};
