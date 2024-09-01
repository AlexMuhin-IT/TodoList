import React from 'react';
import {ReactComponent} from "*.svg";

type ButtonPropsType = {
    title: string;
    onClick?: () => void;
}


export const Button = ({title, onClick}:ButtonPropsType) => {
    return (
        <button
            onClick={onClick}
        >{title}</button>
    );
};
