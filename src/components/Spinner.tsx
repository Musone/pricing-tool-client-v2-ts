import React, {Component, FunctionComponent, ReactElement} from 'react';

const Spinner: FunctionComponent = (): ReactElement => {
        return (
            <div id="wrapper">
                <div className="profile-main-loader">
                    <div className="loader">
                        <svg className="circular-loader" viewBox="25 25 50 50">
                            <circle className="loader-path" cx="50" cy="50" r="20" fill="none" stroke="#70c542"
                                    strokeWidth="2"/>
                        </svg>
                    </div>
                </div>
            </div>
        );
}

export default Spinner;