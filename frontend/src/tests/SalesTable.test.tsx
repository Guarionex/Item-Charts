import {fireEvent, render, screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import {SalesTable} from '../components/SalesTable'
import { RootState } from '../redux/store'
import React from 'react'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"
import {configureStore} from "@reduxjs/toolkit"
import productReducer, {fetchProductById} from "../redux/productSlice"

const mock = new MockAdapter(axios)
mock.onGet('/api/products/B007TIE0GQ').reply(200, {
    id: 'B007TIE0GQ',
    title: 'Shark Ninja',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg',
    subtitle: 'Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer System',
    tags: ['Pantry', 'Obsolete', 'Blender', 'Lightning Deal'],
    sales: [
        {
            weekEnding: '2017-01-01',
            retailSales: 348123,
            wholesaleSales: 255721,
            unitsSold: 887,
            retailerMargin: 123294,
        },
        {
            weekEnding: '2017-01-08',
            retailSales: 256908,
            wholesaleSales: 189678,
            unitsSold: 558,
            retailerMargin: 67230,
        },
    ],
})

describe('Sales Table', () => {
    it('renders sales table correctly', async () => {
        const store = configureStore({
            reducer: {
                product: productReducer,
            },
        })

        render(
            <Provider store={store}>
                <SalesTable />
            </Provider>
        )

        store.dispatch(fetchProductById('B007TIE0GQ'))

        expect(screen.getByText('Loading...')).toBeInTheDocument()

        expect(await screen.findByText('Week Ending')).toBeInTheDocument()
        expect(screen.getByText('Retail Sales')).toBeInTheDocument()
        expect(screen.getByText('Wholesale Sales')).toBeInTheDocument()
        expect(screen.getByText('Units Sold')).toBeInTheDocument()
        expect(screen.getByText('Retailer Margin')).toBeInTheDocument()
        expect(screen.getByText('01/01/2017')).toBeInTheDocument()
        expect(screen.getByText('$348,123')).toBeInTheDocument()
        expect(screen.getByText('$255,721')).toBeInTheDocument()
        expect(screen.getByText('887')).toBeInTheDocument()
        expect(screen.getByText('$123,294')).toBeInTheDocument()
    })

    it('sorts sales table by Retail Sales', async () => {
        const store = configureStore({
            reducer: {
                product: productReducer,
            },
        })

        render(
            <Provider store={store}>
                <SalesTable />
            </Provider>
        )

        store.dispatch(fetchProductById('B007TIE0GQ'))

        await screen.findByText('Week Ending')

        const rowsBeforeSort = screen.getAllByRole('row')
        expect(rowsBeforeSort[1]).toHaveTextContent('01/01/2017')
        expect(rowsBeforeSort[2]).toHaveTextContent('01/08/2017')

        fireEvent.click(screen.getByText('Retail Sales'))

        const rowsAfterSort = screen.getAllByRole('row')
        expect(rowsAfterSort[1]).toHaveTextContent('01/08/2017')
        expect(rowsAfterSort[2]).toHaveTextContent('01/01/2017')
    })
})
