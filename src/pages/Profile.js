import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';
import {auth, db} from "../firebase/firebase";

import {signInWithGoogle} from "../firebase/auth";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberOfChats: 0,
            user: auth().currentUser,
            chatList: [],
            chatName: '',
            userList:[],
        };
        this.createChat = this.createChat.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

    }

    createChat() {
        console.log(db.ref("chats").child("chatName"));
    }


    async componentDidMount() {
        try {
            db.ref("users").on("value", snapshot => {
                let array = [];
                snapshot.forEach((snap) => {
                    array.push(snap.val().email)
                });
                this.setState({
                    userList: array
                });

            });

            db.ref("chats").on("value", snapshot => {
                let array = [];
                snapshot.forEach((snap) => {
                    array.push(snap.val().title)
                });
                this.setState({
                    chatList: array
                });

            });
        } catch (error) {
            console.log("error")
        }
    }


    handleChange(event) {
        this.setState({
            chatName: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            await db.ref(`chats/` + this.state.chatName).set({
                title: `${this.state.chatName}`,
                messages: {
                    greeting: {
                        content: `Hello You are in the ${this.state.chatName}`,
                        timestamp: Date.now(),
                        uid: this.state.user.uid,
                    }
                }

            }).then(()=>{
                this.setState({
                    chatName: ''
                });
            });
        } catch (error) {
            this.setState({writeError: error.message});
        }
    }

    handleDelete(name,e) {
        db.ref(`chats/` + name).remove();
    }

    render() {

        const {user} = this.state;

        return (
            <div className="home">
                <Header/>
                <section>
                    <div className="container">
                        <div className="row m-3 d-flex justify-content-start">
                            <div className="">
                                <h4 className="text-success fw-bold mt-5">Hi, {user.email} </h4>
                            </div>
                        </div>


                        <div className="row m-3">
                            <h3 className="text-black">User List</h3>
                        </div>
                        <div className="row m-3">
                            {this.state.userList.length ?
                                (this.state.userList.map((name, i) => {
                                    return (
                                        <div key={i} className="flex-column mr-3">
                                            <div className="w-100">
                                                    <p className="text-dark">
                                                        {name}
                                                    </p>
                                            </div>
                                        </div>

                                    )


                                })) : <p className="text-info fw-bolder">There is no User in the list</p>}


                            {}
                        </div>


                        <div className="row m-3">
                            <h3 className="text-black">Chat List</h3>
                        </div>
                        <div className="row m-3">
                            {this.state.chatList.length ?
                                (this.state.chatList.map((name, i) => {
                                    return (
                                        <div key={i} className="flex-column mr-3">
                                            <div className="w-100">
                                                <button onClick={(e) => this.handleDelete(name, e)}
                                                        className="btn btn-danger btn-sm p-1">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>

                                                <button className="w-100 btn btn-info m-0 p-3">
                                                    <Link to={"/chat/" + name} key={i} className="text-light">
                                                        {name}
                                                    </Link>
                                                </button>
                                            </div>
                                        </div>

                                    )


                                })) : <p className="text-info fw-bolder">There is no Chat in the list</p>}


                            {}
                        </div>
                        <div className="row m-3">
                            <h3 className="text-black">Create new Chat</h3>
                        </div>
                        <div className="row m-3">
                            <form onSubmit={this.handleSubmit}>
                                <label>Name your chat</label>
                                <input className="form-control" value={this.state.chatName} name="content" required onChange={this.handleChange}/>
                                <button type="submit" className="btn btn-submit px-5 mt-4">add Chat</button>
                            </form>
                        </div>
                    </div>

                </section>
                <Footer/>
            </div>
        )
    }
}