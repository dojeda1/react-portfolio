import React, { Component } from "react";

class About extends Component {

    state = {
        name: "",
        email: "",
        message: ""
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.name === "" || this.state.email === "" || this.state.message === "") {
            alert("Please fill out all forms.");
        } else {
            this.setState({
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                message: this.state.message.trim()
            });

            let bottle = {
                name: this.state.name,
                email: this.state.email,
                message: this.state.message
            };

            console.log(bottle);

            this.setState({
                name: "",
                email: "",
                message: ""
            });

            document.getElementById('contact-form').reset();
            alert("Message Sent!");
        }
    }

    render() {
        return (
            <div id="contact" className="scrollspy">
                <div className="row grey darken-4 z-depth-1">

                    <div className="col s12 center-align">
                        <h4 className="dom-blue-text font1">Contact</h4>
                    </div>
                </div>

                <div className="container">

                    <div className="row">
                        <div className="col s12">
                            <h5 className="dom-blue-text font2">Send me a message</h5>

                            <div className="divider" />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m7 l8">

                            <form id="contact-form" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="input-field col s12">
                                        <input type="text" className="form-input" name="name" value={this.state.name} onChange={this.handleInputChange} />
                                        <label htmlFor="name" className="font1">Name</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <input type="email" className="form-input" name="email" value={this.state.email} onChange={this.handleInputChange} />
                                        <label htmlFor="email" className="font1">Email</label>
                                    </div>
                                    <div className="input-field col s12">
                                        <textarea id="message" className="materialize-textarea" name="message" value={this.state.messages} onChange={this.handleInputChange} />
                                        <label htmlFor="message" className="font1">Message</label>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col m12">
                                        <button id="send-btn"
                                            className="btn contact-btn small waves-effect waves-light dom-blue font2 right"
                                            type="submit" name="action" value="Send">Send<i
                                                className="material-icons right">send</i></button>
                                    </div>
                                </div>
                            </form>

                        </div>
                        <div className="col s12 m5 l4">
                            <div className="row">
                                <div className="col">
                                    <h6 className="font1 dom-blue-text">- Contact info -</h6>
                                    <p id="p-about">dominicojeda.coding@gmail.com</p>
                                    <p>
                                        <a href="https://www.linkedin.com/in/dominic-ojeda/" target="blank"
                                            className="contact-link grey-text">Linkedin</a>
                                    </p>
                                    <p>
                                        <a href="https://github.com/dojeda1" target="blank"
                                            className="contact-link grey-text">Github</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="spacer" />
                </div>
            </div >
        );
    }
}

export default About;