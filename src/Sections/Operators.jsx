import React, { useState, useEffect } from 'react';

export default function Operators() {
    const [view, setView] = useState('attackers');
    const [clickedImages, setClickedImages] = useState(() => {
        const saved = localStorage.getItem('clickedImages');
        return saved ? JSON.parse(saved) : [];
    });

    const attackers = [
        'Striker', 'Sledge', 'Thatcher', 'Ash',
        'Thermite', 'Twitch', 'Montagne', 'Glaz',
        'Fuze', 'Blitz', 'IQ', 'Buck',
        'Blackbeard', 'Capitão', 'Hibana', 'Jackal',
        'Ying', 'Zofia', 'Dokkaebi', 'Lion',
        'Finka', 'Maverick', 'Nomad', 'Gridlock',
        'Nøkk', 'Amaru', 'Kali', 'Iana',
        'Ace', 'Zero', 'Flores', 'Osa',
        'Sens', 'Grim', 'Brava', 'Ram',
        'Deimos'
    ];

    const defenders = [
        'Sentry', 'Smoke', 'Mute', 'Castle',
        'Pulse', 'Doc', 'Rook', 'Kapkan',
        'Tachanka', 'Jäger', 'Bandit', 'Frost',
        'Valkyrie', 'Caveira', 'Echo', 'Mira',
        'Lesion', 'Ela', 'Vigil', 'Maestro',
        'Alibi', 'Clash', 'Kaid', 'Mozzie',
        'Warden', 'Goyo', 'Wamai', 'Oryx',
        'Melusi', 'Aruni', 'Thunderbird', 'Thorn',
        'Azami', 'Solis', 'Fenrir', 'Tubarão',
        'Skopós'
    ];

    useEffect(() => {
        localStorage.setItem('clickedImages', JSON.stringify(clickedImages));
    }, [clickedImages]);

    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/Ø/g, 'O').toLowerCase();
    }

    const handleImageClick = (name) => {
        setClickedImages((prev) =>
            prev.includes(name) ? prev.filter((img) => img !== name) : [...prev, name]
        );
    };

    const handleSelectAll = () => {
        const allNames = view === 'attackers' ? attackers : defenders;
        setClickedImages((prev) => [...new Set([...prev, ...allNames])]);
    };

    const handleDeselectAll = () => {
        const allNames = view === 'attackers' ? attackers : defenders;
        setClickedImages((prev) => prev.filter((img) => !allNames.includes(img)));
    };

    return (
        <div id="first"
             className="min-w-full snap-start p-8 box-border flex flex-col items-center justify-center h-full">
            <div className="flex justify-center mb-4 gap-4">
                <button onClick={() => setView('attackers')}
                        className={`flex flex-row items-center px-7 py-3 rainbow text-2xl rounded-xl transition-transform ${view === 'attackers' ? 'bg-blue-500 scale-105 border-blue-800 border-2' : 'bg-gray-500 opacity-60'}`}>
                    <svg className="w-7 pr-1" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
                        <path fill='%2324262a'
                              d='M8.32,19.16l-5.54,5.54H2V28h3.31v-0.79l5.54-5.54H8.32V19.16z M25.2,2L10.29,17.18L8.5,15.4l-0.94,0.94l1.87,1.87v2.36h2.36l1.87,1.87l0.94-0.94l-1.78-1.78L28,4.8V2H25.2z M21.68,19.16v2.52h-2.52l5.54,5.54V28H28v-3.31h-0.78L21.68,19.16z M14.6,11.98L4.8,2H2v2.8l9.98,9.8L14.6,11.98z M20.57,18.21l1.87-1.87L21.5,15.4l-1.78,1.78l-1.67-1.71l-2.56,2.56l1.7,1.67L15.4,21.5l0.94,0.94l1.87-1.87h2.36V18.21z'/>
                    </svg>
                    Attackers
                </button>
                <button onClick={() => setView('defenders')}
                        className={`flex flex-row items-center px-7 py-3 rainbow text-2xl rounded-xl transition-transform ${view === 'defenders' ? 'bg-red-500 scale-105 border-red-800 border-2' : 'bg-gray-500 opacity-60'}`}>
                    <svg className="w-7 pr-1" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'>
                        <path fill='%2324262a'
                              d='M19.27,9.74l-4.25,2.17L10.73,9.7L8.15,28h13.7L19.27,9.74z M21.23,7.01V2h-2.88v1.73h-1.96V2h-2.78v1.73h-1.96V2H8.77v4.96l6.25,3.51L21.23,7.01z'/>
                    </svg>
                    Defenders
                </button>
            </div>
            <div className="grid grid-cols-8 mb-4">
                {(view === 'attackers' ? attackers : defenders).map((name, index) => (
                    <div key={index} className="h-20 w-20">
                        <img
                            src={`./icons/${view}/${removeAccents(name)}badge.png`}
                            alt={name}
                            onClick={() => handleImageClick(name)}
                            className={clickedImages.includes(name) ? 'grayscale opacity-30 scale-95 hover:cursor-pointer' : 'hover:cursor-pointer'}
                        />
                    </div>
                ))}
            </div>
            <div className="flex justify-center gap-4">
                <button onClick={handleDeselectAll}
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-lg hover:bg-green-600 transition-transform transform hover:scale-105">Select
                    All
                </button>
                <button onClick={handleSelectAll}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition-transform transform hover:scale-105">Deselect
                    All
                </button>
            </div>
        </div>
    );
}