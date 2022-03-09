import React from "react";
import {Categories, IToDo} from "../interface";
import {useSetRecoilState} from "recoil";
import {toDoState} from "../atom";
import {setLocalStorageToDo} from "../localStorage";

function ToDo({text, category, id}:IToDo) {
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        const {currentTarget : {name}} = event;
        setToDos((oldToDos => {
            const findIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDo:IToDo = {
                text,
                id,
                category: name as any
            }
            const newToDos = [...oldToDos.slice(0, findIndex), newToDo, ...oldToDos.slice(findIndex + 1)];
            // set local storage;
            setLocalStorageToDo(newToDos);
            // return new to dos
            return newToDos;
        }))
    }
    const onClickDelete = () => {
        setToDos((oldToDos => {
            const findIndex = oldToDos.findIndex(toDo => toDo.id === id);
            const newToDos = [...oldToDos.slice(0, findIndex), ...oldToDos.slice(findIndex + 1)];
            // set local storage;
            setLocalStorageToDo(newToDos);
            // return new to dos
            return newToDos;
        }))
    }
    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button name={Categories.DOING} onClick={onClick}>Doing</button>}
            {category !== Categories.TO_DO && <button name={Categories.TO_DO} onClick={onClick}>To Do</button>}
            {category !== Categories.DONE && <button name={Categories.DONE} onClick={onClick}>Done</button>}
            <button onClick={onClickDelete}>Delete</button>
        </li>
    )
}
export default ToDo;