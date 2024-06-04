import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchProducts = createAsyncThunk<Product[]>('products/fetchProducts', async () => {
    const response = await axios.get('/api/products')
    return response.data
})

interface Product {
    id: string
    title: string
    image: string
    subtitle: string
    tags: string[]
    sales: {
        weekEnding: string
        retailSales: number
        wholesaleSales: number
        unitsSold: number
        retailerMargin: number
    }[]
}

interface ProductsState {
    items: Product[]
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProductsState = {
    items: [],
    status: 'idle',
    error: null,
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch products'
            })
    },
})

export default productSlice.reducer
