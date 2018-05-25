/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

function TodoListItem({
    value,
    createdAt,
    completedAt,
    onClickDelete,
    onClickComplete,
}) {
    const isComplete = !!completedAt;

    let infoText = `Created At: ${new Date(createdAt).toGMTString()}`;
    if (isComplete) {
        infoText = `${infoText}\nCompleted At: ${new Date(completedAt).toGMTString()}`;
    }

    return (
        <li className={`todolist todolist__item ${completedAt ? 'todolist__item_completed' : ''}`} title={infoText}>
            <span className="todolist todolist__item__name">{value}</span>
            <button
                className="todolist todolist__button todolist__iconButton todolist__iconButton_completed"
                onClick={onClickComplete}
            >
                { isComplete ? 'Undone' : 'Done' }
            </button>
            <button
                className="todolist todolist__button todolist__iconButton todolist__iconButton_delete"
                onClick={onClickDelete}
            >
                Delete
            </button>
        </li>
    );
}

TodoListItem.defaultProps = {
    completedAt: null,
    onClickDelete: null,
    onClickComplete: null,
};

TodoListItem.propTypes = {
    value: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    completedAt: PropTypes.number,
    onClickComplete: PropTypes.func,
    onClickDelete: PropTypes.func,
};

export default TodoListItem;
