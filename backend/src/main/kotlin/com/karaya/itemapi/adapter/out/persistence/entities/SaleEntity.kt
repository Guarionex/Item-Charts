package com.karaya.itemapi.adapter.out.persistence.entities

import com.karaya.itemapi.domain.model.Sale
import jakarta.persistence.*
import java.sql.Date

@Entity
@Table(name = "sales")
data class SaleEntity(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Int = 0,
    @Column(name = "weekEnding")
    val weekEnding: Date,
    @Column(name = "retailSales")
    val retailSales: Int,
    @Column(name = "wholesaleSales")
    val wholesaleSales: Int,
    @Column(name = "unitsSold")
    val unitsSold: Int,
    @Column(name = "retailerMargin")
    val retailerMargin: Int,
    @ManyToOne @JoinColumn(name = "product_id") val product: ProductEntity
) {
    constructor() : this(0, Date(0), 0, 0, 0, 0, ProductEntity())
}

fun SaleEntity.toDomain(): Sale {
    return Sale(
        weekEnding = weekEnding,
        retailSales = retailSales,
        wholesaleSales = wholesaleSales,
        unitsSold = unitsSold,
        retailerMargin = retailerMargin
    )
}
