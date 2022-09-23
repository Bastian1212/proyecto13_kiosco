import { useState, useEffect, createContext } from "react";
import {toast} from "react-toastify";
import axios from "axios";
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]); 
    const [paso, setPaso] = useState(1);
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

    const handleAgregarPedido = ({categoriaId,  ...producto}) => {
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

    const handleChangePaso = paso => { 
        setPaso(paso);

    }

    const handleEditarCantidades = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id )
        setProducto(productoActualizar[0])
        setModal(!modal)

    }
    const handleEliminarProducto = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id )
        console.log(pedidoActualizado)
        setPedido(pedidoActualizado);

    }

    return(
        <KioscoContext.Provider
            value={{
                categorias, 
                categoriaActual,
                producto,
                modal,
                pedido,
                paso, 
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                handleAgregarPedido,
                handleChangePaso,
                handleEditarCantidades,
                handleEliminarProducto

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