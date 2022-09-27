import {
    forwardRef,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
} from 'react';
import { FieldError } from 'react-hook-form';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: FieldError;
    label?: string;
    type?: string;
    className?: string;
    addClassName?: string;
}

const InputMain: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = (
    {
        error = null,
        label,
        type = 'text',
        className = `
    bg-input-color
    font-normal
    h-12
    border
    border-solid
    rounded-md
    flex-1
    block
    w-full
    p-3
    text-sm
    appearance-none
    focus:outline-none
    shadow-md
    focus:shadow-lg
    `,
        addClassName = '',
    },
    ref
) => {
    return (
        <label className="w-full">
            {label && (
                <span className="block text-xs mb-1 font-medium">{label}</span>
            )}
            <input
                className={`${className}, ${addClassName}`}
                type={type}
                ref={ref}
            />
            {error?.message ? (
                <span className="text-red-500 text-xs">{error.message}</span>
            ) : null}
        </label>
    );
};

export const Input = forwardRef(InputMain);
