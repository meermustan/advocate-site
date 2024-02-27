import React, { useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const TestimonialSection = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    const testimonials = [
        {
            id: 1,
            image: 'assets/images/testimonial/01.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Raymond Lee',
            role: '- Founder',
        },
        {
            id: 2,
            image: 'assets/images/testimonial/02.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Dani Karie',
            role: '- Supervisor',
        },
        {
            id: 3,
            image: 'assets/images/testimonial/03.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Karlo Bond',
            role: '- Manager',
        },
        {
            id: 4,
            image: 'assets/images/testimonial/04.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Rain Meeta',
            role: '- Ceo',
        },
        {
            id: 5,
            image: 'assets/images/testimonial/05.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Aubee Dion',
            role: '- Ceo',
        },
        {
            id: 6,
            image: 'assets/images/testimonial/06.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Mark Beele',
            role: '- Ceo',
        },
        {
            id: 7,
            image: 'assets/images/testimonial/07.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Nicole James',
            role: '- Ceo',
        },
        {
            id: 8,
            image: 'assets/images/testimonial/08.jpg',
            text: 'AdvocateIron Amazing Landing Page All-in-one, clean code, Crative & Modern design Professional Recommended crofessional and great experience, Nam pulvinar vitae neque et porttitor, Praesent sed nisi eleifend, adipisicing elit.',
            name: 'Lena Shea',
            role: '- Ceo',
        },
    ];

    const handleAvatarClick = (index) => {
        setActiveSlide(index);
    };

    const options = {
        items: 1,
        nav: false,
        dots: false,
        loop: true,
        autoplay: true,
        autoplayTimeout: 2500,
        autoplayHoverPause: true,
    };

    return (
        <>
            <section className="bg-pos-r" data-bg-img="assets/images/bg/01.png" style={{ backgroundImage: `url(${require('../../assets/images/bg/01.png')})` }}>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8">
                            <div className="mb-5">
                                <h2><span className="font-w-4 d-block">You can see our clients</span> feedback what you say?</h2>
                            </div>
                        </div>
                    </div>
                    <div id="testimonial" className="testimonial-carousel carousel slide testimonial z-index-1"
                        data-bs-ride="carousel" data-bs-interval="2500">
                        <div className="row justify-content-center text-center">
                            <div className="col-md-7">
                                <OwlCarousel className="testimonial-carousel" {...options} startPosition={activeSlide}>
                                    {testimonials.map((testimonial, index) => (
                                        <div className="carousel-inner ">
                                            <div key={testimonial.id} className="carousel-item active">
                                                {/* <div key={testimonial.id} className={activeSlide === index ? "carousel-item active" : "carousel-item"}> */}
                                                <div className="card p-2 p-md-5 border-0">
                                                    <div className="mb-3">
                                                        <img alt="Image1"
                                                            src={require(`../../assets/images/testimonial/${testimonial.image.split('/')[3]}`)} className="shadow-primary img-fluid rounded-circle d-inline" style={{ height: '10rem', width: '10rem' }} />
                                                    </div>
                                                    <div className="card-body p-0">
                                                        <p className="lead font-w-5">{testimonial.text}</p>
                                                        <div>
                                                            <h5 className="text-primary d-inline">{testimonial.name}</h5>
                                                            <small className="text-muted fst-italic">{testimonial.role}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </OwlCarousel>
                            </div>
                        </div>

                        <div className="controls">
                            <ul className="nav justify-content-md-between justify-content-center">
                                {testimonials.map((testimonial, index) => (
                                    <li
                                        key={testimonial.id}
                                        className={activeSlide === index ? "active" : ""}
                                        data-bs-target="#testimonial"
                                        data-bs-slide-to={index}
                                        style={{ cursor: "pointer" }}
                                    >

                                        <img
                                            className="img-fluid rounded-circle shadow-primary"
                                            src={require(`../../assets/images/testimonial/${testimonial.image.split('/')[3]}`)}
                                            alt=""
                                            onClick={() => handleAvatarClick(index)}
                                        />

                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </ >
    );
};
export default TestimonialSection;
