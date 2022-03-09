import React from "react";
import CreateToDo from "./components/CreateToDo";
import {useRecoilState, useRecoilValue} from "recoil";
import {categoryState, toDoSelector} from "./atom";
import ToDo from "./components/ToDo";
import {setLocalStorageCategory} from "./localStorage";
import {Categories} from "./interface";

function TodoList() {
    const toDos = useRecoilValue(toDoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
        const {currentTarget: {value}} = event;
        // set local storage - category
        setLocalStorageCategory(value as any);
        // set value
        setCategory(value as any);
    }
    console.log(toDos);
    return (
        <div>
            <h1>To Dos</h1>
            <hr/>
            <form>
                <select value={category} onInput={onInput}>
                    <option value={Categories.TO_DO}>To Do</option>
                    <option value={Categories.DOING}>Doing</option>
                    <option value={Categories.DONE}>Done</option>
                </select>
            </form>
            <CreateToDo/>
            <ul>
                {toDos?.map(toDo => (
                    <ToDo key={toDo.id} {...toDo}/>
                ))}
            </ul>
        </div>
    )
}

export default TodoList;