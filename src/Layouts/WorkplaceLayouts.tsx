import React from 'react';
import Footer from './Components/Footer';
import SideMenu from './Components/SideMenu';
import Header from './Components/Header';
import {LayoutsProps, LayoutsState} from './LayoutsTypes';

export default class WorkplaceLayouts extends React.Component<LayoutsProps, LayoutsState> {
    render () {
        const {children} = this.props;

        return (
            <div className='layouts w-full between flex-column'>
                <div className='main-container w-full'>
                    <div className='content flex-row w-full between'>
                        <div className='w-full'>
                            <Header router={this.props.routerProps}/>
                            <div className='children'>
                                {children}
                            </div>
                        </div>
                        <SideMenu/>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}