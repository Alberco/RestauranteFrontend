import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function Pedido() {
    
    const router = useRouter()

    var data = JSON.parse(localStorage.getItem("shopping"));


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
                </div>
            </div>
      );
}

export default Pedido;
