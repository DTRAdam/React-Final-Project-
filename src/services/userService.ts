import axios from "axios";
import { users } from "../interfaces/users";
import { jwtDecode, JwtPayload } from "jwt-decode";


const api: string = `${process.env.REACT_APP_API}/users`;





// register
export function createUser(user: users) {
    return axios.post(api, user)
}
export function getUserById(_id: string) {
    return axios.get(`${api}/${_id}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}
export function getDecodedToken(token: string) {
    return jwtDecode(token) as CustomPayload
}

interface CustomPayload extends JwtPayload {
    _id: string,
    isBusiness: boolean,
    isAdmin: boolean,
    iat: number
}


export async function getUserDetails(token: string) {
    try {
        let decode = jwtDecode<CustomPayload>(token)
        let userId = decode._id
        return getUserById(userId)
    } catch (err) {
        console.log(err);
    }
}


export function checkUser(email: string, password: string) {
    return axios.post(`${api}/login`, { email: email, password: password });
}
export function getAllUsers() {
    return axios.get(`${api}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}

export function deleteUser(_id: string) {
    return axios.delete(`${api}/${_id}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}
export function editUserbusstatus(_id: string) {
    return axios.patch(`${api}/${_id}`, {}, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}
export function updateUser(user: users) {
    return axios.put(`${api}/${user._id}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}






























































// export function getUserById(_id: string) {
//     return axios.get(`${api}/${_id}`)
// }
