import React from 'react';

type ButtonProps = {
    title: string
    onClick?: () => void

}

export const Button = ({title}:ButtonProps) => {
    return (
        <>
            <button>{title}</button>
        </>
    );
};

