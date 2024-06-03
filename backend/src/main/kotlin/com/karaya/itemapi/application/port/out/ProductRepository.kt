package com.karaya.itemapi.application.port.out

import com.karaya.itemapi.domain.model.Product

interface ProductRepository {
    fun findAll(): List<Product>

    fun findById(id: String): Product?
}
