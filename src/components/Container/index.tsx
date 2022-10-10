import { ReactNode } from 'react';

interface IContainerProps {
    children: ReactNode;
}

export function Container({ children }: IContainerProps) {
    return <div className="flex-1 overflow-y-auto mt-[5rem]">{children}</div>;
}
