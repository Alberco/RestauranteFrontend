import { useEffect,useState } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"

function Products() {

    const URL = 'https://drf-retaurante.onrender.com/product/'

    const router = useRouter()

    const baseData = {
        "count": null,
        "next": null,
        "previous": null,
        "results": [
            {
                "id": null,
                "status": null,
                "created_at": null,
                "updated_at": null,
                "name_product": null,
                "price": null,
                "category": null
            },
        ]
    }

    const [newData,setNewData] = useState(baseData)
    const [newShopping,setNewShopping] = useState([])
    const [shoppingCount,setShoppingCount] = useState("0")



    const consultaBackend = () => {
      fetch(URL)
        .then(res => res.json())
        .then(data => setNewData(data))
        .catch(error => console.log(error))
    }

    const addNewShopping = (id) => {
      setNewShopping((old)=>[...old,{
        "client": localStorage.getItem("id_user"),
        "tablefood": localStorage.getItem("id_table"),
        "product": id,
        "count":shoppingCount,
        "description_food_menu": "comida",
      }])
      Swal.fire({
        icon:"success",
        title: "Producto Agregado"
    })
    } 

    const irShop = () => {
      localStorage.setItem("shopping",JSON.stringify(newShopping))
    }
    useEffect(()=> {
      consultaBackend()
    },[])

    return ( 
        <div className="min-h-screen bg-blue-900 py-4 sm:py-11 w-full">
          <h2 className=" font-bold text-white text-3xl text-center py-4 sm:py-10" >List Product</h2>
          <div className="flex flex-wrap container justify-around px-26 justify-items-stretch items-center m-auto gap-4 mb-5 ">
              {
              newData.results.map(item => (
                <div key={item.id}  className="text-center border-2 rounded-lg w-60 h-auto py-8">
                  <p className="text-xl text-white">{item.name_product}</p>
                  <p className="text-xl text-white">category - {item.category}</p>
                  <p className="text-xl text-white"> price - 	S/{item.price}</p>
                  <div>
                    <input className="w-14 my-3 text-center" onChange={(e)=>setShoppingCount(e.target.value)} type="number"/>
                  </div>
                  <button 
                    className="border-2 rounded-md py-2 px-4 text-white bg-blue-600 hover:bg-blue-500 duration-200 my-3"
                    onClick={() => addNewShopping(item.id)} >
                    Añadir al pedido
                  </button>
                </div>
              ))
            }
          </div>
          <div className="flex items-start justify-center my-10">
            <buttom buttom onClick={irShop} className="text-2xl text-white font-bold  border-2 px-2 py-3 hover:bg-blue-500 transition-colors rounded-lg cursor-pointer">Ver pedido</buttom>
          </div>
        </div>
     );
}

export default Products;