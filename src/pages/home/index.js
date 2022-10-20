import { useEffect,useState } from "react"
import { useRouter } from 'next/router'

function Card(props,children) {
    return (
        <div style={{ border: `solid 2px ${props.color}` }}>
            {props.children}
        </div>
      );
}

function Home() {

    const router = useRouter()

    const baseData = {
        "count": null,
        "next": null,
        "previous": null,
        "results":[{
    
                "id": null,
                "status": null,
                "created_at": null,
                "updated_at": null,
                "name_table_flood": null
        }] 
    }
    const [newData,setNewData] = useState(baseData)
    const [idUser,setIdUser] = useState(0)

    const URL = "http://localhost:8000/table_food/"

    const dataTable = () => {
        fetch(URL)
            .then(res => res.json())
            .then(data => setNewData(data))
    }

    const obtenerMesa = (e) => { 
        localStorage.setItem("id_table",e.target.name)
        router.push("/home/product")
    }

    useEffect(()=>{
        dataTable()
    },[])

    return ( 
        <div className="bg-blue-900  h-full lg:h-screen  py-10 sm:py-28">
            <h2 className="text-center text-3xl font-bold text-white"> Escoge tu mesa</h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 container m-auto px-20 gap-6 py-16 h-full">
            {
                newData.results.map( (item) => (
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