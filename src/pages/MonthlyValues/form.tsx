import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { Checkbox } from '../../components/Checkbox';
import CheckboxContainer from '../../components/Checkbox/Components';
import Content from '../../components/Content';
import HeaderTopForm from '../../components/HeaderTopForm';
import { Input } from '../../components/Input';
import { api } from '../../Services/api';
import 'tippy.js/dist/tippy.css';
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
            reset(response.data);
            setMode('read');
        }
    }, [id, reset]);

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const handleSaveTransaction: SubmitHandler<ITransaction> = async (
        submitData
    ) => {
        try {
            if (mode === 'insert') {
                setIsLoad(true);
                await api.post(`${url}`, submitData);
                setIsLoad(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Inserção feita com sucesso',
                });
                setMode('read');
                navigate(`${url}/form/${id}`);
            } else if (mode === 'edit') {
                setIsLoad(true);
                await api.patch(`${url}/form/${id}`, submitData);
                setIsLoad(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Alteração feita com sucesso',
                });
                setMode('read');
                navigate(`${url}/form/${id}`);
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Exclução feita com sucesso',
                });
                navigate(`${url}/form/${id}`);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ocorreu um erro durante a requisição',
            });
            setIsLoad(false);
        }
    };

    const handleRemove = useCallback(() => {
        if (mode === 'read' || mode === 'insert') {
            navigate(-1);
        }
    }, [mode, navigate]);

    const handleFormEdit = useCallback(() => {
        setMode('edit');
    }, []);

    const handleDelete = useCallback(() => {
        setIsLoad(true);
        api.delete(`${url}/form/${id}`)
            .then(() => {
                setIsLoad(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: 'Registro removido com sucesso',
                });
                navigate(`${url}/grid`);
            })
            .catch((e) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao deletar',
                });
            });
    }, [id, navigate]);

    return (
        <Content>
            <form
                className="flex flex-col md:grid-cols-2 xl:grid-cols-3 md:gap-x-5 gap-y-2 pb-3"
                onSubmit={handleSubmit(handleSaveTransaction)}
            >
                <HeaderTopForm
                    titleSection="Transações"
                    modeSave={
                        mode === 'insert' ||
                        mode === 'edit' ||
                        mode === 'remove'
                    }
                    modeDelete={mode !== 'insert' && mode !== 'edit'}
                    modeEdit={mode !== 'insert' && mode !== 'edit'}
                    modeCancel={true}
                    modeRemove={true}
                    onHandleRemove={
                        mode !== 'insert' ? handleDelete : handleDelete
                    }
                    onHandleCancel={handleRemove}
                    onHandleEdit={handleFormEdit}
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
                        type="date"
                        disabled={mode !== 'insert' && mode !== 'edit'}
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
