import {RootState} from "../redux/store"
import configureStore from 'redux-mock-store'
import {render, screen} from "@testing-library/react"
import {Provider} from "react-redux"
import React from "react"
import {ProductDetails} from "../components/ProductDetails";

const mockStore = configureStore([])

describe('Product Details', () => {

    it('renders product details correctly', () => {
        const initState: RootState = {
            products: {
                items: [{
                    id: 'B007TIE0GQ',
                    title: 'Shark Ninja',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg',
                    subtitle: 'Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer System',
                    tags: ['Pantry', 'Obsolete', 'Blender', 'Lightning Deal'],
                    sales: []
                }],
                status: 'succeeded',
                error: null
            }
        }

        const store = mockStore(initState)

        render(
            <Provider store={store}>
                <ProductDetails />
            </Provider>
        )

        expect(screen.getByText('Shark Ninja')).toBeInTheDocument()
        expect(screen.getByText('Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer System')).toBeInTheDocument()
        expect(screen.getByAltText('Shark Ninja')).toHaveAttribute('src', 'https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg')
    })
})