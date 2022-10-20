import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'


export default function Home() {

  const router = useRouter()
  const  [newName,setNewName] = useState("")


  const guardarUsuario = () => {
    axios.post("http://localhost:8000/users/",{
            "name_client": localStorage.getItem("name")
    })
    .then(res => localStorage.setItem("id_user",res.data.id))
    .catch(error => console.log(error))
}
  
  const hanlerSubmit = (e) => {
      e.preventDefault()
      localStorage.setItem("name",newName)
      guardarUsuario()
      router.push("/home")
  }

  return (
    <div>
      <Head>
        <title>Restaurant App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-blue-900 min-h-screen">
        <div className="grid grid-cols-1 gap-4 container mx-auto h-full">

            <div className="h-full m-auto mt-36 mb-6">
                <h2 className="text-xl sm:text-5xl text-center text-white font-bold">Menu Restaurant</h2>
            </div>

            <div className="h-full mx-6 sm:mx-auto">
                <form className="flex flex-col border-2 rounded-xl px-10 py-6 sm:px-24 sm:py-16 gap-8 sm:gap-4 shadow-2xl" onSubmit={hanlerSubmit}>
                    <label className="text-white text-center m-auto border-b-2">Ingresar Nick</label>
                    <input 
                      className="rounded-md p-2 border-black border-2"
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)} />
                    <button className="border-2 text-white p-2 rounded-md hover:bg-white/80 hover:text-black" type="submit">
                      Ingresar
                    </button>
                </form>
            </div>

        </div>
      </main>

    </div>
  )
}
