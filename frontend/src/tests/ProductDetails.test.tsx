import {render, screen} from "@testing-library/react"
import {Provider} from "react-redux"
import React from "react"
import {ProductDetails} from "../components/ProductDetails";
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
})

describe('Product Details', () => {

    it('renders product details correctly', async () => {
        const store = configureStore({
            reducer: {
                product: productReducer
            }
        })

        render(
            <Provider store={store}>
                <ProductDetails/>
            </Provider>
        )

        store.dispatch(fetchProductById('B007TIE0GQ'))

        expect(screen.getByText('Loading...')).toBeInTheDocument()

        expect(await screen.findByRole('heading', {name: 'Shark Ninja'})).toBeInTheDocument()
        expect(screen.getByText('Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer System')).toBeInTheDocument()
        expect(screen.getByAltText('Shark Ninja')).toHaveAttribute('src', 'https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg')
    })
})