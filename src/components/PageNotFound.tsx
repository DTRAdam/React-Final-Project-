import { FunctionComponent } from "react";

interface PageNotFoundProps {

}

const PageNotFound: FunctionComponent<PageNotFoundProps> = () => {
    return (
        <>
            <h1 className="display-1">404 PAGE NOT FOUND <i className="fa-solid fa-exclamation"></i></h1>
        </>
    );
}

export default PageNotFound;