import React, { useState, useEffect } from 'react';
import defenders from '../defenders.json'; // Import the defenders data
import attackers from '../attackers.json'; // Import the attackers data

export default function Randomizer() {
    const [randomOperator, setRandomOperator] = useState(null);
    const [type, setType] = useState('attackers');

    const getRandomItem = (items) => items[Math.floor(Math.random() * items.length)];

    const getRandomAttributes = (operator) => {
        const primaryWeapon = getRandomItem(operator.weapons.primary);
        const secondaryWeapon = getRandomItem(operator.weapons.secondary);
        const gadget = getRandomItem(operator.gadgets);
        const strategy = type === 'attackers' ? getRandomItem(['Rush', 'Slow Push']) : getRandomItem(['Anchor', 'Roam']);

        return {
            name: operator.name,
            primaryWeapon: {
                name: primaryWeapon.name,
                scope: getRandomItem(primaryWeapon.scopes),
                attachment: getRandomItem(primaryWeapon.attachments),
                grip: getRandomItem(primaryWeapon.grips),
            },
            secondaryWeapon: {
                name: secondaryWeapon.name,
                scope: getRandomItem(secondaryWeapon.scopes),
                attachment: getRandomItem(secondaryWeapon.attachments),
                grip: getRandomItem(secondaryWeapon.grips),
            },
            gadget: gadget.name,
            strategy: strategy,
        };
    };

    const handleRandomize = (type) => {
        setType(type);
        const selectedOperators = JSON.parse(localStorage.getItem('clickedImages')) || [];
        const allOperators = type === 'attackers' ? attackers : defenders;
        const filteredOperators = allOperators.filter((op) => !selectedOperators.includes(op.name));
        if (filteredOperators.length > 0) {
            const randomOperator = getRandomItem(filteredOperators);
            setRandomOperator(getRandomAttributes(randomOperator));
        }
    };

    function removeAccents(str) {
        return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ø/g, 'o').replace(/Ø/g, 'O').toLowerCase();
    }

    return (
        <div id="second" className="min-w-full snap-start p-8 box-border flex items-center justify-center h-full">
            <div className="text-white text-center">
                <div className="mb-4">
                    <button onClick={() => handleRandomize('attackers')}
                            className="mx-2 p-2 px-4 text-black rainbow text-3xl transition-all hover:scale-105 pt-3 bg-blue-500 transition-bg rounded border-b-4 border-blue-500 hover:border-cyan-200 hover:bg-gradient-to-b from-blue-500 to-cyan-400">Attacker
                    </button>
                    <button onClick={() => handleRandomize('defenders')}
                            className="mx-2 p-2 px-4 text-black rainbow text-3xl transition-all hover:scale-105 pt-3 bg-orange-500 transition-bg rounded border-b-4 border-orange-500 hover:border-cyan-200 hover:bg-gradient-to-b from-orange-500 to-cyan-400">Defender
                    </button>
                </div>
                {randomOperator && (
                    <div
                        className="flex flex-row border-2 border-gray-800 rounded-xl shadow-2xl bg-gray-800 border-opacity-60 bg-opacity-40">
                        <img src={`./images/${type}/${removeAccents(randomOperator.name)}.png`}
                             alt={randomOperator.name}
                             className="mx-auto mr-4 rounded-l-xl" />
                        <div className="flex flex-col">
                            <div className="flex flex-row items-center mb-4">
                                <img src={`./icons/${type}/${removeAccents(randomOperator.name)}badge.png`} alt={randomOperator.name}
                                     className="h-24 mr-5"/>
                                <h3 className="text-7xl rainbow">{randomOperator.name}</h3>
                            </div>
                            <div className="flex flex-row mb-4">
                                <div className="flex flex-col mx-6">
                                    <p className="font-bold text-2xl">{randomOperator.primaryWeapon.name}</p>
                                    <p>{randomOperator.primaryWeapon.scope}</p>
                                    <p>{randomOperator.primaryWeapon.attachment}</p>
                                    <p>{randomOperator.primaryWeapon.grip}</p>
                                </div>
                                <span className="border-r-2 border-gray-300 opacity-70 rounded-3xl"/>
                                <div className="flex flex-col mx-6">
                                    <p className="font-bold text-2xl">{randomOperator.secondaryWeapon.name}</p>
                                    <p>{randomOperator.secondaryWeapon.scope}</p>
                                    <p>{randomOperator.secondaryWeapon.attachment}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <p className="font-semibold text-2xl">{randomOperator.gadget}</p>
                                <p className="font-semibold text-2xl">{randomOperator.strategy}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}