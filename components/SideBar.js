import Image from "next/image"
import useKiosco from "../hooks/useKiosco"
import Categoria from "./Categoria";
function SideBar() {

    const {categorias} = useKiosco();
    return (
        <>
            <Image width={300} height={100}  src={"/assets/img/logo.svg"} alt="imagen logo "  />
            <nav className="mt-10">
                {categorias.map(categoria => (
                    <Categoria
                        key={categoria.key}
                        categoria={categoria}
                    />

                ))}


            </nav>
        </>



    )
}

export default SideBar