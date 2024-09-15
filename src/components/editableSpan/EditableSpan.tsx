import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string;
    onChange: (newTitle: string) => void;
}

export const EditableSpan = ({value, onChange}: PropsType) => {
    const [editMode, setEditMode] = useState(false);
    const [title, setTitle] = useState<string>(value);
    // const activeEditModeHandler = () => {
    //     setEditMode(!editMode);
    // }
    // const deactivateEditModeHandler = () => {
    //     setEditMode(!editMode)
    //     onChange(title)
    // }
    const onTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const changeEditModeHandler = () => {
        setEditMode(!editMode)
        onChange(title)
    }
    return (
        <div >
            {editMode ? (
                <input
                    onChange={onTitleHandler}
                    onBlur={changeEditModeHandler}
                    value={title}
                    autoFocus/>
            ) : (
                <span onDoubleClick={changeEditModeHandler}>{value}</span>
            )
            }
        </div>
    )
};

