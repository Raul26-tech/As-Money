import { useCallback, useEffect, useState } from 'react';
import { api } from '../../Services/api';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Content from '../../components/Content';
import Swal from 'sweetalert2';
import { MdCircle } from 'react-icons/md';

interface ITransaction {
    id: string;
    code: string;
    description: string;
    price: number;
    prohibited: boolean;
    title: string;
    closed: boolean;
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
                console.log(JSON.stringify(response.data, null, 2));
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
            <div className="w-full full p-2 flex justify-end text-center">
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
            {transaction.map(
                ({
                    code,
                    description,
                    id,
                    price,
                    prohibited,
                    title,
                }: ITransaction) => (
                    <button
                        key={id}
                        onClick={() => handleFormId(id)}
                        className="w-full mt-1 p-6 grid col-span-4 space-y-3 rounded-md shadow-md"
                    >
                        <h3 className="flex justify-center items-center text-normal">
                            {title}
                        </h3>
                        <hr />
                        <div className="flex flex-col justify-start items-start space-y-2">
                            <span className="font-normal">Código: {code}</span>
                            <p className="grid gap-y-0.5 p-1 whitespace-pre-line text-md">
                                {description}
                            </p>
                            <span>Valor: {price}</span>
                        </div>
                    </button>
                )
            )}
        </Content>
    );
}
