import Head from "next/head";

export default function Layout({children, pagina}){
    return(
        <>
            <Head>
                <title>Cafe - {pagina}</title>
                <meta name="descripccion " content="Quosco Cafeteria"></meta>
            </Head>
        </>
    )

}