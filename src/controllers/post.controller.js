const Post = require('../models/post.model');

const mapModel = ({ _id, title, body }) => ({ id: _id, title, body });

async function getAll(req, res, next) {
  try {
    const posts = (await Post.find()).map(mapModel);
    res.status(200).json({
      status: 'success',
      data: { posts },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Failed getting all posts',
    });
  }
}

async function getOne(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { post: mapModel(post) },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Post not found.',
    });
  }
}

async function create(req, res, next) {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: 'success',
      data: { post: mapModel(post) },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Post not found.',
    });
  }
}

async function update(req, res, next) {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: { post: mapModel(post) },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: 'failed',
      message: 'Post not found.',
    });
  }
}

async function remove(req, res, next) {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: 'Post not found.',
    });
  }
}

module.exports = { getAll, getOne, create, update, remove, };
