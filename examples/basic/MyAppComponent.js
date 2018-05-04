/* eslint-disable react/prop-types, jsx-a11y/label-has-for */

import React, { Component } from 'react';

export default class MyApp extends Component {
    handleUsernameChange = (ev) => {
        // the `actions` are passed as props when
        // using the `connect` utility of the library
        const { actions } = this.props;
        const { updateUsername } = actions;

        updateUsername(ev.target.value);
    }

    handleEmailChange = (ev) => {
        // the `actions` are passed as props when
        // using the `connect` utility of the library
        const { actions } = this.props;
        const { updateEmail } = actions;

        updateEmail(ev.target.value);
    }

    render() {
        const { username, email } = this.props;

        return (
            <div>
                <h4>Welcome, <a href={`mailto:${email}`} >{username}</a></h4>

                <form>
                    <section>
                        <label>
                            Username:
                            <input
                                type="text"
                                value={username}
                                onChange={this.handleUsernameChange}
                            />
                        </label>
                    </section>
                    <section>
                        <label>
                            Email:
                            <input
                                type="email"
                                value={email}
                                onChange={this.handleEmailChange}
                            />
                        </label>
                    </section>
                </form>

            </div>
        );
    }
}
