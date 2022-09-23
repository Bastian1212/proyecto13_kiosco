import Layout from "../layout/Layout"
export default function Total () {
    return (
        <Layout pagina="Resumen ">
            <h1 className="text-4xl font-black">Total y Confirma Pedido</h1>
            <p className="text-2xl my-10">Confime tu Pedido</p>

            <form>
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
                        className="bg-indigo-600 w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center"
                        value={"Conformar Pedido "}
                    >

                    </input>
                </div>
            </form>

        </Layout>
    )
}