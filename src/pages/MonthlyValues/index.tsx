import { useEffect, useState } from 'react';
import { api } from '../../Services/api';
import { AiOutlinePlus } from 'react-icons/ai';
import { Link } from 'react-router-dom';

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

    return (
        <>
            <div className="w-full full p-2 flex justify-end text-center">
                <div className="flex w-full mt-[5rem] md:mt-[5rem] md:w-full justify-end h-[4rem] p-2">
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
        </>
    );
}
