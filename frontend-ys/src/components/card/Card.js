import React from 'react'
import { Animated } from 'react-animated-css'

const Card = ({ title, path, onClick, onClickImg, type }) => {
    return (
        <Animated isVisible={true}>
            <div className="card_product">
                <div className="card_product_overflow" onClick={onClick}>
                    {
                        path && (
                            <img
                                src={`http://localhost:4000/` + path}
                                className="card_product_img"
                                alt=""
                                onClick={onClickImg}
                            />
                        )
                    }
                </div>
                <div className="card_product_body">
                    <h5>{title}</h5>
                    <p>Rubro: {type}</p>
                </div>
            </div>
        </Animated>
    )
}

export default Card
