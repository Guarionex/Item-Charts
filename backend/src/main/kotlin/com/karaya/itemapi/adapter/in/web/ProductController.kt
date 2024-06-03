package com.karaya.itemapi.adapter.`in`.web

import com.karaya.itemapi.application.port.`in`.ProductService
import com.karaya.itemapi.domain.model.Product
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/products")
class ProductController(private val productService: ProductService) {

    @GetMapping
    fun getAllProducts(): ResponseEntity<List<Product>> {
        val products = productService.getAllProducts()

        return ResponseEntity.ok(products)
    }
}
