import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Book_Contents } from "../resources/books.resources";
import BounceLoader from "react-spinners/BounceLoader";
import Modal from "./Modal";

function Home() {
    const { loading, data } = useQuery(Book_Contents);
    const [leftPage, setLeftPage] = useState(1);
    const [rightPage, setRightPage] = useState(2);
    const [openModal, setOpenModal] = useState(false);
    const [word, setWord] = useState("");

    // Open next page function
    const goToNextPage = () => {
        let bookLen = data.book.pages.length;
        if (rightPage < bookLen) {
            setRightPage(rightPage + 2);
            setLeftPage(leftPage + 2);
        }
    }

    // Open previous page function
    const goToPreviousPage = () => {
        if (leftPage !== 1 && rightPage !== 2) {
            setLeftPage(leftPage - 2);
            setRightPage(rightPage - 2);
        }
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
        // set word state
        setWord(strArr[0].value);
        // open Modal
        handleOpenModal();
    }

    // Function to open modal
    const handleOpenModal = () => setOpenModal(true);

    // Function to close modal
    const handleCloseModal = () => setOpenModal(false);


    if (loading) return <div className="loader"><BounceLoader /></div>

    return (
        <>
            <Modal isOpen={openModal} text={word} onRequestClose={handleCloseModal} />
            <div className="page">
                <header>
                    <h2>Virtual Reading Coach</h2>
                </header>
                <main>
                    <div className="leftPage">
                        <p onClick={() => getStringValue(leftPage - 1)}>{data.book.pages[leftPage - 1].content}</p>
                        <button onClick={goToPreviousPage} className="leftPageBtn">Back</button>
                        <div className="leftPageNo">{leftPage}</div>
                    </div>
                    <div className="rightPage">
                        <p onClick={() => getStringValue(rightPage - 1)}>{data.book.pages[rightPage - 1].content}</p>
                        <button onClick={goToNextPage} className="rightPageBtn">Next</button>
                        <div className="rightPageNo">{rightPage}</div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;