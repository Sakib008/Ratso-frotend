import {Navigate } from "react-router-dom"

interface Props {
  children: React.ReactNode
}
const ProtectedRoutes : React.FC<Props>= ({children}) => {
    const token = localStorage.getItem('token')
    if(!token){
        return <Navigate to='/login'/>
    }
    const user = JSON.parse(localStorage.getItem('user')!)
    if(!user){
        return <Navigate to='/login'/>
    }
    if(!user.isVerified){
        return <Navigate to='/verify-token'/>
    }
  return (
    <div>{children}</div>
  )
}

export default ProtectedRoutes