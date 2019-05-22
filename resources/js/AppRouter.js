import React from 'react';
import {Switch , BrowserRouter as Router, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from "./components/Header";

import Home from './pages/Home'
import BucketList from "./pages/BucketList";
import BucketListItems from "./pages/BucketListItem";

let AppRouter = () =>(
    <Router>
        <Header/>
        <Switch>
            <Route path='/' exact component={Home}/>

            <Route path='/bucketlist/:id' component={BucketListItems}/>
            <Route  path='/bucketlist' component={BucketList}/>
        </Switch>
        <ToastContainer/>
    </Router>
);

export default AppRouter
