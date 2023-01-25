import Tippy from '@tippyjs/react';
import { ReactNode } from 'react';

interface ITooltipsProps {
    children: JSX.Element;
    content: ReactNode;
}

export default function Tooltips({ children, content }: ITooltipsProps) {
    return <Tippy content={content}>{children}</Tippy>;
}
