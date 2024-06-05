import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
import React from "react"
import './SalesGraph.css'

export const SalesGraph: React.FC = () => {
    const product = useSelector((state: RootState) => state.product.item)

    if (!product) {
        return <div>Loading...</div>
    }

    const sales = product.sales

    const formatDates = (tick: string | number | Date) => new Date(tick + 'T00:00:00').toLocaleString('default', {month: 'short'})

    const formatCurrency = (dollars: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(dollars)

    const formatTooltipDates = (date: string) =>
        new Date(date + 'T00:00:00').toLocaleDateString(undefined, {
            month: '2-digit',
            year: 'numeric',
            day: '2-digit'
        })

    const camelCaseToTitleCase = (camelCaseStr: string): string =>
        camelCaseStr
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, (str) => str.toUpperCase())
            .replace(/\s./g, (str) => str.toUpperCase())

    const tooltipFormatter = (value: number, name: string) => [formatCurrency(value), camelCaseToTitleCase(name)]

    return (
        <div className={"sales-graph"}>
            <h3>Retail Sales</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sales}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="weekEnding" tickFormatter={formatDates}/>
                    <YAxis hide={true}/>
                    <Tooltip formatter={tooltipFormatter} labelFormatter={formatTooltipDates}/>
                    <Line type="monotone" dataKey="retailSales" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="wholesaleSales" stroke="#82ca9d"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
