import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    return (
        <>
            <ul className="footerul">
                <li>
                    <i className="fa-solid fs-3 fa-circle-exclamation "></i>

                    <Link className="link" to={"/about"}>About</Link>
                </li>
                {<li>
                    <i className="fa-solid fs-3 fa-heart"></i>
                    <Link className="link" to={"/favoritecrad"}>Favorites</Link>
                </li>}
                {<li>
                    <i className="fa-regular fs-3 fa-id-card"></i>
                    <Link className="link" to={"/mycards"}>My Cards</Link>
                </li>}
            </ul>
        </>
    );
}

export default Footer;