import { ReactNode } from 'react';
import { toast } from 'react-toastify';

interface INotification {
    message?: string | ReactNode;
    type?: 'success' | 'info' | 'warning' | 'error';
    position?:
        | 'top-right'
        | 'top-center'
        | 'top-left'
        | 'bottom-right'
        | 'bottom-center'
        | 'bottom-left';
}

export default function ShowNotificationMessage({
    message,
    type,
    position,
}: INotification) {
    toast(message, {
        type,
        position,
    });
}
