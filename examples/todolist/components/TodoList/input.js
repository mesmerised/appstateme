/* eslint-disable import/no-extraneous-dependencies */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

const KEYS = {
    ENTER: 'Enter',
};

class TodoListInput extends Component {
    static defaultProps = {
        onClickAdd: null,
    }

    state = {
        value: '',
        isButtonDisabled: true,
    };

    handleOnKeyPress = (ev) => {
        const { key } = ev;

        if (key !== KEYS.ENTER) return true;

        return this.handleOnClickAdd();
    }

    handleOnChange = (ev) => {
        const { value } = ev.target;
        let isButtonDisabled = true;

        if (value && value.trim()) {
            isButtonDisabled = false;
        }

        this.setState({ value, isButtonDisabled });
    }

    handleOnClickAdd = () => {
        const { isButtonDisabled, value } = this.state;
        if (isButtonDisabled) return;

        const { onClickAdd } = this.props;

        if (onClickAdd) {
            onClickAdd(value);
            this.setState({ value: '', isButtonDisabled: true });
        }
    }

    render() {
        const { isButtonDisabled, value } = this.state;

        return (
            <div className="todolist todolist__inputContainer">
                <input
                    className="todolist todolist__input"
                    type="text"
                    value={value}
                    placeholder="Enter value"
                    onKeyPress={this.handleOnKeyPress}
                    onChange={this.handleOnChange}
                />
                <button
                    className={`todolist todolist__button ${isButtonDisabled ? 'todolist__button_disabled' : ''}`}
                    disabled={isButtonDisabled}
                    onClick={this.handleOnClickAdd}
                >
                    Add Item
                </button>
            </div>
        );
    }
}

TodoListInput.propTypes = {
    onClickAdd: PropTypes.func,
};

export default TodoListInput;
