import React, {Component} from "react";
import api from "../../services/api";
import {Link} from 'react-router-dom'
import './styles.css';

export default class Main extends Component {
    state = {
        products: [],
        productInfo: {},
        page: 1
    }

    componentDidMount() {
        this.loadProducts()
    }
    
    loadProducts = async(page = 1) => {
        const response = await api.get(`/produtos?page=${page}`)
        const {docs, ...productInfo} = response.data
        
        this.setState({ products: docs, productInfo, page: page })
    }

    prevPage = () => {
        if(this.state.productInfo.hasPrevPage === true){

            const pageNumber = this.state.productInfo.prevPage
            this.loadProducts(pageNumber)
        }else{
            return
        }
    }

    nextPage = () => {
        if(this.state.productInfo.hasNextPage === true){

            const pageNumber = this.state.productInfo.nextPage
            this.loadProducts(pageNumber)
        }else{
            return
        }
    }

    render() {
        const {products, productInfo} = this.state

        return (
            <div className="product-list">
                {products.map(product => (
                    <article key={product._id}>
                        <strong>{product.tittle}</strong>
                        <p>{product.description}</p>

                        <Link to={`/produtos/${product._id}`}>acessar</Link>
                    </article>
                ))}
                <div className="actions">
                    <button disabled={productInfo.prevPage === null} onClick={this.prevPage}>anterior</button>
                    <button disabled={productInfo.nextPage === null} onClick={this.nextPage}>próximo</button>
                </div>
            </div>
        )
    }
}