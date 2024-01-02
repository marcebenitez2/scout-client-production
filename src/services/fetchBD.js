export async function fetchBD(setState,url){
    try{
        const response = await fetch(url)
        const respuesta = await response.json()
        setState(respuesta)
    } catch(error){
        console.log(error)
    }
}