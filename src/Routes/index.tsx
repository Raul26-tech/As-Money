import { BrowserRouter, Route, Routes as RoutesDom } from 'react-router-dom';
import Home from '../pages/Home';
import MonthlyReports from '../pages/MonthlyReports';
import MonthlyValues from '../pages/MonthlyValues';
import FormMonthlyValues from '../pages/MonthlyValues/form';

export default function Routes() {
    return (
        <BrowserRouter>
            <RoutesDom>
                <Route path="/" element={<Home />} />
                <Route path="/transactions/grid" element={<MonthlyValues />} />
                <Route
                    path="/transactions/form"
                    element={<FormMonthlyValues />}
                />
                <Route
                    path="/transactions/form/:id"
                    element={<FormMonthlyValues />}
                />
                <Route path="/monthly-Reports" element={<MonthlyReports />} />
            </RoutesDom>
        </BrowserRouter>
    );
}
