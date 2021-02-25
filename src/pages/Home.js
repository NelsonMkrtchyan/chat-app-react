import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
    render() {
        return (
            <div className="home">
                <Header/>
                <section>
                    <div className="">
                        <div className="container text-center pt-5 pb-5">
                            <h2 className="">Chat for Acumen interview task</h2>
                            <div className="mt-4">
                                <Link className="btn btn-primary px-5 mr-3" to="/signup">Create New Account</Link>
                                <Link className="btn btn-success px-5" to="/login">Login to Your Account</Link>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
}