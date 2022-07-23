import React, {ChangeEvent, Component, FunctionComponent, ReactElement, useState} from 'react';
import HERO from '../../assets/images/hero.jpg'
import {Link} from "react-router-dom";
import {findACounselorRoute} from "../../constants/generalRoutes";
import PrimaryButton_1 from "../../components/buttons/PrimaryButton_1";
import PrimaryButton_2 from "../../components/buttons/PrimaryButton_2";

const BookingHeroPage: FunctionComponent = (): ReactElement => {

    return (
        <div className={"w-screen h-auto flex justify-center "}>
            <div className={"flex flex-col items-start lg:items-center h-fit py-28 w-3/4 gap-10"}>
                <div className="flex flex-col lg:flex-row gap-10 max-w-fit">

                    <img src={HERO} alt={'Hero'}/>
                    <div className={"self-center max-w-lg h-fit"}>
                    <span className={"text-5xl font-bold"}>
                        Affordable Mental Health for{" "}
                        <span className={"text-secondary_4"}>Everyone.</span>
                    </span>
                    </div>

                </div>

                <div className={"flex flex-col justify-evenly gap-5"}>
                    <div className={"flex flex-col"}>
                        <span className={"text-2xl font-bold"}>We believe that mental health care service should be available for everyone.</span>
                        <span className={"text-2xl font-bold mt-1"}>
                                Let us find the
                                <span className={"text-secondary_4 font-bold"}> right </span>
                                counselor for you!
                            </span>
                    </div>


                    <span className={"text-2xl pl-10 font-semibold"}> {'>'} Are you looking for
                                <span className={"text-secondary_4 font-bold"}> Counselors</span>
                                , or
                                <span className={"text-secondary_4 font-bold"}> Supervisors</span>
                                ?
                            </span>

                    <div className={"pl-20 w-full {/*bg-orange-600*/}"}>
                        <Link to={findACounselorRoute.path}>
                            <PrimaryButton_2 text={"Counselors"}/>
                        </Link>

                        <Link to={'/booking/find-a-supervisor'}>
                            <PrimaryButton_2 text={"Supervisors"}/>
                        </Link>
                    </div>

                </div>


            </div>
        </div>
    );
}

export default BookingHeroPage;