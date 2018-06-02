const express = require('express')
const route = module.exports = express.Router()

route.get('/', (req, res) => {
	let comments = req.param.post.comments
	return res.status(200).send(comments)
})

route.get('/:commentId', (req, res) => {
	let comments = req.param.post.comments
	let id = req.params.commentId
	if(!comments[id]) return res.sendStatus(404)
	return res.status(200).send(comments[id])
})

route.post('/', (req, res) => {
	let comments = req.param.post.comments
	let id = comments.length
	let comment = {
		id: id,
		email: req.body.email,
		text: req.body.text,
	}
	comments.push(comment)
	return res.status(201).send({id: id})
})

route.put('/:commentId', (req, res) => {
	let comments = req.param.post.comments
	let id = req.params.commentId
	if(!comments[id]) return res.sendStatus(404)
	Object.assign(comments[id], {
		email: req.body.email,
		text: req.body.text,
	})
	return res.status(201).send({id: id})
})

route.delete('/:commentId', (req, res) => {
	let comments = req.param.post.comments
	let id = req.params.commentId
	if(!comments[id]) return res.sendStatus(404)
	comments.splice(id, 1)
	return res.status(204).send({id: id})
})
