import { useRouter } from "next/router";
import axios from "axios";
import Swal from "sweetalert2";

function Shop() {
    const router = useRouter()
    const data = JSON.parse(localStorage.getItem('shopping'));


    const generarCompra = () => {
        data.map( x => {
            axios.post("https://drf-retaurante.onrender.com/food_menu/",{
                
                    "client": x.client,
                    "tablefood": x.tablefood,
                    "product": x.product,
                    "count":x.count,
                    "description_food_menu": x.description_food_menu,
                
            })
            .then(res => {
                Swal.fire({
                    icon:"success",
                    title:"Pedido Completado",
                    text:"Gracias por comprar en el restaurante"
                })
                router.push("/")
            } )
            .catch(error => {
                Swal.fire({
                    icon:"error",
                    title:"Pedido Erroneo",
                })
            })
        })
    }


    return (
            <div className="bg-blue-800 min-h-screen w-full">
                <h2 className="text-3xl text-center py-4 text-white font-bold">Carrito de compras</h2>
                    <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 mx-14">
                    {
                        data.map((item,index) => (
                            <div key={index + "dsd123"} className="bg-blue-700 border-2 rounded-lg p-8 text-xl text-white text-center">
                                <p>Product id : {item.product}</p>
                                <p>Cantidad : {item.count}</p>
                                <p>descripcion : {item.description_food_menu}</p>
                            </div>
                        ))
                    }
                    </section>
                <div className="flex justify-center">
                    <button onClick={generarCompra} className="mx-auto text-white text-2xl border-2 mt-10 p-3">Generar Pedido</button>
                </div>
            </div>
      );
}

export default Shop;

