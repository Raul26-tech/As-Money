import Button from '../Button';

interface IHeaderFormProps {
    buttonSave?: boolean;
    buttomRemove?: boolean;
    buttonEdit: boolean;
    onEdit?: () => void;
    onSave?: () => void;
    onCancel?: () => void;
}

export default function HeaderTopForm({
    buttonEdit = false,
    buttomRemove = false,
    buttonSave = false,
    onCancel,
    onEdit,
    onSave,
}: IHeaderFormProps) {
    return (
        <div className="grid grid-cols-4 w-full h-10 bg-red-300">
            <div className="flex flex-row justify-start items-center space-x-2">
                {buttonSave && (
                    <Button pattern="success" type="submit">
                        Salvar
                    </Button>
                )}
            </div>
        </div>
    );
}
