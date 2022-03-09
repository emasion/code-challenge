import {atom, selector} from "recoil";
import {Categories, IToDo} from "./interface";
import {getLocalStorageCategory, getLocalStorageToDo} from "./localStorage";

export const categoryState = atom<Categories>({
    key: "category",
    default: getLocalStorageCategory()
})

export const toDoState = atom<IToDo[]>({
    key: "toDo",
    default: getLocalStorageToDo()
})

// selector - output control
export const toDoSelector = selector({
    key: "toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState);
        const category = get(categoryState);
        if(category === Categories.TO_DO) return toDos.filter(toDo => toDo.category === Categories.TO_DO);
        if(category === Categories.DOING) return toDos.filter(toDo => toDo.category === Categories.DOING);
        if(category === Categories.DONE) return toDos.filter(toDo => toDo.category === Categories.DONE);
    }
})