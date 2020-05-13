import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserId } from '../utils'
import { getAllTodos } from '../../businessLogic/Todo'


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const userId = getUserId(event)
  // TODO: Get all TODO items for a current user
  const result = await getAllTodos(userId)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify({
      items: result
    })
  }

}
