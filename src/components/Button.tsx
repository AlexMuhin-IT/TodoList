import React from 'react';

type ButtonPropsType = {
    title: string
    onClick?: () => void

}

export const Button = ({title}:ButtonPropsType) => {
    return (
        <>
            <button onClick={()=>{}}>{title}</button>
        </>
    );
};

