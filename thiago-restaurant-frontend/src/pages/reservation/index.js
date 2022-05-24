import React from 'react';

import http from '../../config/axios';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ReservationForm from '../../components/ReservationForm';

import Logo from '../../assets/logo.png';


export default function Reservation() {
    const history = useHistory();
    const [user, setUser] = React.useState({});
    const [id, setId] = React.useState('');

    const [reservations, setReservations] = React.useState([]);
    const [refresh, setRefresh] = React.useState(0);

    const refreshData = () => setRefresh(state => !state);

    React.useEffect(() => {
        // Function get user
        function getUser() {
            const tokenUser = JSON.parse(localStorage.getItem('user'));
            if (!tokenUser) {
                return history.replace("/");
            }
            setUser(tokenUser);
            setId(localStorage.getItem('id'));
        }
        return getUser();
    }, []);

    React.useEffect(() => {
        function getReservations() {
            http.get(`/reservation/${user._id}`).then(response => {
                setReservations(response.data);
            })
        }
        return user?._id ? getReservations() : null;
    }, [user._id, refresh]);


    function edit(reservation) {
        // Function edit reservation with component form.
        const reactSwal = withReactContent(Swal);
        reactSwal.fire({
            title: 'Edit reservation',
            html: <ReservationForm reservation={reservation} refreshData={refreshData} />,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                const data = { date, hour, adults, childrens, specialNotes };
                http.put(`reservation/${reservation._id}`, data).then(response => {
                    Swal.fire({
                        title: 'Request successfully sent!',
                        icon: 'success'
                    }).then(() => {
                        history.replace('/reservation');
                    });

                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    function show(reservation) {
        // Function for displaying data
        const reactSwal = withReactContent(Swal);
        reactSwal.fire({
            title: 'Show reservation',
            html: (
                <div className="container pt-5 text-left">
                    <p>User: {reservation.user.firstName} {reservation.user.lastName}</p>
                    <p>Date: {reservation.date}</p>
                    <p>Hour: {reservation.hour}</p>
                    <p>Adults: {reservation.adults}</p>
                    <p>Childrens: {reservation.childrens}</p>
                    <p>Special Notes: {reservation.specialNotes || '-'}</p>
                </div>
            ),
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText: "Edit reservation",
            confirmButtonColor: "orange"
        }).then((result) => {
            if (result.isConfirmed) {
                edit(reservation);
            }
        });
    }

    function destroy(reservation) {

        // Function for destroy reservation
        // check if you are sure 
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                http.delete(`reservation/${reservation._id}`, {
                    headers: { 'Authorization': reservation.user._id }
                }).then(response => {
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    );
                    setReservations(state => state.filter(x => x._id != reservation._id))
                    refreshData();
                })

            }
        })

    }

    return (
        <div className="container pt-5">

            <div className="logo text-center m-5" >

                <img onClick={() => history.push("/")} src={Logo} />

            </div>

            <div className="row">
                <div className="col-8">
                    <h1 className="fw-bold">My Reservations: {user.firstName} {user.lastName}</h1>
                </div>
                <div className="col-4">
                    <button className="btn btn-success" onClick={() => history.push("/")}>New reservation</button>
                    <button className="btn btn-link ml-5" onClick={() => {
                        localStorage.removeItem("user");
                        history.replace("/");
                    }}>Logout</button>
                </div>
            </div>

            <br />

            <div className="table-responsive">

                {/* Table CRUD */}

                <table className="table table-bordered" style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>User</th>
                            <th>Date</th>
                            <th>Hour</th>
                            <th>Adults</th>
                            <th>Childrens</th>
                            <th>Special Notes</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* check that it is not empty */}
                        
                        {reservations.length ? reservations.map((data, index) => (
                            <tr key={index}>
                                <td>{data._id}</td>
                                <td>{data.user.firstName} {data.user.lastName}</td>
                                <td>{data.date}</td>
                                <td>{data.hour}</td>
                                <td>{data.adults}</td>
                                <td>{data.childrens}</td>
                                <td>{data.specialNotes || "-"}</td>
                                <td className="text-center">
                                    <div className="btn-group">
                                        <button className="btn btn-info" onClick={() => show(data)}><FaEye /></button>
                                        <button className="btn btn-warning" onClick={() => edit(data)}><FaEdit /></button>
                                        <button className="btn btn-danger" onClick={() => destroy(data)}><FaTrash /></button>
                                    </div>
                                </td>
                            </tr>
                        )) : (
                                <tr><td colSpan="7" align="center">Empty reservations.</td></tr>
                            )}
                    </tbody>
                </table>
            </div>

        </div>
    )
}