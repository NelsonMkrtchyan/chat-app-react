import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase/firebase';

function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">Chat</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"> </span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                    {auth().currentUser
                        ? <div className="navbar-nav">
                            <Link className="nav-item nav-link mt-2 mr-3" to="/profile">{auth().currentUser.email}</Link>
                            <button className="btn btn-danger mr-3" onClick={() => auth().signOut()}>Logout</button>
                        </div>
                        : <div className="navbar-nav">
                            <Link className="nav-item nav-link mr-3" to="/login">Sign In</Link>
                            <Link className="nav-item nav-link mr-3" to="/signup">Sign Up</Link>
                        </div>}
                </div>
            </nav>
        </header>
    );
}

export default Header;