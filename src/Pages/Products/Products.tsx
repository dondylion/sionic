import React from 'react';
import API from '../../utils/API';
import {ProductsProps, ProductsState} from './ProductsTypes';
import InfiniteScroll from "react-infinite-scroll-component";
import {Carousel} from 'react-responsive-carousel';

const Notifications = require('react-notifications');
const notification = Notifications.NotificationManager;

export default class Products extends React.Component<ProductsProps, ProductsState> {
    constructor(props: ProductsProps) {
        super(props);

        this.state = {
            products: null,
            images: null,
            variations: null,
            productsQuantity: null,
            imagesQuantity: null,
            variationsQuantity: null,
        }
    }
    
    componentDidMount() {
        this.getProducts([0,9]);
    }

    getProducts: Function = (range: Array<number>) => {
        const self = this;
        const {products} = this.state;
        let newResult: Array<any> = [];
        const {id} = this.props.routerProps.location.state;
        const productsIds: Array<number> = [];

        API.get(`Products?filter={"category_id":${id}}&range=[${range}]`)
            .then(function(response){
                if (!products) {
                    newResult = response.data;
                } else {
                    newResult.push(...products, ...response.data);
                }

                const currentRange: string | undefined = response.headers['content-range'];
                let productsQuantity: number = 0;
                if (currentRange) productsQuantity = parseFloat(currentRange.split('/')[1]);

                response.data.map((item: {id: number})=>productsIds.push(item.id));
                self.getImages(productsIds, [0,29]);
                self.getVariations(productsIds, [0,39]);
                
                self.setState({products: newResult, productsQuantity});
            })
            .catch(function(error){
                notification.error(error.message);
            })
    }

    getImages = (ids: Array<number>, imageRange: Array<number>) => {
        const self = this;
        API.get(`ProductImages?filter={"product_id":[${ids}]}&range=[${imageRange}]`)
            .then(function(response){
                const range: string | undefined = response.headers['content-range'];
                let imagesQuantity: number = 0;
                if (range) imagesQuantity = parseFloat(range.split('/')[1]);

                let newResult = self.state.images;
                if (!newResult) {
                    newResult = response.data;
                } else {
                    newResult.push(...response.data);
                }
                
                self.setState({images: newResult, imagesQuantity}, ()=>{
                    const {images, imagesQuantity} = self.state;
                    if (images && imagesQuantity && images.length < imagesQuantity) {
                        self.getImages(ids, [images.length, images.length + 9]);
                    }
                });
            })
            .catch(function(error){
                notification.error(error.message);
            })
    }

    getVariations = (ids: Array<number>, variationRange: Array<number>) => {
        const self = this;
        API.get(`ProductVariations?filter={"product_id":[${ids}]}&range=[${variationRange}]`)
            .then(function(response){
                const range: string | undefined = response.headers['content-range'];
                let variationsQuantity: number = 0;
                if (range) variationsQuantity = parseFloat(range.split('/')[1]);

                let newResult = self.state.variations;
                if (!newResult) {
                    newResult = response.data;
                } else {
                    newResult.push(...response.data);
                }
                
                self.setState({variations: newResult, variationsQuantity}, ()=>{
                    const {variations, variationsQuantity} = self.state;
                    if (variations && variationsQuantity && variations.length < variationsQuantity) {
                        self.getVariations(ids, [variations.length, variations.length + 9]);
                    }
                });
            })
            .catch(function(error){
                notification.error(error.message);
            })
    }

    render() {
        const category: {id: number, name: string} = this.props.routerProps.location.state;
        const {products, productsQuantity, images, variations} = this.state;

        return (
            <>
                <span className='category-pageheader'>{`Категория: ${category.name}`}</span>
                {products && productsQuantity &&
                    <InfiniteScroll
                        dataLength={products.length}
                        next={()=>{
                            this.getProducts([products.length, products.length + 9])
                        }}
                        hasMore={products.length < productsQuantity}
                        loader={''}
                    >
                        <div className='products'>
                            {products.map((item)=>{
                                const currentImages: Array<string> = [];
                                const currentVariations: Array<number> = [];
                                if (images) {
                                    images.map((image)=>{
                                        if (image['product_id'] === item.id) currentImages.push(image['image_url']);
                                    });
                                }
                                if (variations) {
                                    variations.map((variation)=>{
                                        if (variation['product_id'] === item.id) currentVariations.push(variation['stock']);
                                    });
                                }

                                return (
                                    <div className='product' key={item.id}>
                                        <Carousel showThumbs={false} showStatus={false}>
                                            {currentImages.map((url)=>{
                                                return (
                                                    <div key={url}>
                                                        <img
                                                            src={`https://test2.sionic.ru${url}`}
                                                            style={{width: '200px'}}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </Carousel>
                                        <p style={{overflow: 'hidden', whiteSpace: 'nowrap'}}>
                                            {item.name}
                                        </p>
                                        <p style={{fontSize: '20px', color: '#2967FF', fontFamily: 'Montserat'}}>
                                            {`от ${Math.min(...currentVariations)} ₽`}
                                        </p>
                                        <p style={{textDecoration: 'line-through', fontFamily: 'Montserat'}}>
                                            {`${Math.max(...currentVariations)} ₽`}
                                        </p>
                                        <div className='to-busket'>
                                            Добавить в корзину
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </InfiniteScroll>
                }
            </>
        );
    }
}