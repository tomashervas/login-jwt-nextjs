import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"

const Dashboard = () => {

    const router = useRouter()

    const [user, setUser] = useState(null)

    const getProfile = async ()=>{
        const response = await axios.get('api/profile')
        setUser(response.data)
    }

    const handleLogout = async ()=>{
        const response = await axios.post('api/auth/logout')
        console.log(response)
        router.replace('/login');
    }

  return (


    <div>
        <h1>Dashboard</h1>

        <button onClick={getProfile}> perfil </button>
        <button onClick={handleLogout}> logout </button>
        <pre>
            {user && JSON.stringify(user, null, 2)}
        </pre>
    </div>
  )
}
export default Dashboard