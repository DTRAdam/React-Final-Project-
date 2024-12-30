import axios from "axios";
import { Card } from "../interfaces/cards";

const api: string = `${process.env.REACT_APP_API}/cards`;

export function getAllCards() {
    return axios.get(api)
}

export function getCardById(_id: string) {
    return axios.get(`${api}/${_id}`)
}

export function getBusinessCardsUser() {
    return axios.get(`${api}/my-cards`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}
export function addCard(card: Card) {
    return axios.post(api, card, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}

export function updateCard(card: Card) {
    return axios.put(`${api}/${card._id}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}

export function likeUnlikeCard(card: Card) {
    return axios.patch(`${api}/${card}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}

export function deleteCard(_id: string) {
    return axios.delete(`${api}/${_id}`, {
        headers: {
            "x-auth-token": localStorage.token
        }
    })
}



