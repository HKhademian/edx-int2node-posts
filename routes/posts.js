const express = require('express')
const route = module.exports = express.Router()

const posts = []

route.use('/:postId/comments', (req, res, next) => {
	let id = req.params.postId
	req.param.post = posts[id]
	console.log(req.param.post)
	return next()
}, require('./posts-comments'))


route.get('/', (req, res) => {
	return res.status(200).send(posts)
})

route.get('/:postId', (req, res) => {
	let id = req.params.postId
	if(!posts[id]) return res.sendStatus(404)
	return res.status(200).send(posts[id])
})

route.post('/', (req, res) => {
	let id = posts.length
	let post = {
		id: id,
		title: req.body.title,
		writer: req.body.writer,
		text: req.body.text,
		comments: [],
	}
	posts.push(post)
	return res.status(201).send({id: id})
})

route.put('/:postId', (req, res) => {
	let id = req.params.postId
	if(!posts[id]) return res.sendStatus(404)
		Object.assign(posts[id], {
		title: req.body.title,
		writer: req.body.writer,
		text: req.body.text,
	})
	return res.status(201).send({id: id})
})

route.delete('/:postId', (req, res) => {
	let id = req.params.postId
	if(!posts[id]) return res.sendStatus(404)
	posts.splice(id, 1)
	return res.status(204).send({id: id})
})
