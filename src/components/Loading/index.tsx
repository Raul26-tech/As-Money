import loadingIcon from '../../assets/loading.gif';

interface ILoadingProps {
    isLoading: boolean;
}

export default function Loading({ isLoading = true }: ILoadingProps) {
    if (isLoading) {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <img src={loadingIcon} alt="Loading" />
            </div>
        );
    }
}
