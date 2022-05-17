import React, {ReactElement} from 'react';
import FAQ_DATA from "../../config/faqData";

const FaqPage = (): ReactElement => {

    return (
        <div id="faqPage" className="container pb-5">
            <div className="container  border-bottom">
                <h1>Frequently Asked Questions</h1>
            </div>

            <br />

            <div className="container">
                {FAQ_DATA?.map((entry) => (
                    <div className="">
                        <h4>{entry.question}</h4>
                        <p>{entry.answer}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FaqPage;