import React from 'react';
import http from '../../config/axios';
import Swal from 'sweetalert2';

// Component form using another pages
export default function ReservationForm({ reservation, refreshData}) {

    const [date, setDate] = React.useState(reservation.date);
    const [hour, setHour] = React.useState(reservation.hour);
    const [adults, setAdults] = React.useState(reservation.adults);
    const [childrens, setChildrens] = React.useState(reservation.childrens);
    const [specialNotes, setSpecialNotes] = React.useState(reservation.specialNotes);

    function submitForm(e) {
        e.preventDefault();
        const data = { date, hour, adults, childrens, specialNotes };

        // updates the reservation in the system
        http.put(`reservation/${reservation._id}`, data).then(response => {
            Swal.fire({
                title: 'Reservation update success!', 
                icon: 'success'
            });
            refreshData();            
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <form className="form" onSubmit={submitForm}>
            <input
                className="form-control"
                name="date"
                type="date"
                placeholder="Prefrerred Date"
                value={date}
                onChange={e => setDate(e.currentTarget.value)}
                required />
            <input
                className="form-control"
                name="hour"
                type="time"
                placeholder="Prefrerred Hour"
                value={hour}
                onChange={e => setHour(e.currentTarget.value)}
                required />
            <input
                className="form-control"
                name="adults"
                type="number"
                placeholder="Adults"
                value={adults}
                onChange={e => setAdults(e.currentTarget.value)} 
                required />
            <input
                className="form-control"
                name="childrens"
                type="number"
                placeholder="Childrens"
                value={childrens}
                onChange={e => setChildrens(e.currentTarget.value)} />
            <textarea
                className="form-control"
                name="specialNotes"
                rows="4"
                placeholder="Special notes or alergies"
                value={specialNotes}
                onChange={e => setSpecialNotes(e.currentTarget.value)}></textarea>
            <button className="btn btn-success float-right">Save changes</button>
        </form>
    )
}