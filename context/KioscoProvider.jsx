import { useState, useEffect, createContext } from "react";
import {toast} from "react-toastify";
import axios from "axios";
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([])
    const obtenerCategoria = async () => {
        const {data} = await axios("/api/categorias")
        setCategoria(data);
    }
    useEffect(() => {
        obtenerCategoria()
    }, []);

    useEffect(()=> {
        setCategoriaActual(categorias[0])
    }, [categorias]);

    const handleClickCategoria = id => { 
        const categoria = categorias.filter(cate => cate.id === id )
        setCategoria(categoria);
    }

    const handleSetProducto = producto => {
        setProducto(producto);
    }

    const handleChangeModal = () => {
        setModal(!modal);
    }

    const handleAgregarPedido = ({categoriaId, imagen, ...producto}) => {
        console.log(producto)
        if(pedido.some(productoState => productoState.id === producto.id)) {
            const pedidoActualizado = pedido.map(productoState => productoState.id === producto.id ? producto : productoState)
            setPedido(pedidoActualizado)
        } else {
            setPedido([...pedido, producto])
            toast.success("Agregado al pedido");
            
        }
        setModal(false);
        
        
    }

    return(
        <KioscoContext.Provider
            value={{
                categorias, 
                categoriaActual,
                producto,
                modal,
                pedido,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                handleAgregarPedido

            }}
        >
            {children}
        </KioscoContext.Provider>
    )
}


export {
    KioscoProvider
}

export default KioscoContext;