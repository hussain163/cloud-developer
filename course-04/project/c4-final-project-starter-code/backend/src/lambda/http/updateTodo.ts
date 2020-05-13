import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'

import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { getUserId } from '../utils'
import { checkTodoExists, updateTodo } from '../../businessLogic/Todo'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const todoId = event.pathParameters.todoId
  const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)
  const userId = getUserId(event)

  const result = await checkTodoExists(todoId)
  if(result == 0){
    return {
      statusCode: 404,
      body: JSON.stringify({
        error: 'Todo does not exist'
      })
    }
  }
  
  // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
  await updateTodo(updatedTodo, userId, todoId)
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*'
    },
    body: ''
  }
}
