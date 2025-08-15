// setting up the routes for todo items
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

//@desc Get all todos
//@route GET /api/todos

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

//@desc Create a new todo
//@route POST /api/todos    

router.post('/', async (req, res) => {
   const todo = new Todo({
        title: req.body.title,
   });

   try{
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
   } catch(err) {
    res.status(400).json({ message: 'Bad request', error: err.message });
   }
});

//@desc Update a todo
//@route PUT /api/todos/:id

// router.put('/:_id', async (req, res) => {
//     try {
//         const todo = await Todo.findById(req.params._id);
//         if (!todo) {
//             return res.status(404).json({ message: 'Todo not found' });
//         }
//         todo.title = req.body.title || todo.title;
//         todo.completed = req.body.completed ?? todo.completed;

//         const updated = await todo.save();
//         res.json(updated);
//     } catch (err) {
//         res.status(500).json({ message: 'Server error', error: err.message });
//     }
// }); 


router.put('/:_id', async(req,res)=>{
  try{
      const updateData = await Todo.findByIdAndUpdate(req.params._id, req.body, {new: true});
    if(!updateData){
        res.status(404).json({success: false, message:'data not found'});

    };

    res.status(200).json(updateData);
  }catch(err){
    res.status(500).json({success:false, message: `unable to update data ${err}`});
  }
})

//@desc Delete a todo
//@route DELETE /api/todos/:id
router.delete('/:_id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params._id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Export the router
module.exports = router;