// Sidebar.jsx

import { useRef, useState } from 'react';
import "./sidebar.css";

const blocks=[

    {
        name: "Hosting",
        icon: "storage",
        items: [
            {name: "API Keys", icon: "key"},
            //more items
        ],
    },
    //more blocks
];

const Icon=({children}) => (
    <span className="material-icons">
        {children}
    </span>
);

const Button =
({name,icon, isOpen, hasToggle, onClick}) => (
    <button type="button" onClick={onClick}>
        <Icon>{icon}</Icon>
        <p>{name}</p>
        {hasToggle &&
            <Icon>{isOpen ? "remove": "add"}
            </Icon>}
    </button>
);

const Block=({name, icon, items}) => {
    const [isOpen, setIsOpen]= useState(false);

    const itemsRef = useRef();
    
    return (
        <li className={`block ${isOpen ? "open" : ""}`}>
            <Button
                name={name}
                icon={icon}
                isOpen={isOpen}
                hasToggle={true}
                onClick={() => setIsOpen(!isOpen)}
            />
            <div
                className="block-items"
                style={{
                    height: isOpen
                    ? itemsRef.current.clientHeight
                    :0
                }}
            >
                <ul className="block-items" ref={itemsRef}>
                    {items.map((item, index) => (
                        <li key={index}>
                            <Button
                                name={item.name} icon={item.icon} />
                        </li>
                    ))}
                </ul>                
            </div>
        </li>
    );
};

export const Sidebar =() => {
    const [isOpen, setIsOpen] =
            useState(false);
    return (
        <aside
            className={
                `sidebar ${isOpen ? "open" : ""}`
            }
        >
            <h2 className="header">
                <Icon>settings</Icon>
                <span>Settings</span>
            </h2>
            <ul className="blocks">
                {blocks.map((block, index) => (
                    <Block
                        key={index}
                        name={block.name}
                        icon={block.icon}
                        items={block.items}
                    />
                ))}
            </ul>
        </aside>
    );
};
