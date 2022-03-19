import React, { useState, useContext, useEffect, Fragment } from 'react'
import Button, { ButtonCancel } from '../../components/button'
import AppContext from '../../context/app/appContext'
import Input from '../../components/input'

const NewArticule = () => {
    //Extraer Turnos de state inicial
    const appContext = useContext(AppContext)
    const {
        newArticule,
        editArticle,
        articleTypeList,
        getArticleType,
        currentState,
        current,
        getBrands,
        brandList,
        handleModal,
    } = appContext

    useEffect(() => {
        getArticleType()
        getBrands()
        // eslint-disable-next-line
    }, [])

    const [localModal] = useState({
        modalView: '',
        showModal: false,
    })

    const [localState, saveArticleState] = useState({
        name: currentState.name ? currentState.name : '',
        code: currentState.code ? currentState.code : '',
        amount: currentState.amount ? currentState.amount : null,
        costPrice: currentState.costPrice ? currentState.costPrice : null,
        sellPrice: currentState.sellPrice ? currentState.sellPrice : null,
        negativeStock: currentState.negativeStock
            ? currentState.negativeStock
            : null,
        minimum: currentState.minimum ? currentState.minimum : null,
        articleType: currentState.articleTypeId
            ? currentState.articleTypeId
            : null,
        brand: currentState.brandId ? currentState.brandId : null,
        description: currentState.description ? currentState.description : '',
        offer: null,
        imageId: null,
        id: currentState.key ? currentState.key : null,
    })

    const [file, saveImage] = useState(null)

    const onChange = (e) => {
        saveArticleState({
            ...localState,
            [e.target.name]: e.target.value,
        })
    }

    const onChangeFile = (e) => {
        saveImage(e.target.files[0])
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (!file) {
            alert('Debes cargar una imagen')
            return
        }
        if (currentState.name != null) {
            editArticle(localState)
            handleModal(localModal.modalView, localModal.showModal)
            return
        }

        newArticule({ article: localState, file })

        handleModal('MensajeRegistro', true)

        saveArticleState({
            name: '',
            code: '',
            amount: null,
            costPrice: null,
            sellPrice: null,
            negativeStock: null,
            minimum: null,
            articleType: null,
            brand: null,
            id: null,
        })
    }

    const cancelArticulo = () => {
        return (
            handleModal(localModal.modalView, localModal.showModal), current({})
        )
    }

    const edit = () => {
        editArticle({ article: localState, file })
        handleModal(localModal.modalView, localModal.showModal)
    }

    return (
        <div className="article_container">
            <h3 className="article_container_header">Articulos</h3>

            <div>
                <div className="article_container_body">
                    <div className="article_container_body_left">
                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'text'}
                                name={'name'}
                                title={'Nombre'}
                                required
                                value={localState.name ? localState.name : ''}
                                onChange={onChange}
                            />
                        </div>

                        <div class="input-group custom">
                            <label>Imagen</label>
                            <div className="custom-file">
                                <input
                                    type="file"
                                    onChange={onChangeFile}
                                    name="image"
                                    class="custom-file-input"
                                    id="inputGroupFile02"
                                />
                                <label
                                    class="custom-file-label"
                                    for="inputGroupFile02"
                                >
                                    Choose file
                                </label>
                            </div>
                        </div>

                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'text'}
                                name={'code'}
                                title={'Código'}
                                required
                                value={localState.code ? localState.code : ''}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'number'}
                                name={'amount'}
                                title={'Cantidad'}
                                required
                                value={
                                    localState.amount ? localState.amount : ''
                                }
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'number'}
                                name={'costPrice'}
                                title={'Precio Costo'}
                                required
                                value={
                                    localState.costPrice
                                        ? localState.costPrice
                                        : 'Precio Costo'
                                }
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Marca:</label>
                            <select
                                className="form-control"
                                onChange={onChange}
                                name="brand"
                                required
                            >
                                {currentState.brandId ? (
                                    <option
                                        value={currentState.brandId}
                                        key={currentState.brandId}
                                        selected
                                    >
                                        {currentState.brandName}
                                    </option>
                                ) : (
                                    <option value="" disabled selected>
                                        Seleccione la Marca
                                    </option>
                                )}
                                {brandList.map((brand) => (
                                    <option key={brand.id} value={brand.id}>
                                        {brand.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="article_container_body_right">
                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'number'}
                                name={'sellPrice'}
                                title={'Precio Venta'}
                                required
                                value={
                                    localState.sellPrice
                                        ? localState.sellPrice
                                        : 'Precio Venta'
                                }
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'number'}
                                name={'negativeStock'}
                                title={'Stock Negativo'}
                                required
                                value={
                                    localState.negativeStock
                                        ? localState.negativeStock
                                        : ''
                                }
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <Input
                                className={'form-control'}
                                type={'number'}
                                name={'minimum'}
                                title={'Stock Mínimo'}
                                required
                                value={
                                    localState.minimum ? localState.minimum : ''
                                }
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Tipo Artículo:</label>
                            <select
                                className="form-control"
                                onChange={onChange}
                                name="articleType"
                                required
                            >
                                {currentState.articleTypeId ? (
                                    <option
                                        value={currentState.articleTypeId}
                                        key={currentState.articleTypeId}
                                        selected
                                    >
                                        {currentState.articleTypeName}
                                    </option>
                                ) : (
                                    <option value="" disabled selected>
                                        Seleccione el Tipo de Artículo
                                    </option>
                                )}
                                {articleTypeList &&
                                    articleTypeList.map((tipoArticulo) => (
                                        <option
                                            key={tipoArticulo.id}
                                            value={tipoArticulo.id}
                                        >
                                            {tipoArticulo.name}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <div className="form-group textarea">
                            <label>Descripcion:</label>
                            <textarea
                                name="description"
                                id=""
                                cols="30"
                                rows="5"
                                onChange={onChange}
                                value={
                                    localState.description
                                        ? localState.description
                                        : ''
                                }
                            ></textarea>
                        </div>
                    </div>
                </div>

                <div className="article_container_footer">
                    <Fragment>
                        {currentState.name != null ? (
                            <Button title={'Aceptar'} onClick={edit} />
                        ) : (
                            <Button title={'Aceptar'} onClick={onSubmit} />
                        )}
                        <ButtonCancel
                            title={'Cancelar'}
                            onClick={(e) => cancelArticulo()}
                        />
                    </Fragment>
                </div>
            </div>
        </div>
    )
}

export default NewArticule
