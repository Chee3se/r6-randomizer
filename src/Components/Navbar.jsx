import React, { useEffect, useState, useRef } from "react";

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('first');
    const [underlineStyle, setUnderlineStyle] = useState({});
    const navRef = useRef(null);

    useEffect(() => {
        const sections = document.querySelectorAll('.sections > div');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);

    useEffect(() => {
        const activeLink = navRef.current.querySelector(`a[href="#${activeSection}"]`);
        if (activeLink) {
            setUnderlineStyle({
                left: activeLink.offsetLeft,
                width: activeLink.offsetWidth
            });
        }
    }, [activeSection]);

    const handleLinkClick = (event, sectionId) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav ref={navRef} className="fixed top-0 w-full bg-black font-black text-white text-center p-4">
            <a href="#operators" className="mx-4" onClick={(e) => handleLinkClick(e, 'operators')}>Operators</a>
            <a href="#randomizer" className="mx-4" onClick={(e) => handleLinkClick(e, 'randomizer')}>Randomizer</a>
            <div
                className="absolute bottom-3 h-0.5 bg-white transition-all duration-300"
                style={underlineStyle}
            />
        </nav>
    );
}