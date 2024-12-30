import { useEffect, useState } from "react"
import { getAllUsers, getDecodedToken } from "../services/userService"
import { users } from "../interfaces/users"

const useUser = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isBusiness, setIsBusiness] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [users, setUsers] = useState<users[]>([])
    const [userId, setUserId] = useState("")
    useEffect(() => {
        const token = localStorage.token
        if (token) {
            const decoded = getDecodedToken(token)
            setIsBusiness(decoded.isBusiness)
            setIsAdmin(decoded.isAdmin)
            setUserId(decoded._id)
            getAllUsers().then((res) => {
                setUsers(res.data)

            }).catch((err) => {
                console.log(err);

            })
            setIsLoggedIn(true)

        }
    },)
    return { isBusiness, isAdmin, userId, setIsBusiness, isLoggedIn, setIsLoggedIn, setUsers, users, setIsAdmin }

}

export default useUser
