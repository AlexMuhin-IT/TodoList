import React, {ButtonHTMLAttributes} from 'react';

type ButtonPropsType = {
    className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>


export const Button = (props: ButtonPropsType) => {
    const {title,
        children,
        onClick,
        className,
        ...otherProps} = props
    return (
        <>
            <button onClick={onClick}
                    className={className}
            >{children}</button>
        </>
    );
};

