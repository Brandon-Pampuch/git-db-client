import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from 'axios'
class Login extends React.Component {
    state = {
        users: [],
        credentials: {
            user: "",
            password: ""
        }
    };

    handleChange = e => {
        this.setState({
            ...this.state,
            credentials: {
                ...this.state.credentials,
                [e.target.name]: e.target.value
            }
        });
    };

    login = e => {
        e.preventDefault();
        // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
        axiosWithAuth()
            .post("/login", this.state.credentials)
            .then(res => {
                console.log('clicked', res)
                localStorage.setItem("token", res.data.token);
                // redirect to the apps main page?
                // this.props.history.push("/friends");
                this.setState({ ...this.state, credentials: { user: "", password: "" } })
            })
            .catch(err => console.log(err));
    };
    logout = () => {
        localStorage.clear()
        this.setState({ ...this.state, users: [] })

        // this.props.history.push("/login");

    }

    displayUsers = () => {
        axiosWithAuth()
            .get('/')
            .then(res => {
                console.log('displayUsers:', res.data.user)
                this.setState({
                    ...this.state, users: res.data.user

                })

            })
            .catch(err => console.log(err));
    };
    register = () => {
        axios
            .post('https://build-week-4.herokuapp.com/api/register', this.state.credentials)
            .then(res => {

            })
    }

    render() {
        return (
            <div>
                <button onClick={this.register}>register</button>

                <form onSubmit={this.login}>
                    <input
                        type="text"
                        name="user"
                        placeholder="user"
                        value={this.state.credentials.user}
                        onChange={this.handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={this.state.credentials.password}
                        onChange={this.handleChange}
                    />
                    <button>Log in</button>
                    <button onClick={this.logout}>Log out</button>
                </form>
                <p>username and password are 'larie' and '123'</p>
                <h2>get users</h2>
                <button onClick={this.displayUsers}>press me</button>
                <div>
                    {
                        this.state.users.map(cur => <p>{cur.user}</p>)
                    }
                </div>
            </div>

        );
    }
}

export default Login;