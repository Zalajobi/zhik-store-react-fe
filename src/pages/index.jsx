import React from 'react'
import Header from "../components/common/header/Header";
import Slider from "../components/home/slider/Slider";

const IndexPage = (props) => {
    return (
        <React.Fragment>
            <Header/>

            <section className="section-slide">
                <div className="wrap-slick1">
                    <div className="slick1">
                        <Slider/>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default IndexPage;