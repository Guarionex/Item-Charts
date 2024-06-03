package com.karaya.itemapi.domain.model

import java.util.Date

data class Sale(
    val weekEnding: Date,
    val retailSales: Int,
    val wholesaleSales: Int,
    val unitsSold: Int,
    val retailerMargin: Int
)
