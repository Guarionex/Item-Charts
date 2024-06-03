package com.karaya.itemapi.adapter.out.persistence.entities

import com.karaya.itemapi.domain.model.Product
import jakarta.persistence.*

@Entity
@Table(name = "products")
data class ProductEntity(
    @Id val id: String,
    val title: String,
    val image: String,
    val subtitle: String,
    val brand: String,
    val retailer: String,
    @OneToMany(mappedBy = "product", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    val reviews: List<ReviewEntity>,
    @OneToMany(mappedBy = "product", cascade = [CascadeType.ALL], fetch = FetchType.EAGER)
    val sales: List<SaleEntity>,
    @ElementCollection
    @CollectionTable(name = "product_details", joinColumns = [JoinColumn(name = "product_id")])
    @Column(name = "detail")
    val details: List<String>,
    @ElementCollection
    @CollectionTable(name = "product_tags", joinColumns = [JoinColumn(name = "product_id")])
    @Column(name = "tag")
    val tags: List<String>
) {
    constructor() : this("", "", "", "", "", "", emptyList(), emptyList(), emptyList(), emptyList())
}

fun ProductEntity.toDomain(): Product {
    return Product(
        id = id,
        title = title,
        image = image,
        subtitle = subtitle,
        brand = brand,
        retailer = retailer,
        reviews = reviews.map { it.toDomain() },
        sales = sales.map { it.toDomain() },
        details = details,
        tags = tags
    )
}
