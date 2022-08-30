import 'animate.css';
import IconIlustrator from '../../assets/iconMoney.svg';

export default function Home() {
    return (
        <>
            <section className="flex-1 h-full translate-y-full p-5 justify-center items-center ">
                <div className="flex justify-center items-center text">
                    <span className="animate__animated animate__rubberBand flex justify-center items-center text-center md:text-xl">
                        Seja bem vindo(a) ao Ass-Money, a melhor maneira de
                        contabilizar os gastos
                    </span>
                </div>
            </section>
            <div className="w-full flex justify-center items-center mt-14 md:mt-12">
                <img
                    className="animate__animated animate__rubberBand flex justify-center items-center"
                    src={IconIlustrator}
                    alt="Ilustração"
                />
            </div>
        </>
    );
}
