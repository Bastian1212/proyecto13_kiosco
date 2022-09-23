import Layout from "../layout/Layout";
import useKiosco from "../hooks/useKiosco";
import ResumenPedido from "../components/ResumenPedido";
export default function Resumen(){
    const {pedido} = useKiosco();
    return (
        <Layout pagina="Resumen ">
            <h1 className="text-4xl font-black">Resumen</h1>
            <p className="text-2xl my-10">Revisa tu Pedido </p>

            {pedido.length === 0 ? (
                <p className="text-center text-2xl">No Hay Productos en tu Pedido  </p>
            ): 
                pedido.map(producto => ( 
                    <ResumenPedido
                        key={producto.id}
                        producto={producto}
                    />
                ) )
             }

        </Layout>
    )
}