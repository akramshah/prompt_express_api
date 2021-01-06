const express = require('express')
const passport = require('passport')
const router = express.Router()
const customErrors = require('../../lib/custom_errors')
const requireOwnership = customErrors.requireOwnership
const Prompt = require('./../models/prompt')
const handle404 = require('./../../lib/custom_errors')
const requireToken = passport.authenticate('bearer', {
  session: false
})

//CREATE
//POST new prompt
router.post('/prompts', requireToken, (req, res, next) => {
  const promptData = req.body.prompt
  promptData.owner = req.user._id
  Prompt.create(promptData)
  .then(prompt => res.status(201).json({
    prompt: prompt
  }))
  .catch(next)
})

//INDEX
//GET own prompts
router.get('/prompts', requireToken, (req, res, next) => {
  Prompt.find
  ({owner: req.user._id})
  .then(prompts => res.json({
    prompts: prompts
  }))
  .catch(next)
})

//UPDATE
//PATCH update own prompts
router.patch('/prompts/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  delete req.body.prompt.owner
  const promptData = req.body.prompt
  Prompt.findOne({_id: id, owner: req.user._id})
    .then(handle404)
    .then(prompt => prompt.updateOne(promptData))
    .then(() => res.sendStatus(204))
    .catch(next)
})

//DELETE
//DELETE prompt
router.delete('/prompts/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Prompt.findById({_id: id, owner: req.user._id})
  .then(handle404)
  .then(prompt => prompt.deleteOne())
  .then(() => res.sendStatus(204))
  .catch(next)
})


module.exports = router