import { AiOutlinePlus } from 'react-icons/ai';

export default function MonthlyVAlues() {
    return (
        <div className="w-full h-14 p-3 flex justify-end text-center">
            <div className="flex h-[4rem] p-3">
                <button className="w-[14rem] h-full flex justify-center text-center items-center text-white bg-btn-transaction hover:bg-btn-transaction-hover rounded-md p-2 shadow-lg ">
                    <AiOutlinePlus
                        size={20}
                        style={{ marginRight: '0.25rem' }}
                    />
                    Adicionar nova transação
                </button>
            </div>
        </div>
    );
}
