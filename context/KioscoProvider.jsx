import { useState, useEffect, createContext } from "react";
import axios from "axios";
const KioscoContext = createContext();

const KioscoProvider = ({children}) => {
    const [categoria, setCategoria] = useState([]);
    const obtenerCategoria = async () => {
        const {data} = await axios("/api/categorias")
        setCategoria(data);
    }
    useEffect(() => {
        obtenerCategoria()
    }, [])
    return(
        <KioscoContext.Provider
            value={{
                categoria

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