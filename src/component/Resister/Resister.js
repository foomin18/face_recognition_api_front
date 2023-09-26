import { React, Component } from "react";

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = {
            registerName: '',
            regiserEmail: '',
            registerPassword: ''
        }
    }
    onNameChange = (event) => {
        this.setState({registerName: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({regiserEmail: event.target.value});
    };

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value});
    };

    onSubmitRegister = () => {
        fetch('http://localhost:3000/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.registerName,
                email: this.state.regiserEmail,
                password: this.state.registerPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
        .catch(console.log);
    };


    render() {
        return(
            <div>
                <div className="sans-serif w-90 white mw6 center relative cover bg-top mt2 shadow-5">
                    <div id="overlay" className="absolute absolute--fill bg-navy o-70 z-unset"></div>

                    <div className="relative pa4 pa5-m">
                        <h1 className="serif tracked ma0 mb4 pv3">Register</h1>
                        <div action="" id="login" className="">
                            <div className="mb3">
                                <label htmlFor="username" className="db f6 white-80 ttu ph2 mb2">Username</label>
                                <input onChange={this.onNameChange}
                                       type="text" 
                                       name="username" 
                                       className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" 
                                />
                            </div>
                            <div className="mb3">
                                <label htmlFor="email" className="db f6 white-80 ttu ph2 mb2">Email</label>
                                <input onChange={this.onEmailChange}
                                       type="text" 
                                       name="email" 
                                       className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" 
                                />
                            </div>
                            <div className="mb4">
                                <label htmlFor="password" className="db f6 white-80 ttu ph2 mb2">Password</label>
                                <input onChange={this.onPasswordChange}
                                       type="password" 
                                       name="password" 
                                       className="input-reset db w-100 mw-100 white b pv2 ph3 bg-white-30 hover-bg-white-70 hover-gray outline-0 bn br-pill" 
                                />
                            </div>
                            <div>
                                <button onClick={this.onSubmitRegister}
                                        className="input-reset db w-100 light-gray f6 b ttu tracked pv3 ph3 pointer bg-dark-blue hover-bg-blue bn br-pill">
                                    Register
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
}

export default Register;