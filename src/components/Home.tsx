import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Book_Contents } from "../resources/books.resources";
// import Page from "./Page";

function Home() {
    const { loading, data } = useQuery(Book_Contents);
    const [ currentPage, setCurrentPage ] = useState(0);

    // Open next page function
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    // Open previous page function
    const goToPreviousPage = () => {
        if(currentPage > 0) setCurrentPage(currentPage - 1);
    }

    if (loading) return <div> Loading! </div>

    return (
        <div className="page">
            <header>
                <h5>Virtual Reading Coach</h5>
            </header>
            <main>
                <div className="leftPage">
                    <pre>{data.book.pages[currentPage].content}</pre>
                    <button onClick={goToPreviousPage} className="leftPageBtn">Left</button>
                    <div className="leftPageNo">1</div>
                </div>
                <div className="rightPage">
                    <pre>{data.book.pages[currentPage + 1].content}</pre>
                    <button onClick={goToNextPage} className="rightPageBtn">Right</button>
                    <div className="rightPageNo">2</div>
                </div>
            </main>
        </div>
    );
}

export default Home;