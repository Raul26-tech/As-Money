import loadingIcon from '../../assets/loading.gif';
import Content from '../Content';

interface ILoadingProps {
    isLoading?: boolean;
}

export default function Loading({ isLoading = true }: ILoadingProps) {
    if (isLoading) {
        return (
            <Content>
                <div className="w-screen h-screen flex justify-center items-center">
                    <img src={loadingIcon} alt="Loading" />
                </div>
            </Content>
        );
    }
}
