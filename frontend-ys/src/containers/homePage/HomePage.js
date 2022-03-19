import React, { Fragment, useContext } from 'react'
import MainCarousel from './mainCarousel/MainCarousel'
import ModalContainer from '../../containers/modal/ModalContainer'
import AppContext from '../../context/app/appContext'
import Market from '../market/MarketContainer'
const Homepage = () => {
    const appContext = useContext(AppContext)
    const { showModal } = appContext

    return (
        <Fragment>
            <div className="main">
                {/* <Header /> */}
                <div className="main_top">
                    {showModal !== false ? <ModalContainer /> : null}
                    <div className="main_top_wrapper">
                        <div className="main_top_poligon"></div>
                    </div>
                </div>
                <div className="main_carousel">
                    <MainCarousel />
                </div>
                {/* <div className="main_bottom">
                    <div className="main_bottom_carousel">
                        <SecondaryCarousel />
                    </div>
                </div> */}
                <div className="mercado">
                    <Market />
                </div>
            </div>
        </Fragment>
    )
}

export default Homepage
