import { useState, useEffect, createContext } from "react";
import {toast} from "react-toastify";
import axios from "axios";

import {useRouter} from "next/router"
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(false);
    const [pedido, setPedido] = useState([]); 
    const [paso, setPaso] = useState(1);
    const [nombreCliente, setNombreCleinte] =  useState(""); 

    const [total, setTotal] = useState(0);
    
    const router = useRouter()
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

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad ) + total, 0)

        setTotal(nuevoTotal)
    },[pedido])

    const handleClickCategoria = id => { 
        const categoria = categorias.filter(cate => cate.id === id )
        setCategoria(categoria);
        router.push("/")
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

    const enviarOrden = async (e) => {
        e.preventDefault()
        try {
            await axios.post("/api/ordenes", {pedido, nombreCliente, fecha: Date.now().toString() ,total});

            // Resetear la app 
            setCategoriaActual(categorias[0])
            setPedido([])
            setNombreCleinte("")
            setTotal(0)

            toast.success("Pedido Realizado"); 

            setTimeout(() => {
                router.push("/");
            },3000);
            
        } catch (error) {
            
            console.log(error);
        }
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
                total,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal,
                handleAgregarPedido,
                handleChangePaso,
                handleEditarCantidades,
                handleEliminarProducto,
                nombreCliente,
                setNombreCleinte,
                enviarOrden

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