import {v4 as uuidv4} from 'uuid'
import { TodoAccess } from '../dataLayer/TodoAccess'
import { TodoItem } from '../models/TodoItem'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { Integer } from 'aws-sdk/clients/apigateway'

const todoAccess = new TodoAccess()

export async function getAllTodos(userId: string): Promise<TodoItem[]> {
  return todoAccess.getAllTodos(userId)
}

export async function createTodo(newTodo: CreateTodoRequest, userId: string): Promise<TodoItem> {
    
    const createdDate  = new Date().toISOString()
    const todoId = uuidv4()

    const item: TodoItem = {
      userId,
      todoId,
      createdAt: createdDate,
      name: newTodo.name,
      dueDate: newTodo.dueDate,
      done: false,
    }

  return await todoAccess.createTodo(item)
}

export async function updateTodo(newTodo: UpdateTodoRequest, userId: string, todoId: string) {
    await todoAccess.updateTodo(userId, todoId, newTodo)
}  

export async function deleteTodo(userId: string, todoId: string) {
    return await todoAccess.deleteTodos(userId, todoId)
}  

export async function checkTodoExists(todoId: string): Promise<Integer> {
    return await todoAccess.checkTodoExists(todoId)
}  

export async function createSignedUrl(todoId: string){
    return await todoAccess.createSignedUrl(todoId)
}