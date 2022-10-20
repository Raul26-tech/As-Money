import { ReactNode } from 'react';
import { Container } from '../Container';
import Header from '../Header';

interface IContentProps {
    children: ReactNode;
}

export default function Content({ children }: IContentProps) {
    return (
        <div className="h-screen w-screen">
            <div className="flex flex-row h-full">
                <div className="h-full flex flex-col flex-1">
                    <Header />
                    <Container>{children}</Container>
                </div>
            </div>
        </div>
    );
}
