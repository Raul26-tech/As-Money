import { useEffect, useState } from 'react';
import { api } from '../../Services/api';

interface ITransaction {
    id: string;
    code: string;
    description: string;
    price: number;
    prohibited: boolean;
    closed: boolean;
}

export default function Transactions() {
    const [transaction, setTransaction] = useState<ITransaction[]>([]);

    useEffect(() => {
        api.get<ITransaction[]>('/transactions')
            .then((response) => {
                console.log(response.data);
                setTransaction(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {transaction.map(
                ({
                    id,
                    code,
                    description,
                    price,
                    prohibited,
                    closed,
                }: ITransaction) => (
                    <section className="mt-6 w-full h-full flex flex-col justify-center items-center bg-red-300">
                        <div
                            key={id}
                            className="w-full h-[3rem] m-1 p-1 justify-center items-center bg-blue-300"
                        >
                            <div className="w-full bg-ThemeBg">
                                <h3 className="font-normal text-center text-letters">
                                    {description}
                                </h3>
                            </div>
                            <span>Descrição</span>
                            <span>
                                {price.toLocaleString('pt-br', {
                                    style: 'currency',
                                    currency: 'BRL',
                                })}
                            </span>
                        </div>
                    </section>
                )
            )}
        </>
    );
}
