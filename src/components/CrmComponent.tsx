import { FunctionComponent, useState } from "react";
import useUser from "../hooks/useUser";
import { deleteUser, editUserbusstatus } from "../services/userService";
import { deleteAndEditUserMsg } from "../services/feedback";
import Swal from "sweetalert2";

interface CrmProps { }

const Crm: FunctionComponent<CrmProps> = () => {
    const { users, setUsers, setIsBusiness } = useUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(50);

    const handleDelete = async (userId: string) => {
        try {
            const result = await deleteAndEditUserMsg(
                "This action cannot be undone.",
                "Yes, delete it!"
            );
            if (result.isConfirmed) {
                await deleteUser(userId);
                setUsers((oldUsers) => oldUsers.filter((u) => u._id !== userId));
                Swal.fire("Deleted!", "The user has been deleted.", "success");
            } else {
                Swal.fire("Not deleted!", "Deletion canceled", "error");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleEdit = async (userId: string) => {
        try {
            const result = await deleteAndEditUserMsg(
                "Do you want to change business status?",
                "Change business status"
            );
            if (result.isConfirmed) {
                await editUserbusstatus(userId);
                setIsBusiness((oldIsBusiness) => !oldIsBusiness);
                Swal.fire("Changed!", "The user status has been changed.", "success");
            } else {
                Swal.fire("Not Changed!", "Change canceled", "error");
            }
        } catch (error) {
            console.error("Error changing user status:", error);
        }
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    const pageCount = Math.ceil(users.length / usersPerPage);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const maxVisible = 5;
        const half = Math.floor(maxVisible / 2);
        let start = Math.max(1, currentPage - half);
        let end = Math.min(pageCount, currentPage + half);

        if (currentPage <= half) {
            end = Math.min(pageCount, maxVisible);
        } else if (currentPage + half > pageCount) {
            start = Math.max(1, pageCount - maxVisible + 1);
        }

        const buttons = [];
        for (let i = start; i <= end; i++) {
            buttons.push(
                <button
                    key={i}
                    className={`btn btn-outline-primary mx-1 ${currentPage === i ? "active" : ""}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>
            );
        }
        return buttons;
    };

    return (
        <div>
            <h1 className="display-2 text-center">CRM</h1>

            <div className="container mt-5">
                {users.length ? (
                    <>
                        <div className="table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th className="col-2">Id</th>
                                        <th className="col-2">First Name</th>
                                        <th className="col-2">Last Name</th>
                                        <th className="col-2">Phone</th>
                                        <th className="col-2">Email</th>
                                        <th className="col-1">IsBusiness</th>
                                        <th className="col-1">IsAdmin</th>
                                        <th className="col-1">Edit</th>
                                        <th className="col-1">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user._id}>
                                            <td>{user._id}</td>
                                            <td>{user.name.first}</td>
                                            <td>{user.name.last}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.email}</td>
                                            <td>{user.isBusiness ? "Yes" : "No"}</td>
                                            <td>{user.isAdmin ? "True" : "False"}</td>
                                            <td>
                                                <i
                                                    className="fa-solid fa-user-pen text-warning"
                                                    onClick={() => handleEdit(user._id!)}
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            </td>
                                            <td>
                                                <i
                                                    className="fa-solid fa-user-minus text-danger"
                                                    onClick={() => handleDelete(user._id!)}
                                                    style={{ cursor: "pointer" }}
                                                ></i>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="d-flex justify-content-center crmpagination flex-wrap mt-4">
                            <button
                                className="btn previousbtn btn-secondary mx-2"
                                onClick={() => handlePageClick(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>

                            {renderPageNumbers()}

                            <button
                                className="btn nextbtn btn-secondary mx-2"
                                onClick={() => handlePageClick(currentPage + 1)}
                                disabled={currentPage === pageCount}
                            >
                                Next
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No users available</p>
                )}
            </div>
        </div>
    );
};

export default Crm;
