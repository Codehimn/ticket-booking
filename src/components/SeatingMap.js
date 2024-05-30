import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const SeatingMap = ({ onSelect }) => {
    const [selectedSeat, setSelectedSeat] = useState(null);
    const seats = [
        { id: 1, name: 'Palco 1' },
        { id: 2, name: 'Palco 2' },
        { id: 3, name: 'Palco 3' },
        { id: 4, name: 'Palco 4' }
    ];

    const handleSelect = (seat) => {
        setSelectedSeat(seat);
        onSelect(seat);
    };

    return (
        <div className="container mt-5">
            <h2>Selecciona tu Palco</h2>
            <ul className="list-group">
                {seats.map((seat) => (
                    <li
                        key={seat.id}
                        className={`list-group-item ${selectedSeat === seat ? 'list-group-item-success' : ''}`}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleSelect(seat)}
                    >
                        {seat.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SeatingMap;
