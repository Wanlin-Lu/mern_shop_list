const express = require('express')
const router = express.Router()

const User = require('../../models/User')

router.get('/', async (req, res) => {
  try {
    const users = await User.find()
    if (!users) throw Error('No users exist.')

    res.json(users)
  } catch (e) {
    res.status(400).json({ msg: e.message })
  }
})

module.exports = router