import React from 'react';
import {CiLocationOn, CiSearch, CiShoppingCart} from 'react-icons/ci'
import { RouterProps } from '../../utils/Router';

export default function Header (props: {router: RouterProps}) {
    return (
        <div className='header flex-row between'>
            <div className='react-logo'>React</div>
            
            <div className='location flex-row'>
                <CiLocationOn style={{fontSize: '20px', color: 'black'}}/>
                <span>Александровск-Са...</span>
            </div>
            <div className='search flex-row between'>
                <input placeholder='Поиск бренда, товара, категории...' className='w-full'/>
                <div className='search-button'><CiSearch/></div>
            </div>
            <div
                className='circle busket'
                onClick={()=>{
                    props.router.navigate('/busket');
                }}
            >
                <CiShoppingCart style={{marginTop: '15px'}}/>
            </div>
            <div className='circle avatar'></div>
        </div>
    );
}