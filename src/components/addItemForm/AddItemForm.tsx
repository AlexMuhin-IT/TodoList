import React from 'react';

const AddItemForm = () => {
    return <input
                className={error ? 'error' : ''}
                type="text"
                value={itemTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />

};

export default AddItemForm;