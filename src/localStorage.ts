import {Categories, IToDo} from "./interface";

const STORAGE_KEY = "toDoList"
const CATEGORY_KEY = "category"

export const setLocalStorageToDo = (newToDos:IToDo[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newToDos));
}

export const getLocalStorageToDo = () => {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

export const setLocalStorageCategory = (newCategory:string) => {
    localStorage.setItem(CATEGORY_KEY, newCategory);
}

export const getLocalStorageCategory = () => {
    return localStorage.getItem(CATEGORY_KEY) as any || Categories.TO_DO;
}