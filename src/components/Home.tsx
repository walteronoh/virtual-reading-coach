import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Book_Contents } from "../resources/books.resources";

function Home() {
    const { loading, error, data } = useQuery(Book_Contents);
    useEffect(() => {
        console.log(data, '\n', loading, '\n', error);
    }, [data, loading, error]);

    return (
        <div>
            <header>
                <h5>Virtual Reading Coach</h5>
                <p>{process.env.REACT_APP_BASE_URL}</p>
            </header>
        </div>
    );
}

export default Home;