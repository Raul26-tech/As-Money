import { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../components/Content';
import HeaderTopForm from '../../components/HeaderTopForm';

export default function FormMonthlyValues() {
    const { id } = useParams();
    const [mode, setMode] = useState<'read' | 'insert' | 'edit' | 'remove'>(
        id ? 'read' : 'insert'
    );
    const navigate = useNavigate();

    const onRemove = useCallback(() => {
        if (mode === 'read' || mode === 'insert') {
            navigate(-1);
        }
    }, [mode, navigate]);

    return (
        <Content>
            <HeaderTopForm
                titleSection="Transações"
                modeSave={
                    mode === 'insert' || mode === 'edit' || mode === 'remove'
                }
                modeEdit={false}
                modeCancel={true}
                modeRemove={false}
                onHandleCancel={onRemove}
            />
        </Content>
    );
}
