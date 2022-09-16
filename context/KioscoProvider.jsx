import { useState, useEffect, createContext } from "react";
import axios from "axios";
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categorias, setCategoria] = useState([]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const obtenerCategoria = async () => {
        const {data} = await axios("/api/categorias")
        setCategoria(data);
    }
    useEffect(() => {
        obtenerCategoria()
    }, [])

    const handleClickCategoria = id => { 
        const categoria = categorias.filter(cate => cate.id === id )
        setCategoria(categoria);
    }

    return(
        <KioscoContext.Provider
            value={{
                categorias, 
                categoriaActual,
                handleClickCategoria

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