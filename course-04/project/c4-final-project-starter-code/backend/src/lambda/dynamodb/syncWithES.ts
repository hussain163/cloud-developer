import 'source-map-support/register'
import { DynamoDBStreamHandler, DynamoDBStreamEvent } from 'aws-lambda'
import * as elasticsearch from 'elasticsearch'
import * as httpEs from 'http-aws-es'

const esHost = process.env.ES_ENDPOINT

const es = new elasticsearch.Client({
  hosts: [esHost],
  connectionClass: httpEs
})

export const handler: DynamoDBStreamHandler = async (event: DynamoDBStreamEvent) => {
  // TODO: Get all TODO items for a current user

  console.log('Processing events batch from DynamoDB', JSON.stringify(event))

  for (const record of event.Records) {
    console.log('Processing record', JSON.stringify(record))
    try{

    
    if(record.eventName == 'REMOVE'){
      console.log('Removing record', JSON.stringify(record.dynamodb.Keys.todoId.S))
      await es.delete({
        index: 'todo-index',
        type: 'todo',
        id: record.dynamodb.Keys.todoId.S,
      })
    }

    if(record.eventName == 'MODIFY'){
      continue
    }


    if (record.eventName == 'INSERT') {
      const newItem = record.dynamodb.NewImage

    const todoId = newItem.todoId.S

    const body = {
      todoId: newItem.todoId.S,
      userId: newItem.userId.S,
      name: newItem.name.S,
      createdAt: newItem.createdAt.S,
      done: newItem.done.BOOL,
    }

    await es.index({
      index: 'todo-index',
      type: 'todo',
      id: todoId,
      body
    })
    }

    }catch (e){
      console.log("Error while syncing with elastic search: ", e);
    }
    
  }

}
