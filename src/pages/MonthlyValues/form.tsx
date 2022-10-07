import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import { Input } from '../../components/Input';
import { api } from '../../Services/api';
import Swal from 'sweetalert2';

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

export default function FormMonthlyValues() {
    const { register, handleSubmit, formState } =
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
            });
        } catch (error: any) {
            Swal.fire({
                title: 'Erro!',
                text: error.response.data.message,
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        }
    };

    return (
        <>
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
        </>
    );
}
