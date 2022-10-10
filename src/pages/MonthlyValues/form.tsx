import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import { Input } from '../../components/Input';
import { api } from '../../Services/api';
import Swal from 'sweetalert2';
import Content from '../../components/Content';

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
                console.log(response.data);
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
            <Content>
                <form
                    onSubmit={handleSubmit(handleSave)}
                    className="w-full grid md:grid-cols-2 xl:grid-cols-4 md:gap-x-5 gap-y-3 p-6
                    "
                >
                    <div className="w-full grid col-span-4 mb-3 justify-start">
                        <button
                            type="submit"
                            className="w-full h-full flex  justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md shadow-lg "
                        >
                            <span className="text-[0.70rem] md:text-base p-2">
                                Incluir
                            </span>
                        </button>
                    </div>

                    <Input
                        label="Código"
                        {...register('code')}
                        error={formState.errors.code}
                        type="text"
                        addClassName="col-span-4 md:col-span-1"
                        autoFocus
                    />
                    <Input
                        label="Título"
                        {...register('title')}
                        error={formState.errors.title}
                        addClassName="col-span-4 md:col-span-1"
                        type="text"
                    />
                    <Input
                        label="Descrição"
                        {...register('description')}
                        error={formState.errors.description}
                        addClassName="col-span-4 md:col-span-2"
                        type="text"
                    />
                    <Input
                        label="Preço"
                        {...register('price')}
                        error={formState.errors.price}
                        addClassName="col-span-4 md:col-span-1"
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
                </form>
            </Content>
        </>
    );
}
