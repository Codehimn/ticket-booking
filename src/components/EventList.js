import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EventList = ({ events, onSelectEvent }) => (
    <div className="container mt-5">
        <h1>Eventos</h1>
        <ul className="list-group">
            {events.map(event => (
                <li key={event.id} className="list-group-item" onClick={() => onSelectEvent(event)}>
                    <img src={event.imageUrl} alt={event.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                    {event.name} - {event.date}
                    <span className="badge badge-primary ml-2">Max Entradas: {event.maxTickets}</span>
                </li>
            ))}
        </ul>
    </div>
);

export default EventList;
