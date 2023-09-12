const express = require('express')

const router = express.Router()

const { Post } = require('../class/post')

router.post('/post-create', function (req, res) {
  try {
    const { userName, text, postId } = req.body

    if (!userName || !text) {
      return res.status(400).json({
        message: 'Not enough data for creating post ',
      })
    }

    let post = null

    console.log('postId', postId)

    if (postId) {
      post = Post.getById(Number(postId))
      console.log('post', post)

      if (!post) {
        return res.status(400).json({
          message: 'Post with this ID does npt exist',
        })
      }
    }

    const newPost = Post.create(userName, text, post)

    return res.status(200).json({
      post: {
        userName: newPost.userName,
        id: newPost.id,
        text: newPost.text,
        date: newPost.date,
      },
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/post-list', function (req, res) {
  try {
    const list = Post.getList()

    if (list.length === 0) {
      return res.status(200).json({
        list: [],
      })
    }

    return res.status(200).json({
      list: list.map(({ id, userName, text, date }) => ({
        id,
        userName,
        text,
        date,
      })),
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})

router.get('/post-item', function (req, res) {
  try {
    const { id } = req.query

    console.log(req.query)

    if (!id) {
      return res.status(400).json({
        message: 'Wrong id ',
      })
    }

    const post = Post.getById(Number(id))

    if (!post) {
      return res.status(400).json({
        message: 'Post with such id does not exist',
      })
    }

    return res.status(200).json({
      post: {
        userName: post.userName,
        id: post.id,
        text: post.text,
        date: post.date,

        reply: post.reply.map((reply) => ({
          userName: reply.userName,
          id: reply.id,
          text: reply.text,
          date: reply.date,
        })),
      },
    })
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    })
  }
})
module.exports = router
