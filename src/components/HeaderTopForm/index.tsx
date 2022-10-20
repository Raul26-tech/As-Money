import Button from '../Button';

interface IHeaderFormProps {
    modeSave: boolean;
    modeEdit: boolean;
    modeCancel: boolean;
    modeRemove: boolean;
    onHandleEdit?: () => void;
    onHandleSave?: () => void;
    onHandleCancel?: () => void;
    onHandleRemove?: () => void;
    titleSection?: string;
}

export default function HeaderTopForm({
    modeSave = false,
    modeCancel = false,
    modeEdit = false,
    modeRemove = false,
    titleSection,
    onHandleCancel,
    onHandleRemove,
    onHandleEdit,
    onHandleSave,
}: IHeaderFormProps) {
    return (
        <>
            <div className="grid grid-cols-4 w-full h-[5rem]">
                <div className="flex grid-cols-4 space-x-1 m-7 justify-start items-center">
                    {modeSave && (
                        <Button
                            pattern="success"
                            type="submit"
                            onClick={onHandleSave}
                        >
                            Salvar
                        </Button>
                    )}
                    {modeEdit && (
                        <Button
                            pattern="success"
                            type="button"
                            onClick={onHandleEdit}
                        >
                            Editar
                        </Button>
                    )}
                    {modeRemove && (
                        <Button
                            pattern="cancel"
                            type="button"
                            onClick={onHandleRemove}
                        >
                            Excluir
                        </Button>
                    )}
                    {modeCancel && (
                        <Button
                            pattern="cancel"
                            type="button"
                            onClick={onHandleCancel}
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}
