import Image from "next/image"; 

function Categoria({categoria}) {
    const {nombre, icono, id } = categoria;
    return (
        
        <div className="flex items-center gap-4 w-full border p-5 hover:bg-amber-400">
            <Image alt="Imagen Icono" width={70} height={70} src={`/assets/img/icono_${icono}.svg`} className="mr-5"/>
            <button 
            type="button"
            className="text-2xl font-bold hover:cursor-pointer"
            >
                {nombre}
            </button>
        </div>
    );
}

export default Categoria