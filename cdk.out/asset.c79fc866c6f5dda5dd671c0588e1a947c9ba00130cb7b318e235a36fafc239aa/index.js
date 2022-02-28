"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getTodos_1 = require("./getTodos");
const addTodo_1 = require("./addTodo");
const deleteTodo_1 = require("./deleteTodo");
const updateTodo_1 = require("./updateTodo");
exports.handler = async (event) => {
    switch (event.info.fieldName) {
        case "getTodos":
            return await getTodos_1.default();
        case "addTodo":
            return await addTodo_1.default(event.arguments.todo);
        case "deleteTodo":
            return await deleteTodo_1.default(event.arguments.todoId);
        case "updateTodo":
            return await updateTodo_1.default(event.arguments.todo);
        default:
            return null;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUFpQztBQUNqQyx1Q0FBK0I7QUFDL0IsNkNBQXFDO0FBQ3JDLDZDQUFxQztBQWdCckMsT0FBTyxDQUFDLE9BQU8sR0FBRyxLQUFLLEVBQUUsS0FBbUIsRUFBRSxFQUFFO0lBQzVDLFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDMUIsS0FBSyxVQUFVO1lBQ1gsT0FBTyxNQUFNLGtCQUFRLEVBQUUsQ0FBQTtRQUMzQixLQUFLLFNBQVM7WUFDVixPQUFPLE1BQU0saUJBQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzlDLEtBQUssWUFBWTtZQUNiLE9BQU8sTUFBTSxvQkFBVSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkQsS0FBSyxZQUFZO1lBQ2IsT0FBTyxNQUFNLG9CQUFVLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqRDtZQUNJLE9BQU8sSUFBSSxDQUFBO0tBQ2xCO0FBQ0wsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRvZG8gZnJvbSAnLi9Ub2RvJ1xuaW1wb3J0IGdldFRvZG9zIGZyb20gJy4vZ2V0VG9kb3MnXG5pbXBvcnQgYWRkVG9kbyBmcm9tICcuL2FkZFRvZG8nXG5pbXBvcnQgZGVsZXRlVG9kbyBmcm9tICcuL2RlbGV0ZVRvZG8nXG5pbXBvcnQgdXBkYXRlVG9kbyBmcm9tICcuL3VwZGF0ZVRvZG8nXG5cblxudHlwZSBBcHBTeW5jRXZlbnQgPSB7XG4gICAgaW5mbzoge1xuICAgICAgICBmaWVsZE5hbWU6IFN0cmluZ1xuICAgIH0sXG4gICAgYXJndW1lbnRzOiB7XG4gICAgICAgIHRvZG86IFRvZG8sXG4gICAgICAgIHRvZG9JZDogU3RyaW5nXG4gICAgfVxufVxuXG5cblxuXG5leHBvcnRzLmhhbmRsZXIgPSBhc3luYyAoZXZlbnQ6IEFwcFN5bmNFdmVudCkgPT4ge1xuICAgIHN3aXRjaCAoZXZlbnQuaW5mby5maWVsZE5hbWUpIHtcbiAgICAgICAgY2FzZSBcImdldFRvZG9zXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZ2V0VG9kb3MoKVxuICAgICAgICBjYXNlIFwiYWRkVG9kb1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IGFkZFRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pXG4gICAgICAgIGNhc2UgXCJkZWxldGVUb2RvXCI6XG4gICAgICAgICAgICByZXR1cm4gYXdhaXQgZGVsZXRlVG9kbyhldmVudC5hcmd1bWVudHMudG9kb0lkKVxuICAgICAgICBjYXNlIFwidXBkYXRlVG9kb1wiOlxuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHVwZGF0ZVRvZG8oZXZlbnQuYXJndW1lbnRzLnRvZG8pXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbn0iXX0=