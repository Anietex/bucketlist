import React from 'react';
import {Switch , BrowserRouter as Router, Route} from 'react-router-dom';
import Header from "./components/Header";

import Home from './pages/Home'
import BucketList from "./pages/BucketList";

let AppRouter = () =>(
    <Router>
        <Header/>
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/bucket-list' component={BucketList}/>
        </Switch>
    </Router>
);

export default AppRouter
