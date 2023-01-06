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
            <section className="flex flex-col m-3 p-1">
                <div className="p-1 text-md text-slate-800">
                    <span>{titleSection}</span>
                </div>
                <div className="flex space-x-2 mt-2">
                    {modeSave && (
                        <Button pattern="success" type="submit">
                            Salvar
                        </Button>
                    )}
                    {modeEdit && (
                        <Button
                            pattern="edit"
                            onClick={onHandleEdit}
                            type="button"
                        >
                            Editar
                        </Button>
                    )}
                    {modeRemove && (
                        <Button
                            pattern="remove"
                            onClick={onHandleRemove}
                            type="button"
                        >
                            Excluir
                        </Button>
                    )}
                    {modeCancel && (
                        <Button
                            pattern="cancel"
                            onClick={onHandleCancel}
                            type="button"
                        >
                            Cancelar
                        </Button>
                    )}
                </div>
            </section>
        </>
    );
}
