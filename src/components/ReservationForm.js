import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useForm } from 'react-hook-form';

const ReservationForm = ({ event, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmitForm = (data) => {
        onSubmit({ ...data, eventId: event.id });
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)} className="container mt-5">
            <h2>Reservar entrada para {event.name}</h2>
            <div className="form-group">
                <label>Nombre:</label>
                <input
                    type="text"
                    className="form-control"
                    {...register('name', { required: 'Nombre es requerido' })}
                />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
            </div>
            <div className="form-group">
                <label>Email:</label>
                <input
                    type="email"
                    className="form-control"
                    {...register('email', { required: 'Email es requerido' })}
                />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>
            <div className="form-group">
                <label>Cantidad:</label>
                <input
                    type="number"
                    className="form-control"
                    {...register('quantity', {
                        required: 'Cantidad es requerida',
                        min: { value: 1, message: 'Cantidad mínima es 1' },
                        max: { value: event.maxTickets, message: `Cantidad máxima es ${event.maxTickets}` }
                    })}
                />
                {errors.quantity && <p className="text-danger">{errors.quantity.message}</p>}
            </div>
            <button type="submit" className="btn btn-primary mt-3">Reservar</button>
        </form>
    );
};

export default ReservationForm;
