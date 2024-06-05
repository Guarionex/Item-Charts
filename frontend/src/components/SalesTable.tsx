import {useSelector} from 'react-redux'
import {RootState} from '../redux/store'
import './SalesTable.css'
import React, {useMemo, useState} from 'react'

interface Sale {
    weekEnding: string
    retailSales: number
    wholesaleSales: number
    unitsSold: number
    retailerMargin: number
}

interface SortConfig {
    key: keyof Sale
    direction: 'ascending' | 'descending'
}

export const SalesTable: React.FC = () => {
    const product = useSelector((state: RootState) => state.product.item)

    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

    const sales: Sale[] = !!product ? product.sales : []

    const sortedSales = useMemo(() => {
        let sortableSales = [...sales]
        if (sortConfig !== null) {
            sortableSales.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1
                }
                return 0
            })
        }
        return sortableSales
    }, [sales, sortConfig])

    const requestSort = (key: keyof Sale) => {
        let direction: 'ascending' | 'descending' = 'ascending'
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending'
        }
        setSortConfig({key, direction})
    }

    const getClassNamesFor = (name: string) => {
        if (!sortConfig) {
            return
        }
        return sortConfig.key === name ? sortConfig.direction : undefined
    }

    const formatCurrency = (dollars: number) =>
        new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(dollars)

    const formatDates = (sale: Sale) =>
        new Date(sale.weekEnding + 'T00:00:00').toLocaleDateString(undefined, {
            month: '2-digit',
            year: 'numeric',
            day: '2-digit'
        })

    return (
        <div>
            {!!product ?
                (<table className="sales-table" style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th onClick={() => requestSort('weekEnding')}>
                            Week Ending
                            <span className={getClassNamesFor('weekEnding')}></span>
                        </th>
                        <th onClick={() => requestSort('retailSales')}>
                            Retail Sales
                            <span className={getClassNamesFor('retailSales')}></span>
                        </th>
                        <th onClick={() => requestSort('wholesaleSales')}>
                            Wholesale Sales
                            <span className={getClassNamesFor('wholesaleSales')}></span>
                        </th>
                        <th onClick={() => requestSort('unitsSold')}>
                            Units Sold
                            <span className={getClassNamesFor('unitsSold')}></span>
                        </th>
                        <th onClick={() => requestSort('retailerMargin')}>
                            Retailer Margin
                            <span className={getClassNamesFor('retailerMargin')}></span>
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedSales.map((sale) => (
                        <tr key={sale.weekEnding}>
                            <td>{formatDates(sale)}</td>
                            <td>{formatCurrency(sale.retailSales)}</td>
                            <td>{formatCurrency(sale.wholesaleSales)}</td>
                            <td>{sale.unitsSold.toLocaleString()}</td>
                            <td>{formatCurrency(sale.retailerMargin)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>) : (
                    <div>Loading...</div>
                )}
        </div>
    )
}
