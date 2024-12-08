import {Router} from 'express';
import { Request, Response, NextFunction } from 'express';

import { Todo } from '../models/todos';

type RequestBody={text:string};
type RequestParams={todoId:string};

let todos: Todo[]=[]

const router=Router();

router.get('/', (req,res,next) => {
    res.status(200).json({todos:todos});
});

router.post('/todos', (req,res,next) => {
    const body=req.body as RequestBody
    const newTodo: Todo ={
        id:new Date().toISOString(),
        text:body.text
    };
    todos.push(newTodo);
    res.status(201).json({message:"Added Todo", todo:newTodo, todos:todos});
})

router.put('/todo/:todoId', (req:Request<{ todoId: string }>,res: Response,next:NextFunction) =>{
    const params=req.params as RequestParams
    const tid= params.todoId;
    const body =req.body as RequestBody
    const todoIndex=todos.findIndex(todoItem => todoItem.id===tid);
    if(todoIndex>=0){
        todos[todoIndex]={
            id:todos[todoIndex].id,
            text:body.text};
        res.status(200).json({message:'Updated todo', todos:todos});
        }
    else
    {
    res.status(404).json({message:"Could not find todo for this Id"});
    }    
});

router.delete('/todo/:todoId', (req,res,next) =>{
    const params=req.params as RequestParams
    todos=todos.filter((todoItem) => todoItem.id!==params.todoId);
    console.log(todos);
    res.status(200).json({message:'Deleted todo', todos:todos});
});

export default router;