import React from 'react';

import './style.css';
import http from '../../config/axios';
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import Logo from '../../assets/logo.png';
import Background from '../../assets/background.png';

export default function Home() {

    const [date, setDate] = React.useState('')
    const [hour, setHour] = React.useState('')
    const [adults, setAdults] = React.useState('')
    const [childrens, setChildrens] = React.useState('')
    const [specialNotes, setSpecialNotes] = React.useState('');

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [user, setUser] = React.useState('');
    const [step, setStep] = React.useState(0);

    const history = useHistory();

    // Function for save user data in local storage
    function storageUser(data) {
        localStorage.setItem('user', JSON.stringify(data));
    }

    // function submit in two steps.
    function submitForm(e) {
        e.preventDefault();
        if (step === 0) {
            setStep(1);
            return;
        } else {
            const user = { firstName, lastName, email, phone };
            const data = { date, hour, adults, childrens, specialNotes, user };
            http.post('reservation/create', data).then(response => {
                localStorage.setItem('id', data.id);
                storageUser(response.data.user);
                Swal.fire(
                    'Request successfully sent!',
                    'Thank you for your time',
                    'success'
                ).then(() => {
                    history.replace('/reservation');
                });

            }).catch(err => {
                console.log(err);
            });

        }
    }

    React.useEffect(() => {

        // Verify user in local storage
        function getUser() {
            const item = localStorage.getItem('user');
            if (item) {
                const user = JSON.parse(item);
                setFirstName(user.firstName);
                setLastName(user.lastName);
                setEmail(user.email);
                setPhone(user.phone);
                setUser(user);
            }
        }

        return getUser();
    }, []);

    function singIn() {

        if (user) {
            return history.push('/reservation')
        }

        Swal.fire({
            title: 'Sign in',
            text: 'Enter your e-mail.',
            input: 'email',
            confirmButtonText: 'Continue',
            showLoaderOnConfirm: true,
            preConfirm: (email) => {
                return http.post('reservation/sessions', { email }).then(result => {
                    if (!result.data) {
                        throw new Error(result.data.error)
                    }
                    return result.data;
                })
                    .catch(error => {
                        Swal.showValidationMessage(error?.response?.data?.error)
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
            .then(response => {
                if (response.value) {
                    storageUser(response.value);
                    history.push('/reservation');
                }
            })
    }
    return (
        <div className="content">
            <div className="img-cover" style={{ backgroundImage: `url(${Background})` }}>
                <h1>Enjoy the best food</h1>
            </div>
            <div className="form-wizard">
                <button className="btn btn-danger float-right" onClick={singIn}>{user ? 'My Reservations' : 'Sign in'}</button>
                <div className="logo" >
                    <img src={Logo} />
                </div>

                {step === 0 ? (
                    <form className="form" onSubmit={submitForm}>
                        <h1 className="fw-bold">Table Reservation Details</h1>
                        <div>
                            <label>Preferred Date</label>
                            <input
                                className="form-control"
                                name="date"
                                type="date"
                                placeholder="Preferred Date"
                                value={date}
                                onChange={e => setDate(e.currentTarget.value)}
                                required />
                        </div>
                        <div>
                            <label>Preferred Hour</label>
                            <input
                                className="form-control"
                                name="hour"
                                type="time"
                                placeholder="Preferred Hour"
                                value={hour}
                                onChange={e => setHour(e.currentTarget.value)}
                                required />
                        </div>
                        <div>
                            <label>Adults</label>
                            <input
                                className="form-control"
                                name="adults"
                                type="number"
                                placeholder="Adults"
                                value={adults}
                                onChange={e => setAdults(e.currentTarget.value)}
                                required
                                min={0}
                                max={10}
                                minLength={0}
                                maxLength={10}
                            />
                            
                        </div>
                        <div>
                            <label>Children</label>
                            <input
                                className="form-control"
                                name="childrens"
                                type="number"
                                placeholder="Children"
                                value={childrens}
                                min={0}
                                max={10}
                                minLength={0}
                                maxLength={10}
                                onChange={e => setChildrens(e.currentTarget.value)} />
                        </div>
                        <div>
                            <label>Special Notes</label>
                            <textarea
                                className="form-control"
                                name="specialNotes"
                                rows="4"
                                placeholder="Special notes or allergies"
                                value={specialNotes}
                                onChange={e => setSpecialNotes(e.currentTarget.value)}></textarea>
                        </div>
                        <button className="btn btn-success float-right">Next</button>
                    </form>
                ) : (
                        <form className="form" onSubmit={submitForm}>
                            <h1 className="fw-bold">Please fill with your details</h1>

                            <div>
                                <label>First Name</label>
                                <input
                                    className="form-control"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={e => setFirstName(e.currentTarget.value)}
                                    required />
                            </div>
                            <div>
                                <label>Last Name</label>
                                <input
                                    className="form-control"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={e => setLastName(e.currentTarget.value)}
                                    required />
                            </div>
                            <div>
                                <label>E-mail</label>
                                <input
                                    className="form-control"
                                    name="email"
                                    type="email"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={e => setEmail(e.currentTarget.value)}
                                    required />
                            </div>
                            <div>
                                <label>Phone</label>
                                <input
                                    className="form-control"
                                    name="phone"
                                    type="phone"
                                    placeholder="Phone"
                                    value={phone}
                                    onChange={e => setPhone(e.currentTarget.value)}
                                    required />
                            </div>

                            <div className="btn-group">
                                <button role="button" onClick={() => setStep(0)} className="btn btn-secondary float-right">Prev</button>
                                <button className="btn btn-success float-right">Reserve</button>
                            </div>
                        </form>
                    )}


            </div>
        </div>
    )
}