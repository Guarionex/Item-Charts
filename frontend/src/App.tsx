import React from 'react'
import './App.css'
import {ProductDetails} from "./components/ProductDetails";

export const App: React.FC = () => {
    return (
        <div className={"app"}>
            <div className={"sidebar"}>
                <ProductDetails />
            </div>
        </div>
    )
}