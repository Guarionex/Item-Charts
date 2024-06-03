package com.karaya.itemapi.adapter.out.persistence

import com.karaya.itemapi.application.port.out.ProductRepository
import com.karaya.itemapi.domain.model.Product
import com.karaya.itemapi.adapter.out.persistence.entities.toDomain
import org.springframework.stereotype.Component

@Component
class ProductRepositoryImpl(
    private val jpaProductRepository: JpaProductRepository
) : ProductRepository {
    override fun findAll(): List<Product> {
        return jpaProductRepository.findAll().map { it.toDomain() }
    }

    override fun findById(id: String): Product? {
        return jpaProductRepository.findById(id).orElse(null)?.toDomain()
    }
}
