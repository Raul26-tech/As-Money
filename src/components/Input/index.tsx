import {
    forwardRef,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
} from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    type: string;
    className?: string;
    addClassName?: string;
}

const InputMain: ForwardRefRenderFunction<HTMLInputElement, IInputProps> = ({
    label,
    type = 'text',
    className = `font-normal
    h-9
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
    focus:shadow-lg`,
    addClassName = '',
}) => {
    return (
        <label className="w-full">
            {label && (
                <span className="block text-xs mb-1 font-medium">{label}</span>
            )}
            <input className={`${className}, ${addClassName}`} type={type} />
        </label>
    );
};

export const Input = forwardRef(InputMain);
