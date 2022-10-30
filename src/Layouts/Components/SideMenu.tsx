import React from 'react';

export default function SideMenu () {
    const getFree = <img src={require('../../Images/GetFree.png')} alt={"Get Free"} className="get-free-image"/>;

    return (
        <div className='side-menu'>
            <div className='get-free'>
                {getFree}
                <div className='get-free-description'>
                    Получай товары БЕСПЛАТНО!
                </div>
                <div className='get-free-button'>
                    Узнать подробнее
                </div>
            </div>
            <div className='side-image image-1 flex-column'>
                <div>Новая коллекция</div>
            </div>
            <div className='side-image image-2 flex-column'>
                <div>Новая коллекция</div>
            </div>
            <div className='side-image image-1 flex-column'>
                <div>Новая коллекция</div>
            </div>
        </div>
    );
}
