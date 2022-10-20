import axios from "axios";
import swal from "prettyalert";
import { useRouter } from "next/router";

function Shop() {

    let data = JSON.parse(localStorage.getItem("shopping"))
    const  router = useRouter()
    const generarCompra = () => {
        data.map( x => {
            axios.post("http://localhost:8000/food_menu/",{
                
                    "client": x.client,
                    "tablefood": x.tablefood,
                    "product": x.product,
                    "count":x.count,
                    "description_food_menu": x.description_food_menu,
                
            })
            .then(res => console.log(res))
            .catch(error => console.log(error))
        })

        swal("Pedido Completado", "Gracias por comprar en el restaurante", "success");
        router.push("/home")
    }


    return (
            <div className="bg-blue-900 h-3/4">
            <h2 className="text-3xl text-center py-4">Carrito de compras</h2>
                <section className="bg-blue-900 h-full grid grid-cols-3">
            {
                data.map((item,index) => (
                    <div key={index + "dsd123"} className="bg-blue-700 border-2 border-white w-40 mx-auto my-4">
                        <p>Cliente id = {item.client}</p>
                        <p>Mesa id = {item.tablefood}</p>
                        <p>Product id = {item.product}</p>
                        <p>Cantidad  = {item.count}</p>
                        <p>descripcion  = {item.description_food_menu}</p>
                    </div>
                ))
            }
            <button  onClick={generarCompra} className="mx-auto  text-white text-2xl border-2 mt-10 p-3">Generar Pedido</button>
                </section>
            </div>
      );
}

export default Shop;

