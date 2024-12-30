import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Card } from "../interfaces/cards";
import { getAllCards } from "../services/cardsService";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Pagination from "./Pagination";
import { FavCrdsContext } from "../Context/Context";
import Swal from "sweetalert2";

const Cards: FunctionComponent = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 5;
    const { isLoggedIn, isAdmin } = useUser();
    const navigate: NavigateFunction = useNavigate();
    const { favorites, setFavorites } = useContext(FavCrdsContext);
    const handleFavoriteToggle = (card: Card) => {
        const isFavorite = favorites.some((fav) => fav._id === card._id);

        if (isFavorite) {
            const updatedFavorites = favorites.filter((fav) => fav._id !== card._id);
            setFavorites(updatedFavorites);
            Swal.fire("Removed!", "The card has been removed from your favorites.", "success");
        } else {
            setFavorites([...favorites, card]);
            Swal.fire("Added!", "The card has been added to your favorites.", "success");
        }
    };
    useEffect(() => {
        getAllCards()
            .then((res) => {
                setCards(res.data);
                setIsLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);


    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    return (
        <>
            <h1>Cards</h1>
            <div className="cardmaindiv">
                {loading ? (
                    <div className="loader">
                        <div className="box1"></div>
                        <div className="box2"></div>
                        <div className="box3"></div>
                    </div>
                ) : currentCards.length ? (
                    currentCards.map((card: Card) => (
                        <div className="card" key={card._id}>
                            <div
                                style={{ backgroundImage: `url(${card.image.url})` }}
                                className="card-img-top"
                            ></div>
                            <div className="card-body">
                                <h5 className="">{card.title}</h5>
                                <h6 className="">{card.subtitle}</h6>
                                <p className="card-text">Phone: {card.phone}</p>
                                <p className="card-text">
                                    Address: {card.address.street} {card.address.houseNumber}{" "}
                                    {card.address.city}
                                </p>
                                <p className="card-text">Card Number: {card.bizNumber}</p>
                                <div className="cardbtn"></div>
                                <div className="cardbtndiv">
                                    <div className="adminandbcusinessbtn">
                                        {isAdmin && (
                                            <button
                                                onClick={() => {
                                                    navigate("/updatecard");
                                                }}
                                                className="btn"
                                            >
                                                <i className="fa-solid fa-pen"></i>
                                            </button>
                                        )}
                                        {isAdmin && (
                                            <button className="btn">
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        )}
                                    </div>
                                    {isLoggedIn && (
                                        <div className="favandphonediv">
                                            <button onClick={() => { }} className="btn">
                                                <i className="fa-solid fa-phone"></i>
                                            </button>
                                            <button className="btn" onClick={() => handleFavoriteToggle(card)}>
                                                <i className="heartbtn fa-solid fa-heart"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No cards found</p>
                )}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(cards.length / cardsPerPage)}
                onPageChange={setCurrentPage}
            />
        </>
    );
};

export default Cards;


