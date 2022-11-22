import { useCallback, useEffect, useState } from 'react';
import { api } from '../../Services/api';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import Swal from 'sweetalert2';

interface ITransaction {
    id: string;
    code: string;
    description: string;
    price: number;
    prohibited: boolean;
    title: string;
    closed: boolean;
    dateInclusion: string;
}

const url = '/transactions';

export default function MonthlyValues() {
    const [transaction, setTransaction] = useState<ITransaction[]>([]);
    const navigate = useNavigate();

    const handleFormId = useCallback(
        (id: string) => {
            navigate(`${url}/form/${id}`);
        },

        [navigate]
    );

    useEffect(() => {
        api.get<ITransaction[]>('/transactions')
            .then((response) => {
                setTransaction(response.data);
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Erro!',
                    text: error.response.data.message,
                    icon: 'success',
                    confirmButtonText: 'Ok',
                });
            });
    }, []);

    return (
        <Content>
            <div className="w-full full flex p-2 justify-end text-center">
                <div className="flex w-full md:w-full justify-end h-[4rem] p-2">
                    <button className="w-[8rem] md:w-[16rem] h-full flex justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg">
                        <AiOutlinePlus
                            size={20}
                            style={{ marginRight: '0.25rem' }}
                        />
                        <Link
                            to={'/transactions/form'}
                            className="text-[0.70rem] md:text-base"
                        >
                            Adicionar nova transação
                        </Link>
                    </button>
                </div>
            </div>
            {transaction
                .map(
                    ({
                        code,
                        description,
                        id,
                        price,
                        title,
                        dateInclusion,
                    }: ITransaction) => (
                        <button
                            key={id}
                            onClick={() => handleFormId(id)}
                            className="w-full mt-1 p-6 grid col-span-4 space-y-3 gap-y-2 rounded-md shadow-md hover:shadow-2xl"
                        >
                            <h3 className="flex justify-left items-center text-lg font-bold mt-1">
                                {title}
                            </h3>
                            <hr />
                            <div className="flex flex-col justify-start items-start space-y-2">
                                <span className="font-normal text-base">
                                    Código: {code}
                                </span>

                                <p className="grid gap-y-0.2  whitespace-pre-line text-start text-sm text-slate-600">
                                    {description}
                                </p>

                                <div className="w-full flex justify-start p-2 rounded-md bg-slate-200">
                                    <span className="text-md p-1 text-slate-900">
                                        <span className="mr-1">Valor:</span>
                                        {new Intl.NumberFormat('pt-br', {
                                            style: 'currency',
                                            currency: 'BRL',
                                        }).format(price)}
                                    </span>
                                </div>
                            </div>
                        </button>
                    )
                )
                .reverse()}
        </Content>
    );
}
