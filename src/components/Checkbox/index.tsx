/* eslint-disable react/function-component-definition */
import React, {
    forwardRef,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

interface ICheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    labelClassName?: string;
    addLabelClassName?: string;
    className?: string;
    error?: FieldError;
    colorClassName?: string;
}

// Analisar mais opções de autocomplete
// https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete

const CheckboxBase: ForwardRefRenderFunction<
    HTMLInputElement,
    ICheckboxProps
> = (
    {
        error = null,
        label,
        labelClassName = `
            text-sm
            font-normal
            text-sm   
        `,
        addLabelClassName = '',
        disabled,
        hidden,
        type = 'checkbox',
        ...rest
    },
    ref
) => {
    if (hidden) return null;
    return (
        <div className={`w-full md:p-1 ${addLabelClassName}`}>
            <input
                className="mr-2"
                ref={ref}
                disabled={disabled}
                type={type}
                {...rest}
            />
            {label && <span className={labelClassName}>{label}</span>}
            {error?.message ? (
                <span className="text-red-500 text-xs">{error.message}</span>
            ) : null}
        </div>
    );
};

export const Checkbox = forwardRef(CheckboxBase);
