import Calendar from "@/Components/Calendar";
import Slider from "@/Components/Slider";
import FrontLayout from "@/Layouts/FrontLayout"
import { Head, useForm } from "@inertiajs/react"
import { FaStar } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { useRef, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { format } from "date-fns";
import parse from "html-react-parser";

const Show = ({ product }) => {
    const calendarRef = useRef();

    const { data, post } = useForm();

    const [changeQuantity, setChangeQuantity] = useState(false);
    const [adultQuantity, setAdultQuantity] = useState(1);
    const [childQuantity, setChildQuantity] = useState(0);
    const [youthQuantity, setYouthQuantity] = useState(0);

    const calculateSelectedQuantity = () => {
        let selectedQuantity = "";
        if (adultQuantity > 0) {
            selectedQuantity = `${selectedQuantity} ${adultQuantity} Adult,`
        }
        if (childQuantity > 0) {
            selectedQuantity = `${selectedQuantity}${childQuantity} Child,`
        }
        if (youthQuantity > 0) {
            selectedQuantity = `${selectedQuantity} ${youthQuantity} Youth`
        }
        return selectedQuantity
    }

    const bookNow = () => {
        const selectedDay = calendarRef.current.getCalendarState().selectedDay
        const date = format(selectedDay, 'yyyy-MM-dd')
        const quantity = calculateSelectedQuantity()

        data.date = date
        data.quantity = quantity
        data.product_id = product.id

        post(route('bookings.store'), data)
    }

    return (
        <FrontLayout>
            <Head title="Product Detail" />
            <div className="max-w-screen-xl mx-auto p-4 mb-[50px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-2">
                        <Slider />
                    </div>
                    <div className="flex flex-col">
                        <span>Latitude: 12.9716</span>
                        <span>Longitude: 77.5946</span>
                        <span>Height: 2.5m</span>
                        <span>Location: Manaslu, Gorkha</span>
                        <span>Country: Nepal</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="py-2">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <div className="flex flex-wrap items-center gap-1">
                            <FaStar className="w-3 sm:w-3.5" />
                            <FaStar className="w-3 sm:w-3.5" />
                            <FaStar className="w-3 sm:w-3.5" />
                            <FaStar className="w-3 sm:w-3.5" />
                            <FaStar className="w-3 sm:w-3.5" />
                            <div className="flex gap-[7px] ml-1 items-center">
                                <div className="text-sm 2xl:text-standard">
                                    5.0
                                </div>
                                <div className="p-[1.5px] md:p-[2px] rounded-full bg-gray-500"></div>
                                <span className="text-sm 2xl:text-standard text-gray-700 dark:text-gray-400">
                                    237 Ratings
                                </span>
                            </div>
                        </div>
                        <div className="border-t-2 mt-4 py-4">
                            <p>{product.excerpt}</p>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex items-center gap-1">
                                    <span><FaClock className="w-6" size={17} /></span>
                                    <span className="text-base font-medium md:text-med">
                                        Duration:
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-500">
                                        17 days
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span><RxCrossCircled className="w-6" size={20} /></span>
                                    <span className="text-base font-medium md:text-med">
                                        Cancellation:
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-500">
                                        1 day
                                    </span>
                                </div>
                            </div>
                            <div className="no-tailwindcss-base">
                                {parse(product.description)}
                            </div>
                        </div>
                    </div>
                    <div className="place-self-center">
                        <div className="border border-gray-700 rounded p-2 flex flex-wrap cursor-pointer relative mt-4 mb-4" onClick={() => setChangeQuantity(!changeQuantity)}>
                            <div className="flex justify-start gap-1 items-start text-sm md:text-base pr-2">
                                {calculateSelectedQuantity()}
                                <div className="absolute right-2 top-2.5">
                                    {changeQuantity ? <FaArrowUp /> : <FaArrowDown />}
                                </div>
                            </div>
                        </div>
                        {changeQuantity &&
                            <div className="border-2 rounded-lg border-gray-700 p-4">
                                <div className="flex items-center justify-between md:justify-start md:gap-3 w-full mb-2">
                                    <FaPlusCircle size={20} onClick={() => setAdultQuantity(adultQuantity + 1)} />
                                    <span className="w-2">{adultQuantity}</span>
                                    <FaMinusCircle size={20} onClick={() => adultQuantity > 1 && setAdultQuantity(adultQuantity - 1)} />
                                    <div className="text-sm md:text-standard">Adult</div>
                                </div>
                                <div className="flex items-center justify-between md:justify-start md:gap-3 w-full mb-2">
                                    <FaPlusCircle size={20} onClick={() => setChildQuantity(childQuantity + 1)} />
                                    <span className="w-2">{childQuantity}</span>
                                    <FaMinusCircle size={20} onClick={() => childQuantity && setChildQuantity(childQuantity - 1)} />
                                    <div className="text-sm md:text-standard">Child</div>
                                </div>
                                <div className="flex items-center justify-between md:justify-start md:gap-3 w-full">
                                    <FaPlusCircle size={20} onClick={() => setYouthQuantity(youthQuantity + 1)} />
                                    <span className="w-2">{youthQuantity}</span>
                                    <FaMinusCircle size={20} onClick={() => youthQuantity && setYouthQuantity(youthQuantity - 1)} />
                                    <div className="text-sm md:text-standard">Youth</div>
                                </div>
                            </div>
                        }
                        <Calendar ref={calendarRef} />
                        <PrimaryButton onClick={bookNow}>
                            Book Now
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </FrontLayout>
    )
}

export default Show