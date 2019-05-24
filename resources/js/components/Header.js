import React from 'react';
import {Link} from "react-router-dom";

const Header =()=>(
    <nav>
        <div className="nav-wrapper container">
            <Link to='/' className="brand-logo">BucketList</Link>
        </div>
    </nav>

);


export default Header
