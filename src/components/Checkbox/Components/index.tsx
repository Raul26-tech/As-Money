import React, { InputHTMLAttributes, ReactNode } from 'react';

interface ICheckboxContainer extends InputHTMLAttributes<HTMLInputElement> {
    children: ReactNode;
    label: string;
    colorClassName?: string;
}

export default function CheckboxContainer({
    children,
    label,
    disabled,
}: ICheckboxContainer) {
    return (
        <>
            <div className="grid">
                <span
                    className=" 
                    block
                    text-xs
                    text-gmov-input-label
                    font-medium
                    mb-1
                    "
                >
                    {label}
                </span>

                <div className="p-2 justify-center items-center rounded-md border-gmov-input-border border shadow-md">
                    {children}
                </div>
            </div>
        </>
    );
}
