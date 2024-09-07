import React, {ChangeEvent} from 'react';
import {Button} from "./components/Button";


export const Todolist = () => {
    return (
        <div>
            <h3>New Todolist</h3>
            <input type="text"/>
            <Button title={'+'}/>
            <ul>
                <li><span>список таксок</span><Button title={'X'}/></li>
            </ul>
            <Button title={'All'}/>
            <Button title={'Active'}/>
            <Button title={'Completed'}/>
        </div>

    )


};

