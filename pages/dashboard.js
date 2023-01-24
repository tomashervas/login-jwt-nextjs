import axios from "axios"
import { useState } from "react"

const Dashboard = () => {

    const [user, setUser] = useState(null)

    const getProfile = async ()=>{
        const response = await axios.get('api/profile')
        setUser(response.data)
    }

  return (


    <div>
        <h1>Dashboard</h1>

        <button onClick={getProfile}> perfil </button>
        <pre>
            {user && JSON.stringify(user, null, 2)}
        </pre>
    </div>
  )
}
export default Dashboard