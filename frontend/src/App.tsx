import React, {useEffect} from 'react'
import './App.css'
import {ProductDetails} from "./components/ProductDetails";
import {SalesTable} from "./components/SalesTable";
import {fetchProducts} from "./redux/productSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./redux/store";

export const App: React.FC = () => {

    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className={"app"}>
            <div className={"sidebar"}>
                <ProductDetails />
            </div>
            <div className={"main-content"}>
                <SalesTable />
            </div>
        </div>
    )
}