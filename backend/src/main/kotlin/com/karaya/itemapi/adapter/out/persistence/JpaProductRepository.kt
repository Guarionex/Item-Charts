package com.karaya.itemapi.adapter.out.persistence

import com.karaya.itemapi.adapter.out.persistence.entities.ProductEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface JpaProductRepository : JpaRepository<ProductEntity, String>
