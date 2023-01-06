import 'animate.css';
import IconIlustrator from '../../assets/iconMoney.svg';
import { Container } from '../../components/Container';
import Content from '../../components/Content';

export default function Home() {
    return (
        <Content>
            <Container>
                <section className="flex flex-col w-full h-full justify-center items-center">
                    <img src={IconIlustrator} alt="Ilustração" />

                    <h4 className="text-center text-xs p-6 md:text-xl">
                        Seja bem vindo(a) ao Ass-Money, a melhor maneira de
                        contabilizar os gastos
                    </h4>
                </section>
            </Container>
        </Content>
    );
}
