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
    let infoText = `Created At: ${new Date(createdAt).toGMTString()}`;
    if (completedAt) {
        infoText = `${infoText}\nCompleted At: ${new Date(completedAt).toGMTString()}`;
    }

    return (
        <li className="todolist todolist__item" title={infoText}>
            <span className={`todolist todolist__itemName ${completedAt ? 'todolist__itemName_completed' : ''}`}>{value}</span>
            <button
                className="todolist todolist__icon todolist__icon_completed"
                disabled={completedAt}
                onClick={onClickComplete}
            >
                Complete
            </button>
            <button
                className="todolist todolist__icon todolist__icon_delete"
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
