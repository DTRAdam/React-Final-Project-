import { FunctionComponent, useContext, useEffect, useState } from "react";
import { Card } from "../interfaces/cards";
import { deleteCard, getBusinessCardsUser, getCardById, likeUnlikeCard } from "../services/cardsService";
import AddCardModal from "./AddCardModal";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useUser from "../hooks/useUser";
import Swal from "sweetalert2";

interface MyCardsProps {

}


const MyCards: FunctionComponent<MyCardsProps> = () => {
    const navigate: NavigateFunction = useNavigate()
    const [myCards, setMyCards] = useState<Card[]>([])
    const [openAddModal, setOpenAddModal] = useState<boolean>(false)
    const [myCardsChanged, setMyCardsChanged] = useState<boolean>(false)
    const { isBusiness } = useUser()
    const handleDelete = async (cardId: string) => {
        try {

            const result = await Swal.fire({
                title: "Are you sure you want to delete this card?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, delete it!",
                cancelButtonText: "No, keep it",
            });

            if (result.isConfirmed) {

                await deleteCard(cardId);


                setMyCards((prevCards) => prevCards.filter((card) => card._id !== cardId));


                Swal.fire("Deleted!", "The card has been deleted.", "success");
            } else {
                Swal.fire("Cancelled", "The card is safe.", "error");
            }
        } catch (error) {
            console.error("Error deleting card:", error);
            Swal.fire("Error", "There was a problem deleting the card. Please try again.", "error");
        }
    };

    useEffect(() => {
        getBusinessCardsUser().then((res) => {
            setMyCards(res.data)
        }).catch((err) => {
            console.log(err)
        }
        )
    }, [myCardsChanged])

    let refresh = () => {
        setMyCardsChanged(!myCardsChanged)
    }
    // {
    //     console.log(Card._id)
    // }
    return (

        <>

            <h1 className=" display-2">My Cards</h1>
            <div className="mycardmaindiv">
                {
                    myCards.length ? (myCards.map((card: Card) => (
                        <div className="card" key={card._id} >
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
                                        {isBusiness && <button onClick={() => { navigate("/updatecard") }} className="btn"><i className="fa-solid fa-pen"></i></button>}
                                        {isBusiness && <button className="btn" onClick={() => handleDelete(card._id!)}><i className="fa-solid fa-trash"></i></button>}
                                    </div>
                                    <div className="favandphonediv">
                                        <button onClick={() => { }} className="btn"><i className="fa-solid fa-phone"></i></button>
                                        <button className="btn" onClick={() => { }}><i className="fa-solid fa-heart"></i></button>
                                    </div>
                                </div>
                            </div>

                        </div>


                    ))) : (<p>No cards found</p>)
                }
            </div >
            <div>
                {< button onClick={() => setOpenAddModal(true)} className="btn btn-primary"><i className="fa-solid fa-plus "> Add Card</i></button >
                }
            </div>
            <AddCardModal
                show={openAddModal}
                onHide={() => { setOpenAddModal(false) }}
                refresh={refresh} />
            <AddCardModal
                show={openAddModal}
                onHide={() => { setOpenAddModal(false) }}
                refresh={refresh}
            />
        </>
    );
}

export default MyCards;