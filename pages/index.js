import Layout from "../layout/Layout"
import useKiosco from "../hooks/useKiosco"
import Producto from "../components/Producto"
export default function Home() {
  const {categoriaActual}  = useKiosco()
  return (
    <Layout
      pagina={`Menu ${categoriaActual?.nombre}`}
    >
        <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
        <p className="text-2xl my-10">
          Elige y personaliza tu pedido a continuación
        </p>
        {categoriaActual?.productos?.map(producto => (
            <Producto 
              key={producto.id}
              producto={producto}
            />
        ))}
    </Layout>
  )
} 