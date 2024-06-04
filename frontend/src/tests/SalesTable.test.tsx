import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {SalesTable} from '../components/SalesTable';
import { RootState } from '../redux/store';
import React from 'react';

const mockStore = configureStore([]);

describe('Sales Table', () => {
    it('renders sales table correctly', () => {
        const initialState: RootState = {
            products: {
                items: [{
                    id: 'B007TIE0GQ',
                    title: 'Shark Ninja',
                    image: 'https://images-na.ssl-images-amazon.com/images/I/51h-a5IaHeL.jpg',
                    subtitle: 'Magic Bullet NutriBullet 12-Piece High-Speed Blender/Mixer System',
                    tags: ['Pantry', 'Obsolete', 'Blender', 'Lightning Deal'],
                    sales: [
                        { weekEnding: '2017-01-01', retailSales: 348123, wholesaleSales: 255721, unitsSold: 887, retailerMargin: 123294 },
                        { weekEnding: '2017-01-08', retailSales: 256908, wholesaleSales: 189678, unitsSold: 558, retailerMargin: 67230 },
                    ]
                }],
                status: 'succeeded',
                error: null
            }
        };

        const store = mockStore(initialState);

        render(
            <Provider store={store}>
                <SalesTable />
            </Provider>
        );

        expect(screen.getByText('Week Ending')).toBeInTheDocument();
        expect(screen.getByText('Retail Sales')).toBeInTheDocument();
        expect(screen.getByText('Wholesale Sales')).toBeInTheDocument();
        expect(screen.getByText('Units Sold')).toBeInTheDocument();
        expect(screen.getByText('Retailer Margin')).toBeInTheDocument();
        expect(screen.getByText('2017-01-01')).toBeInTheDocument();
        expect(screen.getByText('$348,123')).toBeInTheDocument();
        expect(screen.getByText('$255,721')).toBeInTheDocument();
        expect(screen.getByText('887')).toBeInTheDocument();
        expect(screen.getByText('$123,294')).toBeInTheDocument();
    });
})
