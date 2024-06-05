import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import './ProductDetails.css'
import React from 'react'

export const ProductDetails: React.FC = () => {
    const product = useSelector((state: RootState) => state.product.item)

    if (!product) {
        return <div>Loading...</div>
    }

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
