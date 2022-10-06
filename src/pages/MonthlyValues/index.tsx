import { useCallback, useState } from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { api } from '../../Services/api';
import Swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import Transactions from '../../components/Transactions';

// const schema = yup
//     .object({
//         code: yup.string().required('Código é obrigatório'),
//         name: yup.string().required('Nome da transação é obrigátorio'),
//         price: yup.string().required('Preço é obrigatório'),
//     })
//     .required();

interface IFormTransactionProps {
    id: string;
    code: string;
    description: string;
    price: number;
    prohibited: boolean;
    closed: boolean;
}

export default function MonthlyVAlues() {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    const { register, handleSubmit, formState } =
        useForm<IFormTransactionProps>({
            // resolver: yupResolver(schema),
            defaultValues: {
                code: '',
                description: '',
                prohibited: true,
                closed: false,
                price: 0,
            } as IFormTransactionProps,
        });

    const handleSave: SubmitHandler<IFormTransactionProps> = async (data) => {
        try {
            await api.post('/transactions', data).then((response) => {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Inserção feita com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    width: '24em',
                });
                setIsOpen(false);
            });
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: error.response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
            setIsOpen(false);
        }
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
            <Transactions />
            {isOpen && (
                <Modal title="Nova transação" onCloseModal={handleOpenModal}>
                    <form
                        onSubmit={handleSubmit(handleSave)}
                        className="flex flex-col w-full h-full gap-x-3 md:gap-x-5 gap-y-2 pb-3"
                    >
                        <Input
                            label="Código"
                            {...register('code')}
                            error={formState.errors.code}
                            type="text"
                            autoFocus
                        />
                        <Input
                            label="Descrição"
                            {...register('description')}
                            error={formState.errors.description}
                            type="text"
                        />
                        <Input
                            label="Preço"
                            {...register('price')}
                            error={formState.errors.price}
                            type="number"
                        />
                        <CheckboxContainer label="Será uma">
                            <Checkbox
                                label="Entrada"
                                {...register('prohibited')}
                                error={formState.errors.prohibited}
                            />
                            <Checkbox
                                label="Saída"
                                error={formState.errors.closed}
                                {...register('closed')}
                            />
                        </CheckboxContainer>
                        <div className="mt-6 flex justify-center items-center">
                            <button
                                type="submit"
                                className="w-full h-full flex  justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg "
                            >
                                <span className="text-[0.70rem] md:text-base">
                                    Incluir
                                </span>
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}
