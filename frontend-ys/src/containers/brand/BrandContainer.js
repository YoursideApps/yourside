import React, { useState, useContext } from 'react'
import { ButtonItemView } from '../../components/button'
import ContainerGeneral from '../../components/containergeneral'
import AppContext from '../../context/app/appContext'
import ModalContainer from '../modal/ModalContainer'
import BrandList from './BrandList'

const BrandContainer = () => {
    const appContext = useContext(AppContext)
    const { handleModal, showModal } = appContext

    const [localState] = useState({
        modalView: 'Brand',
        showModal: true,
    })

    const setShowModal = () =>
        handleModal(localState.modalView, localState.showModal)

    return (
        <ContainerGeneral
            title={'Listado de Marcas'}
            button={
                <ButtonItemView
                    onClick={() => setShowModal()}
                    icon={<i class="fas fa-check-double"></i>}
                    title={'Nueva Marca'}
                ></ButtonItemView>
            }
            modal={showModal !== false ? <ModalContainer /> : null}
            list={<BrandList />}
        />
    )
}

export default BrandContainer
