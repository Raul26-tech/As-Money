import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link, LinkProps } from 'react-router-dom';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    onCancel?: () => void;
    pattern?: 'success' | 'cancel' | 'info' | 'edit' | 'remove';
    addClassName?: string;
}

const COLORS = {
    success: 'bg-colors-pattern-success',
    cancel: 'bg-colors-pattern-cancel',
    info: 'bg-colors-pattern-info',
    edit: 'bg-colors-pattern-edit',
    remove: 'bg-colors-pattern-remove',
};

export default function Button({
    children,
    onCancel,
    pattern = 'info',
    addClassName,
    ...rest
}: IButtonProps) {
    return (
        <div className="flex">
            <button
                className={`w-[6rem] flex justify-center items-center p-2 rounded-md text-white font-normal shadow-md ${COLORS[pattern]} ${addClassName}`}
                onClick={onCancel}
                {...rest}
            >
                {children}
            </button>
        </div>
    );
}

interface IButtonLinkProps extends LinkProps {
    children: string;
    pattern?: 'info' | 'cancel' | 'success';
    className?: string;
    addClassName?: string;
}

export function ButtonLink({
    children,
    pattern = 'info',
    className = `w-[5rem] p-2 rounded-md text-white text-center font-normal shadow-md ${COLORS[pattern]}`,
    addClassName,
    ...rest
}: IButtonLinkProps) {
    return (
        <Link className={` ${className} ${addClassName}`} {...rest}>
            {children}
        </Link>
    );
}
