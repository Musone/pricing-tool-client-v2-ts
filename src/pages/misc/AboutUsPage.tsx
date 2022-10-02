import React, {Component, ReactElement} from 'react';
import '../../assets/css/index.css'
import ExternalRedirect from "../../components/ExternalRedirect";
import config from "../../config/config";

const AboutUsPage = (): ReactElement => {

    return <ExternalRedirect redirectLink={config.aboutUsUrl} />
    /*return (
        <div className={'container'} id="aboutPage" style={{ paddingBottom: "10vh" }}>
            <div className="row row-spacing">
                <div className="col col-md-12 p-2">
                    <h1 className="text-center display-3">Our Story</h1>
                </div>
            </div>
            <div className="row row-spacing">
                <div className="col col-md-4 p-2">
                    <h1 className="vertical-center">
                        <b>
                            Phare is a
                            <span style={{ color: "var(--secondary_1)" }}> community</span>, a
                            <span style={{ color: "var(--secondary_2)" }}> mission</span>, and
                            a<span style={{ color: "var(--secondary_3)" }}> revolution</span>.
                        </b>
                    </h1>
                </div>
                <div className="col col-md-4 p-2">
                    <p>{/!*{ABOUT_US_DATA1}*!/} Lorem ipsum dolor sit amet, consectetur adipisicing elit. At beatae consectetur, consequatur corporis ea eius est expedita iure laudantium libero, natus neque nihil pariatur, repellat suscipit temporibus totam vitae voluptate. </p>
                </div>
                <div className="col col-md-4 p-2">
                    <p>{/!*{ABOUT_US_DATA2}*!/} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid animi autem blanditiis consequuntur debitis dicta dolores eos, et facere harum labore odit omnis, pariatur perferendis, quod tenetur vel veritatis. </p>
                </div>
            </div>
            <div className="row row-spacing">
                <div className="col col-md-12 p-2">
                    <h1 className="text-center display-3">Our Values</h1>
                </div>
            </div>
            <div className="row row-spacing">
                <div className="col col-md-6 p-2">
                    <h2 className="text-center">
                        <b><span style={{ color: "var(--secondary_1)" }}>Sustainability</span></b>
                    </h2>
                    <p>
                        We believe in creating something that’s great for today and every
                        day after.
                    </p>
                </div>
                <div className="col col-md-6 p-2">
                    <h2 className="text-center">
                        <b><span style={{ color: "var(--secondary_1)" }}>Fairness</span></b>
                    </h2>
                    <p>
                        Be reasonable, be honest, and be inclusive.{" "}
                    </p>
                </div>
            </div>
            <div className="row row-spacing">
                <div className="col col-6 p-2">
                    <h2 className="text-center">
                        <b><span style={{ color: "var(--secondary_1)" }}>Generosity</span></b>
                    </h2>
                    <p>
                        Take care of yourself and take care of each other.
                    </p>
                </div>
                <div className="col col-6 p-2">
                    <h2 className="text-center">
                        <b><span style={{ color: "var(--secondary_1)" }}>Equality</span></b>
                    </h2>
                    <p>
                        Whatever walk of life you come from, we're here for you. Our
                        priority is to always make space for everyone
                    </p>
                </div>
            </div>
        </div>
    );*/
}

export default AboutUsPage;