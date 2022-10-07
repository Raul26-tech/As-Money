import { ReactNode } from 'react';
import { FaWindowClose } from 'react-icons/fa';

import styles from './styles.module.css';

interface IModalProps {
    title: string;
    children: ReactNode;
    onCloseModal?: () => void;
}

export default function Modal({ onCloseModal, title, children }: IModalProps) {
    return (
        <>
            <div className={styles.container} />
            <div className={styles.modal}>
                <div className="w-[20rem] h-full md:w-[30rem] py-5 px-8 rounded-md bg-white flex flex-col relative m-5">
                    <>
                        {onCloseModal && (
                            <button
                                className="p-3 absolute top-0 right-0"
                                onClick={onCloseModal}
                            >
                                <FaWindowClose size={20} />
                            </button>
                        )}
                    </>

                    <h3 className="flex justify-center items-center text-lg">
                        {title}
                    </h3>
                    <div className="flex justify-center items-center py-2">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
