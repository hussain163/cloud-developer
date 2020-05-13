import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { deleteTodo } from '../../businessLogic/Todo'

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  const todoId = event.pathParameters.todoId
  
  // TODO: Remove a TODO item by id
  await deleteTodo(userId, todoId)

  return {
    statusCode: 200,
    headers:{
      'Access-Control-Allow-Origin' : '*'
    },
    body: ''
  }
}
