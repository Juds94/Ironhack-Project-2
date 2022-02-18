const mongoose = require('mongoose')


const isCare = user => user.role === 'CARE'
const isOwner = user => user.role === 'OWNER'
const isAdmin = user => user.role === 'ADMIN'
const isSameUser = (id1, id2) => id1 === id2


module.exports = { isCare, isOwner, isAdmin, isSameUser}