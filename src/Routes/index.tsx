import { BrowserRouter, Route, Routes as RoutesDom } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import MonthlyVAlues from '../pages/MonthlyValues';

export default function Routes() {
    return (
        <BrowserRouter>
            <Header />
            <RoutesDom>
                <Route path="/" element={<Home />} />
                <Route path="/monthlyValues" element={<MonthlyVAlues />} />
            </RoutesDom>
        </BrowserRouter>
    );
}
