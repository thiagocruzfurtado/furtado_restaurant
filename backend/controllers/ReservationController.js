const Reservation = require('../models/Reservation');
const User = require('../models/User');
const express = require('express');
const router = express.Router();

// create CRUD routes using the express router
router.get('/', async (_request, response) => {
    try {
        const reservations = await Reservation.where().populate('user')
        return response.json(reservations);
    } catch (error) {
        return response.status(500).json({ error: 'An error has occurred!.' });
    }
})

router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const reservation = await Reservation.where({ user: id }).populate('user');
        return response.json(reservation);

    } catch (error) {
        return response.status(500).json({ error: 'An error has occurred!.' });
    }
})

// this route checks if the email exists and returns the user
router.post('/sessions', async (request, response) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
        if (user) {
            return response.json(user);
        }
        return response.status(404).json({ error: 'Not found email registered.' });

    } catch (error) {
        return response.status(500).json({ error: 'An error has occurred!.' });
    }
})

router.get('/show', async (request, response) => {
    try {
        const { id } = request.params;
        const reservation = await Reservation.findById(id).populate('user');
        if (!reservation._id) {
            return response.status(404).json({ error: 'Is a empty.' });
        }

        return response.json(reservation);

    } catch (error) {
        return response.status(500).json({ error: 'An error has occurred!.' });
    }
})


router.post('/create', async (request, response) => {
    let newUser;
    const user = request.body.user;
    const userExists = await User.findOne({ email: user.email});
    /* to create a new reservation, check if the user already exists in the database,
    otherwise he creates a new user */
    if (!userExists) {
        newUser = await User.create(user);
    } else {
        newUser = userExists;
    }
    const { date, hour, adults, childrens, specialNotes } = request.body;

    const reservation = await Reservation.create({
        date,
        hour,
        adults: Number(adults),
        childrens: Number(childrens),
        specialNotes,
        user: newUser._id
    });
    
    return response.json({ id: reservation._id, user: newUser });
});

router.put('/:id', async (request, response) => {
    const { id } = request.params;
    const reservation = await Reservation.findById(id);
    if (!reservation._id) {
        return response.status(401).json({ error: 'An error has occurred!.' });
    }

    const reservationUpdated = await Reservation.findByIdAndUpdate(id, request.body);

    return response.json(reservationUpdated);
});

router.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const reservation = await Reservation.findById(id);

    if (reservation.user != user_id) {
        return response.status(401).json({ error: 'An error has occurred!.' });
    }

    await Reservation.findByIdAndDelete(id);

    return response.status(204).send('ok');
});


// export all routes to the main file
module.exports = app => app.use('/reservation', router);