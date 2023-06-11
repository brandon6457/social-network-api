const { ObjectId } = require('mongoose')
const { Thought, User, Reaction, reactionSchema } = require('../models');


module.exports = {
  
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  
  async createThought(req, res) {
   try {
     
     const userExists = await User.findOne({ _id: req.body.userId })

     if (!userExists) {
       res.status(400).json(user)
       return;
     }

     const thought = await Thought.create(req.body);

     const user = await User.findOneAndUpdate(
       { _id: req.body.userId },
       { $addToSet: { thoughts: thought } },
       { runValidators: true, new: true })

     res.json({ thought });
   } catch (err) {
     console.log(err);
     return res.status(500).json(err);
   }
 },