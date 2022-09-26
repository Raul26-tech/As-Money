import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';

interface IFormTransactionProps {
    id: string;
    code: string;
    name: string;
    type: 'prohibited' | 'close';
    price: number;
}

export default function MonthlyVAlues() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            id: '',
            code: '',
            name: '',
            type: '',
            price: '',
        },
    });

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
                    <form
                        onSubmit={() => console.log('Enviando dados')}
                        className="flex flex-col w-full gap-x-3 md:gap-x-5 gap-y-2 pb-3"
                    >
                        <Input
                            label="Nome"
                            error={formState.errors.name}
                            {...register('name')}
                            type="text"
                            autoFocus
                        />
                        <Input
                            label="Preço"
                            error={formState.errors.price}
                            {...register('name')}
                            type="number"
                        />

                        <CheckboxContainer label="Será uma">
                            <Checkbox
                                label="Entrada"
                                error={formState.errors.type}
                                {...register('type')}
                            />
                            <Checkbox
                                label="Saída"
                                error={formState.errors.type}
                                {...register('type')}
                            />
                        </CheckboxContainer>
                        <div className="mt-6 flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-full h-full flex  justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg "
                            >
                                <AiOutlinePlus
                                    size={20}
                                    style={{ marginRight: '0.25rem' }}
                                />
                                <span className="text-[0.70rem] md:text-base">
                                    Enviar
                                </span>
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
