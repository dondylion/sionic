import React from 'react';
import API from '../../utils/API';
import {CategoryProps, CategoryState} from './CategoriesTypes';

const Notifications = require('react-notifications');

export default class Categories extends React.Component<CategoryProps, CategoryState> {
    constructor(props: CategoryProps) {
        super(props);

        this.state = {
            loading: false,
            categories: null,
        }
    }

    componentDidMount() {
        const notification = Notifications.NotificationManager;
        const self = this;
        this.setState({loading: true}, ()=>{
            API.get('Categories')
                .then(function(response){
                    self.setState({categories: response.data, loading: false});
                })
                .catch(function(error){
                    notification.error(error.message);
                    console.dir(error)
                })
        });
    }

    getColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random()*16)];
        }
        
        return color;
    }
    
    render() {
        const {loading, categories} = this.state;
        const {navigate} = this.props.routerProps;

        return (
            <>
                <span className='category-pageheader'>Категории товаров</span>
                {!loading && categories &&
                    <div className='w-full flex-row categories'>
                        {categories.map((item)=>{
                            return (
                                <div
                                    className='category'
                                    style={{backgroundColor: this.getColor()}}
                                    onClick={()=>{
                                        navigate('/products', {state: item});
                                    }}
                                    key={item.id}
                                >
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                }
            </>
        );
    }
}