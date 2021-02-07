import {Todo} from "../model/Todo";

export interface TodoService {
    getAll(): Promise<Todo[]>;
    get(id: number): Promise<Todo>;
    create(todo: Todo): Promise<string>;
    update(id: number, todo: Todo): Promise<string>;
    delete(id: number): Promise<string>;
}
