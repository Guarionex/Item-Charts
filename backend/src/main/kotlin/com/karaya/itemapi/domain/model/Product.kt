package com.karaya.itemapi.domain.model

data class Product(
    val id: String,
    val title: String,
    val image: String,
    val subtitle: String,
    val brand: String,
    val retailer: String,
    val details: List<String>,
    val tags: List<String>,
    val reviews: List<Review>,
    val sales: List<Sale>
)
