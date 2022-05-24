import React, { lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/home';
import NotFound from '../pages/notFound';
import Reservation from '../pages/reservation';

export default function Routes() {
    // component for all routes 
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/reservation" component={Reservation}/>
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )
}