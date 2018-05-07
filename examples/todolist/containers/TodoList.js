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

    handleOnClickComplete = (id) => {
        const { actions } = this.props;
        const { toggleCompleted } = actions;

        toggleCompleted({ id });
    }

    render() {
        const { items } = this.props;

        return (
            <div>
                <h4>Todo list</h4>
                <TodoListComponent
                    items={items}
                    onClickAdd={this.handleOnClickAdd}
                    onClickDelete={this.handleOnClickDelete}
                    onClickComplete={this.handleOnClickComplete}
                />
            </div>
        );
    }
}

export default ConnectedStoreHOC(TodoListContainer);
