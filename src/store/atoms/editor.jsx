import {atom} from 'jotai';

export const editorState = atom(null);

export const accordionState = atom({
    "Programming Languages": false,
    "Frontend Development": true,  // This one is open
    "Backend Development": false,
    "Databases & Data Storage": true, // This one is also open
    "Cloud & DevOps": false,
    "Software & Tools": false,
    "Operating Systems": false,
    "Game Development": false
});