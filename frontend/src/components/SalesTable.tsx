import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import './SalesTable.css'
import React from 'react'

export const SalesTable: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.items)

    if (!products.length) {
        return <div>Loading...</div>
    }

    const sales = products[0].sales

    return (
        <table className="sales-table">
            <thead>
            <tr>
                <th>Week Ending</th>
                <th>Retail Sales</th>
                <th>Wholesale Sales</th>
                <th>Units Sold</th>
                <th>Retailer Margin</th>
            </tr>
            </thead>
            <tbody>
            {sales.map((sale: any, index: number) => (
                <tr key={index}>
                    <td>{sale.weekEnding}</td>
                    <td>${sale.retailSales.toLocaleString()}</td>
                    <td>${sale.wholesaleSales.toLocaleString()}</td>
                    <td>{sale.unitsSold.toLocaleString()}</td>
                    <td>${sale.retailerMargin.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}
