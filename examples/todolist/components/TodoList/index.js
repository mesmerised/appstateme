/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

import TodoListInput from './input';
import TodoListItem from './item';

function TodoList({
    items,
    onClickAdd,
    onClickDelete,
    onClickComplete,
}) {
    const listItems = Object.keys(items).map(id => (
        <TodoListItem
            key={id}
            value={items[id].value}
            createdAt={items[id].createdAt}
            completedAt={items[id].completedAt}
            onClickDelete={onClickDelete ? () => onClickDelete(id) : null}
            onClickComplete={onClickComplete ? () => onClickComplete(id) : null}
        />
    ));

    return (
        <div className="todolist todolist__container">
            <TodoListInput onClickAdd={onClickAdd} />
            <ul className="todolist todolist__itemsContainer">
                {listItems.length ? listItems : 'No Items!'}
            </ul>
        </div>
    );
}

TodoList.defaultProps = {
    items: {},
    onClickAdd: null,
    onClickDelete: null,
    onClickComplete: null,
};

TodoList.propTypes = {
    items: PropTypes.object,
    onClickAdd: PropTypes.func,
    onClickDelete: PropTypes.func,
    onClickComplete: PropTypes.func,
};

export default TodoList;
