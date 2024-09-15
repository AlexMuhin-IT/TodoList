import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "../Button";

type PropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setNewTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setNewTitle('')
        } else {
            setError('Title is required')
        }
    }
    const changeItemHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
        <input
            className={error ? 'error' : ''}
            type="text"
            value={title}
            onChange={changeItemHandler}
            onKeyUp={addItemOnKeyUpHandler}
        />
    <Button title={'+'} onClick={addItemHandler}/>
    {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
};
