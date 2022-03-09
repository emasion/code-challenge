export interface IForm {
    toDo:string;
}

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface IToDo {
    text: string;
    id: number;
    category: Categories;
}