import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import SlickSlider from "react-slick";

const Slider = () => {

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
            <div>
                <img src="https://placehold.co/600x400" alt="image1" className="w-full" />
            </div>
            <div>
                <img src="https://placehold.co/600x400" alt="image2" className="w-full" />
            </div>
            <div>
                <img src="https://placehold.co/600x400" alt="image3" className="w-full" />
            </div>
            <div>
                <img src="https://placehold.co/600x400" alt="image4" className="w-full" />
            </div>
        </SlickSlider>
    )
}

export default Slider