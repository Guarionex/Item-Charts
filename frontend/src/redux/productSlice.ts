import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const apiUrl = process.env.REACT_APP_API_URL

export const fetchProductById = createAsyncThunk<Product, string>('product/fetchProductById', async (id) => {
    console.log("Look here", apiUrl)
    const response = await axios.get(`${apiUrl}/products/${id}`)
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
    item?: Product
    status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: ProductsState = {
    item: undefined,
    status: 'idle',
    error: null,
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.item = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message || 'Failed to fetch products'
            })
    },
})

export default productSlice.reducer
