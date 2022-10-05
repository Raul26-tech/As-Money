import { useCallback, useEffect, useState } from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { AiOutlinePlus } from 'react-icons/ai';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import { Input } from '../../components/Input';
import Modal from '../../components/Modal';
import { api } from '../../Services/api';
import ShowNotificationMessage from '../../utils/notification';

// const schema = yup
//     .object({
//         code: yup.string().required('Código é obrigatório'),
//         name: yup.string().required('Nome da transação é obrigátorio'),
//         price: yup.string().required('Preço é obrigatório'),
//     })
//     .required();

const fields = ['code', 'name', 'prohibited', 'closed', 'price'];

interface IFormTransactionProps {
    id: string;
    code: string;
    name: string;
    price: number;
    prohibited: boolean;
    closed: boolean;
}

export default function MonthlyVAlues() {
    const [isOpen, setIsOpen] = useState(false);
    const [transactions, setTransactions] = useState<IFormTransactionProps[]>(
        []
    );

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    };

    const { register, handleSubmit, formState } =
        useForm<IFormTransactionProps>({
            // resolver: yupResolver(schema),
            defaultValues: {
                id: '',
                code: '',
                name: '',
                prohibited: true,
                closed: false,
                price: 0,
            } as IFormTransactionProps,
        });

    // const handleSave: SubmitHandler<IFormTransactionProps> = async (data) => {
    //     try {
    //         await api
    //             .post<IFormTransactionProps>('/transactions', data)
    //             .then((response) => {
    //                 console.log(response.data);
    //             });
    //         setIsOpen(false);
    //     } catch (error: any) {
    //         alert(error);
    //     }
    // };

    const handleSave: SubmitHandler<IFormTransactionProps> = useCallback(
        async (data) => {
            try {
                await api.post('/transactions', data).then((response) => {
                    console.log(response.data);
                });
                alert('Deu certo! ');
            } catch {
                alert('Erro');
            }
        },
        []
    );

    //Carregando histórico de transações
    useEffect(() => {
        api.get<IFormTransactionProps[]>('/transactions').then((response) => {
            console.log(response.data);
            setTransactions(transactions);
        });
    }, [transactions]);

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
            {/* {transactions.map(
                ({ code, name, price, id }: IFormTransactionProps) => (
                    <div className=" flex flex-col w-full bg-red-300">
                        <div key={id} className="w-full bg-blue-400">
                            <span>{code}</span>
                            <h3>{name}</h3>
                            <span>{price}</span>
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
                            label="Descrição"
                            {...register('name')}
                            error={formState.errors.name}
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
