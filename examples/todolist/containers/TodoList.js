/* eslint-disable react/prop-types */

import React, { Component } from 'react';
import { ConnectedStoreHOC } from '../store';

import TodoListComponent from '../components/TodoList';

class TodoListContainer extends Component {
    handleOnClickAdd = (value) => {
        const { actions } = this.props;
        const { addItem } = actions;

        addItem({ value });
    }

    handleOnClickDelete = (id) => {
        const { actions } = this.props;
        const { removeItem } = actions;

        removeItem({ id });
    }

    handleOnClickComplete = (id, isComplete) => {
        const { actions } = this.props;
        const { toggleCompleted } = actions;

        toggleCompleted({ id, completed: !isComplete });
    }

    render() {
        const { items } = this.props;

        return (
            <TodoListComponent
                items={items}
                onClickAdd={this.handleOnClickAdd}
                onClickDelete={this.handleOnClickDelete}
                onClickComplete={this.handleOnClickComplete}
            />
        );
    }
}

export default ConnectedStoreHOC(TodoListContainer);
