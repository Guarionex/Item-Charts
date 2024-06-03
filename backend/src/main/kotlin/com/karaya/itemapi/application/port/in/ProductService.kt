package com.karaya.itemapi.application.port.`in`

import com.karaya.itemapi.domain.model.Product

interface ProductService {
    fun getAllProducts(): List<Product>
}
