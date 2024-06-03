package com.karaya.itemapi.adapter.out.persistence.entities

import com.karaya.itemapi.domain.model.Review
import jakarta.persistence.*

@Entity
@Table(name = "reviews")
data class ReviewEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
    val customer: String,
    @Column(columnDefinition = "TEXT")
    val review: String,
    val score: Int,
    @ManyToOne @JoinColumn(name = "product_id") val product: ProductEntity
) {
    constructor() : this(0, "", "", 0, ProductEntity())
}

fun ReviewEntity.toDomain(): Review {
    return Review(
        customer = customer,
        review = review,
        score = score
    )
}
