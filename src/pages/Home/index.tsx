import 'animate.css';
import IconIlustrator from '../../assets/iconMoney.svg';
import Content from '../../components/Content';

export default function Home() {
    return (
        <Content>
            <section className="flex flex-col w-full h-full justify-center items-center">
                <img
                    className="animate__animated animate__rubberBand"
                    src={IconIlustrator}
                    alt="Ilustração"
                />
                <p className="animate__animated animate__rubberBand text-center text-sm md:text-xl ">
                    Seja bem vindo(a) ao Ass-Money, a melhor maneira de
                    contabilizar os gastos
                </p>
            </section>
        </Content>
    );
}
