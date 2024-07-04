import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlickSlider from "react-slick";
import { usePage } from "@inertiajs/react";

const Slider = ({ images }) => {

    const { app, product } = usePage().props

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    return (
        <SlickSlider {...settings}>
            {images.map((image, index) => (
                <div key={index}>
                    <img src={app.storage_url + '/' + image.image} className="h-[400px] w-full" />
                </div>
            ))}
        </SlickSlider>
    )
}

export default Slider