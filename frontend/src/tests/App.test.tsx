import {render, screen} from '@testing-library/react'
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import {App} from '../App'
import {RootState} from '../redux/store'
import React from 'react'
import {thunk} from "redux-thunk"
import {fetchProducts} from "../redux/productSlice"

const middlewares = [thunk]
const mockStore = configureStore([])

jest.mock('../redux/productSlice', () => ({
    ...jest.requireActual('../redux/productSlice'),
    fetchProducts: jest.fn(() => ({type: 'products/fetchProducts'}))
}))

describe('App', () => {
    it('renders app with all components', () => {
        const initialState: RootState = {
            products: {
                items: [{
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
                            retailerMargin: 123294
                        },
                        {
                            weekEnding: '2017-01-08',
                            retailSales: 256908,
                            wholesaleSales: 189678,
                            unitsSold: 558,
                            retailerMargin: 67230
                        }
                    ]
                }],
                status: 'succeeded',
                error: null
            }
        }

        const store = mockStore(initialState)

        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )

        expect(screen.getByText('Shark Ninja')).toBeInTheDocument()
        expect(screen.getByText('Week Ending')).toBeInTheDocument()
    })

    it('dispatches fetchProducts on render', () => {
        const initialState = {products: {items: [], status: 'idle', error: null}}
        const store = mockStore(initialState)

        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )

        expect(fetchProducts).toHaveBeenCalled()
    })
})
