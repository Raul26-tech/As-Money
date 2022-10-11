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
            <div className="grid col-span-4">
                <span
                    className=" 
                    block
                    text-xs
                    text-gmov-input-label
                    font-medium
                    "
                >
                    {label}
                </span>
            </div>
            <div className="grid col-span-4 md:col-span-2">
                <div className="p-2 justify-center items-center rounded-md border-gmov-input-border border shadow-md">
                    {children}
                </div>
            </div>
        </>
    );
}
