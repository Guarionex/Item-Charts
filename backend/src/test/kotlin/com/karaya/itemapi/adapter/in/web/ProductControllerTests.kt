package com.karaya.itemapi.adapter.`in`.web

import com.karaya.itemapi.domain.model.Product
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.web.client.TestRestTemplate
import org.springframework.boot.test.web.server.LocalServerPort
import org.springframework.core.ParameterizedTypeReference
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.context.junit.jupiter.SpringExtension

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ExtendWith(SpringExtension::class)
@ActiveProfiles("test")
class ProductControllerTests @Autowired constructor(
    private val restTemplate: TestRestTemplate,
) {

    @LocalServerPort
    private var port: Int = 0

    private fun getRootUrl(): String {
        return "http://localhost:$port"
    }

    @Test
    fun `should return all products`() {
        val response: ResponseEntity<List<Product>> =
            restTemplate.exchange(
                "${getRootUrl()}/api/products",
                HttpMethod.GET,
                null,
                object : ParameterizedTypeReference<List<Product>>() {})

        assertThat(response.statusCode == HttpStatus.OK).isTrue
        assertThat(response.body).isNotEmpty

        val product: Product = response.body!![0]
        assertThat(product.id).isEqualTo("B007TIE0GQ")
    }
}
