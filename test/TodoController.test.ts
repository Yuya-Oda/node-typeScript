import express, { Application } from 'express';
import { Todo } from "../src/model/Todo";
import { TodoService } from "../src/service/TodoService";
import { TodoController } from "../src/controller/TodoController";

import request from "supertest";
import bodyParser from 'body-parser'

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

function createMockTodoService(): TodoService{
    const mockService: TodoService = {
        getAll: jest.fn(() => new Promise<Todo[]>((resolve) => resolve(mockTodoList))),
        get: jest.fn((id: number) => new Promise<Todo>((resolve) => {
            if(id === 1) resolve(mockTodo);
        })),
        create: jest.fn((todo: Todo) => new Promise<string>((resolve) => resolve(todo.id?.toString()))),
        update: jest.fn((id: number, todo: Todo) => new Promise<string>((resolve) => resolve(''))),
        delete: jest.fn((id: number) => new Promise<string>((resolve) => resolve('')))
    };
    return mockService;
};

describe('TodoController 正常系テスト', () => {
    //getAllのテスト
    it('getAll', () => {
        const app: Application = express();
        const mockService = createMockTodoService();
        const controller = new TodoController(mockService);
        app.use('/api/', controller.router);
        return request(app).get('/api/todos').expect(200);
    });
    //getのテスト
    it('get', () => {
        const app: Application = express();
        const mockService = createMockTodoService();
        const controller = new TodoController(mockService);
        app.use('/api/', controller.router);
        return request(app).get('/api/todos/1').expect(200);
    });
    it('create', () => {
        const app: Application = express();
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true}));
        const mockService = createMockTodoService();
        const controller = new TodoController(mockService);
        const todo: Todo = {
            id: 1,
            title: 'test1',
            description: 'test1',
        }
        app.use('/api/', controller.router);
        return request(app).post('/api/todos').send(todo).expect(201);
    });
});
