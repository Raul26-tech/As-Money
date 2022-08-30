import { useState } from 'react';
import { BsFillPersonFill, BsList, BsXLg } from 'react-icons/bs';
import { TbDoorExit } from 'react-icons/tb';
import { GiNotebook } from 'react-icons/gi';
import { IoHome, IoReader } from 'react-icons/io5';

export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const handleOPenMenu = () => {
        setIsOpenMenu(!isOpenMenu);
    };

    const handleCloseAplication = () => {
        console.log('Saindo');
    };

    return (
        <header className="flex w-full h-[5rem] justify-between p-7 items-center shadow-2xl bg-ThemeBg">
            <button onClick={handleOPenMenu}>
                <BsList size={24} style={{ color: '#f5f5f5' }} />
            </button>
            {isOpenMenu && (
                <>
                    <nav
                        className={` 
                    w-64 
                    h-screen 
                    flex
                    flex-col 
                    absolute 
                    inset-0 
                    ${!isOpenMenu ? '-translate-x-full' : null} 
                    transition 
                    ease-in-out
                    duration-300 
                    shadow-2xl
                    z-50
                    bg-ThemeBg
                `}
                    >
                        <div className="flex w-full p-5 justify-end items-end ">
                            <button
                                className="flex w-20 h-10  justify-center items-center"
                                onClick={handleOPenMenu}
                            >
                                <BsXLg size={20} style={{ color: '#f5f5f5' }} />
                            </button>
                        </div>
                        <ul className="w-full h-full flex-1 p-2 justify-center items-center">
                            <li className="flex justify-start items-center hover:bg-backgound-hover">
                                <a
                                    className="flex text-letters p-2 hover:font-2xl"
                                    href="/"
                                >
                                    <IoHome
                                        size={20}
                                        style={{ marginRight: '1.5rem' }}
                                    />
                                    Home
                                </a>
                            </li>
                            <li className="flex justify-start items-center transition hover:bg-backgound-hover hover:duration-100">
                                <a
                                    className="flex text-letters p-2 hover:font-2xl"
                                    href="/monthly-values"
                                >
                                    <GiNotebook
                                        size={20}
                                        style={{ marginRight: '1.5rem' }}
                                    />
                                    Valores
                                </a>
                            </li>
                            <li className="flex justify-start items-center hover:bg-backgound-hover">
                                <a
                                    className="flex text-letters p-2 hover:font-2xl"
                                    href="/monthly-reports"
                                >
                                    <IoReader
                                        size={20}
                                        style={{ marginRight: '1.5rem' }}
                                    />
                                    Relatórios mensais
                                </a>
                            </li>
                        </ul>
                        <Footer logOf={handleCloseAplication} />
                    </nav>
                </>
            )}
            <div className="flex w-24 h-[5rem] p-2 justify-end items-center space-x-3 ">
                <span className="text-letters font-normal">Raul</span>
                <div className="flex w-10 h-10 justify-center rounded-full shadow-lg p-3 items-center bg-blue-300 hover:cursor-pointer">
                    <BsFillPersonFill size={24} style={{ color: '#f5f5f5' }} />
                </div>
            </div>
        </header>
    );
}

interface IFooterProps {
    logOf: () => void;
}

export function Footer({ logOf }: IFooterProps) {
    return (
        <>
            <div className="flex justify-center items-center">
                <button
                    className="flex w-full space-x-10 justify-center items-center p-3 transition duration-300 text-white shadow-md bg-btn-close hover:bg-btn-close-hover"
                    onClick={logOf}
                >
                    <TbDoorExit size={20} style={{ marginRight: '0.5rem' }} />
                    Sair
                </button>
            </div>
        </>
    );
}
