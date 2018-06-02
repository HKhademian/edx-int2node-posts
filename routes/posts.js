const express = require('express')
const route = module.exports = express.Router()
const posts = require('../lib/store').posts

route.use('/:postId/comments', (req, res, next) => {
	let id = req.params.postId
	if(!posts[id]) return res.sendStatus(404)
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
		name: req.body.name,
		writer: req.body.writer,
		url: req.body.url,
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
		name: req.body.name,
		writer: req.body.writer,
		url: req.body.url,
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
