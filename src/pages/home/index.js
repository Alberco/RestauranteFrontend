import { useEffect,useState } from "react"
import { useRouter } from 'next/router'
import axios from "axios"
import Swal from "sweetalert2"


function Home() {

    const router = useRouter()

    const baseData = []
    const [newData,setNewData] = useState(baseData)


    const dataTable = () => {
        axios.get("https://drf-retaurante.onrender.com/table_food/")
            .then(res => {
                setNewData(res.data.results)
            })
            .catch(error => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error de Server',
              }))
    }

    const obtenerMesa = (e) => { 
        localStorage.setItem("id_table",e.target.name)
        router.push("/home/product")
    }

    useEffect(()=>{
        dataTable()
    },[])

    return ( 
        <div className="bg-blue-900 min-h-screen y-10 w-full sm:py-28">
            <h2 className="text-center text-3xl font-bold text-white"> Escoge tu mesa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 container m-auto px-20 gap-6 py-16 h-full">
            {
                newData.map( (item) => (
                    <button key={item.id} className="text-white min-w-min max-lg-sm py-16 text-center rounded-lg hover:bg-blue-600 duration-300" 
                        style={{ border: `solid 2px ${item.status ? "white" : "red"}`}}
                        onClick={obtenerMesa}
                        name={item.id}
                        >
                            {item.name_table_flood}
                    </button>
                ))
            }
            </div>
        </div>
     );
}

export default Home;