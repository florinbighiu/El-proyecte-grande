import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 500) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button
            className={`${isVisible ? 'block' : 'hidden'
                } fixed bottom-4 right-4 p-2 bg-rose-400 shadow-lg text-white rounded-full focus:outline-none hover:bg-rose-500 transition-all`}
            onClick={scrollToTop}
        >
            <FaArrowUp />
        </button>
    );
};

export default BackToTopButton;
