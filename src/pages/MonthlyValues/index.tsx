import { useCallback, useEffect, useState } from 'react';
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
import { FaTrash } from 'react-icons/fa';

const schema = yup
    .object({
        code: yup.string().required('Código é obrigatório'),
        title: yup.string().required('Título é obrigatório'),
        price: yup.string().required('Preço é obrigatório'),
    })
    .required();

interface IFormTransactionProps {
    id: string;
    code: string;
    description: string;
    price: number;
    status: {
        prohibited: boolean;
        closed: boolean;
    };
    title: string;
}

interface ITransaction {
    id: string;
    code: string;
    description: string;
    price: number;
    prohibited: boolean;
    title: string;
    closed: boolean;
}

export default function MonthlyValues() {
    const [isOpen, setIsOpen] = useState(false);
    const [transaction, setTransaction] = useState<ITransaction[]>([]);

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    const { register, handleSubmit, formState, reset } =
        useForm<IFormTransactionProps>({
            resolver: yupResolver(schema),
            defaultValues: {
                code: '',
                description: '',
                status: {
                    prohibited: true,
                    closed: false,
                },
                price: 0,
                title: '',
            } as IFormTransactionProps,
        });

    //Carregando transações
    useEffect(() => {
        api.get<ITransaction[]>('/transactions')
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    //Criando transação
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

    // const handleDeleteTransaction = useCallback(() => {
    //     api.get<ITransaction>(`/transactions/${id}`)
    //         .then(() => {
    //             Swal.fire({
    //                 title: 'Sucesso!',
    //                 text: 'Exclusão feita com sucesso',
    //                 icon: 'success',
    //                 confirmButtonText: 'Ok',
    //                 width: '24em',
    //             });
    //         })
    //         .catch((error) => {
    //             Swal.fire({
    //                 title: 'Error!',
    //                 text: error.response.data.message,
    //                 icon: 'error',
    //                 confirmButtonText: 'Ok',
    //                 width: '24em',
    //             });
    //         });
    // }, []);

    return (
        <>
            <div className="w-full h-14 p-2 flex justify-end text-center bg-red-300">
                <div className="bg-blue-400 flex w-full mt-[5rem] md:mt-[5rem] md:w-full justify-end h-[4rem] p-2">
                    <button
                        onClick={handleOpenModal}
                        className="w-[8rem] h-full flex justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg"
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
            {/* {transaction.map(
                ({ id, description, title, price }: ITransaction) => (
                    <div
                        key={id}
                        className="w-full h-full p-3 flex flex-col justify-center items-center "
                    >
                        <div className="w-full h-full flex flex-col m-1 p-2 rounded-md shadow-lg">
                            <div className="w-full flex justify-between p-1 rounded-sm bg-ThemeBg">
                                <div className="font-normal ml-3 flex justify-center items-center text-letters">
                                    <h3>{title}</h3>
                                </div>
                                <button
                                    // onClick={handleDeleteTransaction}
                                    className="flex p-2"
                                >
                                    <div className="font-normal mr-3 flex justify-center items-center text-letters">
                                        <FaTrash style={{ color: 'white' }} />
                                    </div>
                                </button>
                            </div>

                            <div className="flex flex-col text-left p-3">
                                <hr />
                                <span>{description}</span>
                                <hr />
                                <span>
                                    {price.toLocaleString('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL',
                                    })}
                                </span>
                                <hr />
                            </div>
                        </div>
                    </div>
                )
            )} */}
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
                            label="Título"
                            {...register('title')}
                            error={formState.errors.title}
                            type="text"
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
                                {...register('status.prohibited')}
                                error={formState.errors.status?.prohibited}
                            />
                            <Checkbox
                                label="Saída"
                                error={formState.errors.status?.closed}
                                {...register('status.closed')}
                            />
                        </CheckboxContainer>
                        <div className="mt-3 flex justify-center items-center">
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
