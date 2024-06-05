import React, {useEffect} from 'react'
import './App.css'
import {ProductDetails} from "./components/ProductDetails"
import {SalesTable} from "./components/SalesTable"
import {fetchProductById} from "./redux/productSlice"
import {useDispatch} from "react-redux"
import {AppDispatch} from "./redux/store"
import {SalesGraph} from "./components/SalesGraph"
import {ReactComponent as Logo} from "./assets/stackline_logo.svg"

export const App: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductById('B007TIE0GQ'))
    }, [dispatch])

    return (

        <div className={"app"}>
            <div className={"top-bar"}>
                <Logo className={"logo"} title={"Stackline Logo"}/>
            </div>
            <div className={"content"}>
                <div className={"sidebar"}>
                    <ProductDetails/>
                </div>
                <div className={"main-content"}>
                    <SalesGraph/>
                    <SalesTable/>
                </div>
            </div>
        </div>

    )
}