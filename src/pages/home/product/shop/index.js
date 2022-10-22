import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

function Shop() {

    let dataPage = JSON.parse(localStorage.getItem("shoppingPage"))
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
                        dataPage.map((item,index) => (
                            <div key={index + "dsd123"} className="bg-blue-700 border-2 rounded-lg p-8 text-xl text-white text-center">
                                <img src={item.description_food_menu} className="mb-4"/>
                                <p>Product id : {item.product}</p>
                                <p>Cantidad : {item.count}</p>
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

