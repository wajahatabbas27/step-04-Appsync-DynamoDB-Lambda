import Todo from './Todo'
import getTodos from './getTodos'
import addTodo from './addTodo'
import deleteTodo from './deleteTodo'
import updateTodo from './updateTodo'


type AppSyncEvent = {
    info: {
        fieldName: String
    },
    arguments: {
        todo: Todo,
        todoId: String
    }
}




exports.handler = async (event: AppSyncEvent) => {
    switch (event.info.fieldName) {
        case "getTodos":
            return await getTodos()
        case "addTodo":
            return await addTodo(event.arguments.todo)
        case "deleteTodo":
            return await deleteTodo(event.arguments.todoId)
        case "updateTodo":
            return await updateTodo(event.arguments.todo)
        default:
            return null
    }
}