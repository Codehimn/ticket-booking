import React from 'react';

const EventList = ({ events, onSelectEvent }) => (
    <div>
        <h1>Eventos</h1>
        <ul>
            {events.map(event => (
                <li key={event.id} onClick={() => onSelectEvent(event)}>
                    {event.name} - {event.date}
                </li>
            ))}
        </ul>
    </div>
);

export default EventList;
