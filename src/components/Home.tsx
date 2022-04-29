import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Book_Contents } from "../resources/books.resources";
// import Page from "./Page";

function Home() {
    const { loading, data } = useQuery(Book_Contents);
    const [currentPage, setCurrentPage] = useState(0);
    if (!loading) {
        console.log(data.book.pages[1].content[2], '\n');
        console.log(data.book.pages[1]);
    }

    // Open next page function
    const goToNextPage = () => {
        setCurrentPage(currentPage + 1);
    }

    // Open previous page function
    const goToPreviousPage = () => {
        if (currentPage > 0) setCurrentPage(currentPage - 1);
    }

    // Get String value
    const getStringValue = (page: any) => {
        // Return a Selection Object representing the range of text selected by the user.
        let s = window.getSelection();
        // Return a Range Object representing one of the range currently selected.
        let range = s?.getRangeAt(0);
        // Return a number representing where in the start container the range starts
        let startOffset = range?.startOffset;
        // Filter tokens using the startOffset
        let strArr = data.book.pages[page].tokens.filter((token: any) => (token.position[0] <= startOffset!) && (token.position[1] >= startOffset!));
        alert(strArr[0].value)
    }

    if (loading) return <div> Loading! </div>

    return (
        <div className="page">
            <header>
                <h5>Virtual Reading Coach</h5>
            </header>
            <main>
                <div className="leftPage">
                    <pre onClick={() => getStringValue(currentPage)}>{data.book.pages[currentPage].content}</pre>
                    <button onClick={goToPreviousPage} className="leftPageBtn">Left</button>
                    <div className="leftPageNo">1</div>
                </div>
                <div className="rightPage">
                    <pre onClick={() => getStringValue(currentPage + 1)}>{data.book.pages[currentPage + 1].content}</pre>
                    <button onClick={goToNextPage} className="rightPageBtn">Right</button>
                    <div className="rightPageNo">2</div>
                </div>
            </main>
        </div>
    );
}

export default Home;