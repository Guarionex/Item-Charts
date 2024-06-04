import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import './ProductDetails.css'
import React from 'react'

export const ProductDetails: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.items)

    if (!products.length) {
        return <div>Loading...</div>
    }

    const product = products[0]

    return (
        <div className="product-details">
            <img src={product.image} alt={product.title} />
            <h1>{product.title}</h1>
            <h2>{product.subtitle}</h2>
            <div className="tags">
                {product.tags.map((tag: string, index: number) => (
                    <span key={index} className="tag">{tag}</span>
                ))}
            </div>
        </div>
    )
}
