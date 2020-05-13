import { DocumentClient } from "aws-sdk/clients/dynamodb"
import * as AWS from "aws-sdk"
import * as AWSXRay from "aws-xray-sdk"
import { TodoItem } from "../models/TodoItem"
import { Integer } from "aws-sdk/clients/apigateway"

const XAWS = AWSXRay.captureAWS(AWS)

export class TodoAccess{

    constructor(
        private readonly doClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
        private readonly s3 = new XAWS.S3({signatureVersion: 'v4'}),
        private readonly todosTable = process.env.TODOS_TABLE,
        private readonly todosIndex = process.env.TODOS_ID_INDEX,
        private readonly bucketName = process.env.IMAGES_BUCKET) {
      }

    async getAllTodos(userId: string): Promise<TodoItem[]>{
        const result = await this.doClient.query({
            TableName: this.todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
              ':userId': userId
            }
          }).promise()

          return result.Items as TodoItem[]
    }

    async createTodo(item: TodoItem): Promise<TodoItem>{
        item.attachmentUrl = `https://${this.bucketName}.s3.amazonaws.com/${item.todoId}`
        console.log("Item added to db: ", item)
        await this.doClient.put({
            TableName : this.todosTable,
            Item: item
          }).promise()

        return item
    }

    async updateTodo(userId, todoId, updateTodo): Promise<void>{
        var params = {
            TableName: this.todosTable,
            Key:{
                userId: userId,
                todoId: todoId
            },
            UpdateExpression: "set #name = :nameTodo, dueDate=:dueDate, done=:done",
            ExpressionAttributeNames: {
              '#name' : 'name'
            },
            ExpressionAttributeValues:{
                ":nameTodo":updateTodo.name,
                ":dueDate":updateTodo.dueDate,
                ":done":updateTodo.done
            },
            ReturnValues:"UPDATED_NEW"
        };
          await this.doClient.update(params).promise()
    }

    async checkTodoExists(todoId: string): Promise<Integer>{

        const result = await this.doClient.query({
          TableName: this.todosTable,
          IndexName: this.todosIndex,
          KeyConditionExpression: 'todoId = :todoId',
          ExpressionAttributeValues: {
            ':todoId': todoId
          }
      
        }).promise()  
        console.log("Checking todo exists, todoId: ", todoId, ", result: ", result)
        return result.Count
    }

    async deleteTodos(userId: string, todoId: string){
        return await this.doClient.delete({
            TableName: this.todosTable,
            Key: {
              userId: userId,
              todoId: todoId
            }
        }).promise()
    }

    async createSignedUrl(todoId: string){
        return this.s3.getSignedUrl('putObject',{
            Bucket: this.bucketName,
            Key: todoId,
            Expires: 3000
        })
    }

}