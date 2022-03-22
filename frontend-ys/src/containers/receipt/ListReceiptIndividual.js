import React, { useContext } from 'react'
import AppContext from '../../context/app/appContext'
import { Table } from 'antd'

import { formatter } from './../../utils/utils'

const ListReceiptIndividual = () => {
    const appContext = useContext(AppContext)
    const { comprobante } = appContext

    const columns = [
        { title: '#', dataIndex: 'index' },
        { title: 'Codigo', dataIndex: 'code' },
        { title: 'Nombre', dataIndex: 'name' },
        { title: 'Precio', dataIndex: 'price' },
    ]
    let totalPrice = 0
    const getRow = () => {
        if (comprobante) {
            for (let x of comprobante.articles) {
                totalPrice += x.sellPriceOffer ? x.sellPriceOffer : x.sellPrice
            }
            return comprobante.articles.map((article, i) => {
                return {
                    index: i + 1,
                    code: article.code,
                    name: article.name,
                    price: formatter.format(
                        article.sellPriceOffer
                            ? article.sellPriceOffer
                            : article.sellPrice
                    ),
                }
            })
        }
    }
    return (
        <div className="tabla" style={{ marginTop: 50 }}>
            <Table columns={columns} dataSource={getRow()} />
            <h2 style={{ textAlign: 'end', marginRight: 20 }}>
                Total: ${totalPrice}
            </h2>
        </div>
    )
}

export default ListReceiptIndividual
