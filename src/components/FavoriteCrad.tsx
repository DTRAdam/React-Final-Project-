import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Card } from "../interfaces/cards";
import { likeUnlikeCard } from "../services/cardsService";
import Swal from "sweetalert2";
import { FavCrdsContext } from "../Context/Context";


interface FavoriteCardProps {

}

const FavoriteCard: FunctionComponent<FavoriteCardProps> = () => {
    const { favorites, setFavorites } = useContext(FavCrdsContext);
    useEffect(() => {
        setFavorites(favorites);
    }, []);
    return (
        <>
            <h1>My Cards</h1>
            <div className="mycardmaindiv">
                {
                    favorites.length ? (favorites.map((card: Card) => (
                        <div className="card" key={card._id}>
                            <div style={{ backgroundImage: `url(${card.image.url})` }} className="card-img-top"></div>
                            <div className="card-body">
                                <h5 className="">{card.title}</h5>
                                <h6 className="">{card.subtitle}</h6>
                                <p className="card-text">Phone: {card.phone}</p>
                                <p className="card-text">Address: {card.address.street} {card.address.houseNumber} {card.address.city}</p>
                                <p className="card-text">Card Number: {card.bizNumber}</p>
                                <div className="cardbtn">
                                </div>
                                <div className="cardbtndiv">
                                    <div className="adminandbcusinessbtn">
                                        <button className="btn"><i className="fa-solid fa-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    ))) : (<p>No cards found</p>)
                }
            </div >
        </>
    );


}


export default FavoriteCard;
