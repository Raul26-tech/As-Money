import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';

export default function MonthlyVAlues() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className="w-full h-14 p-3 flex justify-end text-center">
                <div className="flex w-[10rem] md:w-full justify-end h-[4rem] p-2">
                    <button
                        onClick={handleOpenModal}
                        className="w-[14rem] h-full flex justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg "
                    >
                        <AiOutlinePlus
                            size={20}
                            style={{ marginRight: '0.25rem' }}
                        />
                        <span className="text-[0.70rem] md:text-base">
                            Adicionar nova transação
                        </span>
                    </button>
                </div>
            </div>
            {isOpen && (
                <Modal title="Nova transação" onCloseModal={handleOpenModal}>
                    <Input label="Código da transação" type="text" />
                </Modal>
            )}
        </>
    );
}
