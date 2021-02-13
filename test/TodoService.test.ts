import { Todo } from "../src/model/Todo";
import { TodoServiceImpl } from "../src/service/impl/TodoServiceImpl";
import { TodoRepository } from "../src/repository/TodoRepository";
import { servicesVersion } from "typescript";
import { rejects } from "assert";
import { resolve } from "path";

const mockTodoList: Todo[] = [
    {
        id: 1,
        title: 'test1',
        description: 'test1'
    },
    {
        id: 2,
        title: 'test2',
        description: 'test2'
    },
];

const mockTodo: Todo = {
    id: 1,
    title: 'test1',
    description: 'test1'
};

function createMockTodoRepository(): TodoRepository{
    const mockRepository: TodoRepository = {
        getAll: jest.fn(() => new Promise<Todo[]>((resolve) => resolve(mockTodoList))),
        get: jest.fn((id: number) => new Promise<Todo>((resolve) => {
            if(id === 1) resolve(mockTodo);
        })),
        create: jest.fn((todo: Todo) => new Promise<string>((resolve) => resolve(todo.id?.toString()))),
        update: jest.fn((id: number, todo: Todo) => new Promise<string>((resolve) => resolve(''))),
        delete: jest.fn((id: number) => new Promise<string>((resolve) => resolve('')))
    };
    return mockRepository;
};

describe('TodoService 正常系テスト', () => {
    it('getAll', async () => {
        const mockRepository = createMockTodoRepository();
        const service = new TodoServiceImpl(mockRepository);
        const todoList = await service.getAll();
        expect(todoList).toEqual(mockTodoList);
    });
    it('get', async () => {
        const mockRepository = createMockTodoRepository();
        const service = new TodoServiceImpl(mockRepository);
        const todo = await service.get(1);
        expect(todo).toEqual(mockTodo);
    });
});