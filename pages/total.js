import { useEffect } from "react"
import Layout from "../layout/Layout"
import useKiosco from "../hooks/useKiosco"
export default function Total () {

    const {pedido} = useKiosco();

    const comprobarPedido  = () => { 
    
            return pedido.length === 0
    }
    useEffect(() =>{
        comprobarPedido();
    }, [pedido, comprobarPedido])

    const enviarOrden = (e) => {
        e.preventDefault()
        console.log("hola")
    }

    return (
        <Layout pagina="Resumen ">
            <h1 className="text-4xl font-black">Total y Confirma Pedido</h1>
            <p className="text-2xl my-10">Confime tu Pedido</p>

            <form
                onSubmit={enviarOrden}
            >
                <div>
                    <label className="block uppercase text-slate-800 font-bold">
                        Nombre
                    </label>
                    <input
                        id="nombre"
                        type={"text"} 
                        className="bg-gray-200 w-full lg:w-1/3 mt-3 p-2 rounded-md"
                    />
                    
                </div>
                <div className="mt-10">
                    <p className="text-2xl">
                        Total a pagar:  {""} <span className="font-bold"> $200</span>
                    </p>

                </div>
                <div className="mt-5">
                    <input
                        type="submit"
                        className="bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center"
                        value={"Conformar Pedido "}
                        disabled={comprobarPedido()}
                    >

                    </input>
                </div>
            </form>

        </Layout>
    )
}