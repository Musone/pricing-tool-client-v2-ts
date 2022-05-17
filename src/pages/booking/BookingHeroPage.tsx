import React, {Component, ReactElement} from 'react';
import HERO from '../../assets/images/hero.jpg'
import {Link} from "react-router-dom";
import {findACounselorRoute} from "../../config/routes";

const BookingHeroPage = (): ReactElement => {
    const imgNames: string[] = [
        "hero", "student"
    ];

    return (
        <div id="homeContainer" className="container pb-5">
            <div className="row">
                <div className="col" id="slideShowColumn">
                     <img src={HERO} alt={'Hero'} />
                </div>

                <div className="col">
                    <h1 className="vertical-center">
                        <b>
                            Affordable Mental Health for{" "}
                            <span style={{color: "var(--secondary_1)"}}>Everyone.</span>
                        </b>
                    </h1>
                </div>
            </div>

            <div
                className="container" id="missionStatement"
                style={{
                    paddingLeft: "10%",
                    paddingRight: "10%",
                    paddingTop: "5%",
                    paddingBottom: "5%",
                }}
            >
                <h3>
                    <b>
                        We believe that mental health care service should be available for
                        everyone. Let us find the{" "}
                        <span style={{color: "var(--secondary_1)"}}>right</span> counselor
                        for you!
                    </b>
                </h3>
            </div>

            <div className="container" id="letsGoButton">
                <Link to={findACounselorRoute.path}>
                    <button className="primary-button">
                        {findACounselorRoute.name}
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default BookingHeroPage;