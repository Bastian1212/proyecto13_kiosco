import { useState, useEffect, createContext } from "react";
import axios from "axios";
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [producto, setProducto] = useState({});
    const [modal, setModal] = useState(true);
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

    return(
        <KioscoContext.Provider
            value={{
                categorias, 
                categoriaActual,
                producto,
                modal,
                handleClickCategoria,
                handleSetProducto,
                handleChangeModal

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