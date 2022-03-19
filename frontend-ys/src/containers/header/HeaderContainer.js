import React, { useContext, Fragment } from 'react'
import { Animated } from 'react-animated-css'
import { Link, useHistory } from 'react-router-dom'
import { ButtonNav } from '../../components/button'
import ClientContext from '../../context/client/clientContext'
import LoginModal from './LoginModal'
import Modal from 'react-modal'
//Modal Style
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
    },
}

Modal.setAppElement('#root')

const HeaderContainer = () => {
    const [modalIsOpen, setIsOpen] = React.useState(false)
    const clientContext = useContext(ClientContext)
    const { client, closeSesion } = clientContext

    let history = useHistory()

    const setShowModalLogin = () => {
        openModal()
    }
    const setShowModalCerrarSesion = () => {
        closeSesion()
        history.push('/')
    }

    const animationDuration = 1000

    function openModal() {
        setIsOpen(true)
    }

    function closeModal() {
        setIsOpen(false)
    }

    return (
        <div className="header-container">
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="">
                    <div className="">
                        <LoginModal isOpen={closeModal} />
                    </div>
                </div>
            </Modal>
            <div className="header-container_right">
                <Link className="nav-item text-white" to="/">
                    Yourside
                </Link>
            </div>
            <div className="header-container_left">
                <Animated
                    animationIn="bounceInLeft"
                    animationInDuration={animationDuration}
                    isVisible={true}
                >
                    {client ? (
                        <div className="header-container_body">
                            {client.role === 'ADMIN_ROLE' ? (
                                <Fragment>
                                    <Animated
                                        className="d-flex align-items-center"
                                        isVisible={true}
                                    >
                                        <div className="mr-3">
                                            <Link
                                                className="nav-item text-white"
                                                to="/configuracion"
                                            >
                                                <i className="fas fa-wrench"></i>{' '}
                                            </Link>
                                            <Link
                                                className="nav-item text-white"
                                                to="/admin"
                                            >
                                                <i className="fas fa-user-shield"></i>{' '}
                                            </Link>
                                        </div>
                                        <div className="mr-3">
                                            <ul className="navbar-nav">
                                                <li className="nav-item dropdown">
                                                    <Link
                                                        className="nav-link dropdown-toggle"
                                                        href="#"
                                                        id="navbarDropdown"
                                                        role="button"
                                                        data-toggle="dropdown"
                                                        aria-haspopup="true"
                                                        aria-expanded="false"
                                                    >
                                                        AMB
                                                    </Link>
                                                    <div
                                                        className="dropdown-menu text-white "
                                                        aria-labelledby="navbarDropdown"
                                                    >
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/tipoarticulo"
                                                        >
                                                            Tipo Articulo
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/brands"
                                                        >
                                                            Marcas
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/ofertas"
                                                        >
                                                            Ofertas
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/articulo"
                                                        >
                                                            Articulo
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/mercado"
                                                        >
                                                            Mercado
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/comprobantes"
                                                        >
                                                            comprobantes
                                                        </Link>
                                                        <Link
                                                            className="dropdown-item"
                                                            to="/comprobantesadmin"
                                                        >
                                                            comprobantesAdmin
                                                        </Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </Animated>
                                </Fragment>
                            ) : (
                                <div className="">
                                    <Link
                                        className="nav-item"
                                        to="/compra"
                                        title="Carrito"
                                    >
                                        <i
                                            className="fas fa-shopping-cart"
                                            style={{ fontSize: 20 }}
                                        ></i>
                                    </Link>
                                    <Link
                                        className="nav-item"
                                        to="/comprobantes"
                                        title="Perfil"
                                    >
                                        <i
                                            className="fas fa-user-alt"
                                            style={{ fontSize: 20 }}
                                        ></i>
                                    </Link>
                                </div>
                            )}
                            <div>
                                <Link
                                    to=""
                                    className="nav-item"
                                    title="Salir"
                                    onClick={(e) => setShowModalCerrarSesion()}
                                >
                                    <i
                                        className="fas fa-sign-out-alt"
                                        style={{ fontSize: 20 }}
                                    ></i>
                                </Link>
                            </div>
                        </div>
                    ) : (
                        <div className="">
                            <ButtonNav
                                title={'Ingreso'}
                                onClick={(e) => setShowModalLogin()}
                            >
                                Ingresar
                            </ButtonNav>
                        </div>
                    )}
                </Animated>
            </div>
        </div>
    )
}

export default HeaderContainer
