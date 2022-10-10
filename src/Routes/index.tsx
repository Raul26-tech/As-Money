import { BrowserRouter, Route, Routes as RoutesDom } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import MonthlyReports from '../pages/MonthlyReports';
import MonthlyValues from '../pages/MonthlyValues';
import FormMonthlyValues from '../pages/MonthlyValues/form';

export default function Routes() {
    return (
        <BrowserRouter>
            {/* <Header /> */}
            <RoutesDom>
                <Route path="/" element={<Home />} />
                <Route path="/transactions" element={<MonthlyValues />} />
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
