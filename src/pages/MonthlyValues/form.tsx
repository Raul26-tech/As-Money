import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import Content from '../../components/Content';
import HeaderTopForm from '../../components/HeaderTopForm';
import { Input } from '../../components/Input';
import loadingIcon from '../../assets/loading.gif';
import { api } from '../../Services/api';
import Swal from 'sweetalert2';

const url = '/transactions';

interface ITransaction {
    id: string;
    code: string;
    title: string;
    description: string;
    price: number;
    status: {
        prohibited: boolean;
        closed: boolean;
    };
    dateInclusion: string;
}

export default function FormMonthlyValues() {
    const { id } = useParams();
    const [mode, setMode] = useState<'read' | 'insert' | 'edit' | 'remove'>(
        id ? 'read' : 'insert'
    );
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();

    const { register, handleSubmit, formState, reset } = useForm<ITransaction>({
        defaultValues: {
            code: '',
            title: 'Nova transação',
            description: '',
            price: 0,
            status: {
                prohibited: true,
                closed: false,
            },
        },
    });

    // Resetando os dados do form
    const resetForm = useCallback(async () => {
        if (id) {
            setIsLoad(true);
            const response = await api.get<ITransaction>(`${url}/form/${id}`);
            setMode('read');
            reset(response.data);
        }
    }, [id, reset]);

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const onHandleSaveTransaction: SubmitHandler<ITransaction> = async (
        submitData
    ) => {
        setIsLoad(true);
        await api
            .post(`${url}`, submitData)
            .then((response) => {
                const data = response.data.id;
                setIsLoad(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Inserção feita com sucesso',
                });
                setMode('read');
                navigate(`${url}/form/${data}`);
                console.log(JSON.stringify(response.data, null, 2));
            })
            .catch((err: any) => {
                Swal.fire({
                    icon: 'error',
                    title: err.response.data.message,
                });
                setIsLoad(false);
            });
    };

    const onRemove = useCallback(() => {
        if (mode === 'read' || mode === 'insert') {
            navigate(-1);
        }
    }, [mode, navigate]);

    if (isLoad) {
        return (
            <Content>
                <div className="w-full h-full flex justify-center items-center">
                    <img src={loadingIcon} alt="Loading" />
                </div>
            </Content>
        );
    }
    return (
        <Content>
            <form
                className="flex flex-col md:grid-cols-2 xl:grid-cols-3 md:gap-x-5 gap-y-2 pb-3"
                onSubmit={handleSubmit(onHandleSaveTransaction)}
            >
                <HeaderTopForm
                    titleSection="Transações"
                    modeSave={
                        mode === 'insert' ||
                        mode === 'edit' ||
                        mode === 'remove'
                    }
                    modeEdit={false}
                    modeCancel={true}
                    modeRemove={false}
                    onHandleCancel={onRemove}
                />
                <div className="grid p-6 md:grid-cols-4 gap-x-3 gap-y-3">
                    <Input
                        label="Code"
                        error={formState.errors.code}
                        {...register('code')}
                        disabled={mode !== 'insert' && mode !== 'edit'}
                    />
                    <Input
                        label="Titulo"
                        error={formState.errors.title}
                        {...register('title')}
                        addClassName="md:col-span-2"
                        disabled={mode !== 'insert' && mode !== 'edit'}
                    />
                    <Input
                        label="Data de inclusão"
                        error={formState.errors.dateInclusion}
                        {...register('dateInclusion')}
                        disabled={mode === 'edit'}
                        type="date"
                    />
                    <Input
                        label="Descrição"
                        error={formState.errors.description}
                        {...register('description')}
                        addClassName="md:col-span-3"
                        disabled={mode !== 'insert' && mode !== 'edit'}
                    />
                    <Input
                        label="Valor da transação"
                        error={formState.errors.price}
                        {...register('price')}
                        disabled={mode !== 'insert' && mode !== 'edit'}
                    />
                    <CheckboxContainer label="Status">
                        <Checkbox
                            label="Entrada"
                            error={formState.errors.status?.prohibited}
                            {...register('status.prohibited')}
                            disabled={mode !== 'insert' && mode !== 'edit'}
                        />
                        <Checkbox
                            label="Saída"
                            error={formState.errors.status?.closed}
                            {...register('status.closed')}
                            disabled={mode !== 'insert' && mode !== 'edit'}
                        />
                    </CheckboxContainer>
                </div>
            </form>
        </Content>
    );
}
