package com.karaya.itemapi.application.service

import com.karaya.itemapi.application.port.`in`.ProductService
import com.karaya.itemapi.application.port.out.ProductRepository
import com.karaya.itemapi.domain.model.Product
import org.springframework.stereotype.Service

@Service
class ProductServiceImpl(private val productRepository: ProductRepository) : ProductService {
    override fun getAllProducts(): List<Product> {
        return productRepository.findAll()
    }
}
