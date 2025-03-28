import {atom} from 'jotai';

export const editorState = atom(null);

export const accordionState = atom({
    "Programming Languages": false,
    "Frontend Development": false,  
    "Backend Development": false,
    "Databases & Data Storage": false, 
    "Cloud & DevOps": false,
    "Software & Tools": false,
    "Operating Systems": false,
    "Game Development": false
});