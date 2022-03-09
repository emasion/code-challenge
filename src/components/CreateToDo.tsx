import React from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {useForm} from "react-hook-form";
import {IForm, IToDo} from "../interface";
import {categoryState, toDoState} from "../atom";
import {setLocalStorageToDo} from "../localStorage";

function CreateToDo() {
    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState);
    const handleValid = ({toDo}: IForm) => {
        setToDos(oldToDos => {
            const newToDos:IToDo[] = [{
                id: Date.now(),
                text: toDo,
                category
            }, ...oldToDos]
            setLocalStorageToDo(newToDos);
            return newToDos;
        });
        setValue("toDo", "");
    }
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {
                       ...register("toDo", {
                           required: "please write a to do"
                       })
                   } placeholder="write here"/>
            <button>Add</button>
        </form>
    )
}

export default CreateToDo;