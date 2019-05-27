'use strict'

const accountService = require('./services/accountService')
const userService = require('./services/userService')
const reportService = require('./services/reportService')

// Test
const userId = '123456789'
const log = console.log

log('Running...')

userService
  .createUser({ id: userId, name: 'Somkiat Puisungnoen', state: 'default' })
  .then(() => accountService.createAccount({ id: userId, balance: 1000 }))
  .then(() => userService.updateUser({ id: userId, state: 'churn' }))
  .then(() => userService.updateUser({ id: userId, name: 'Somkiat XXXXX' }))
  .then(() => accountService.updateAccount({ id: userId, balance: 700 }))
  .then(() => {
      
    // Client "query" data from Report Service
    // Eventual consistency
    setTimeout(() => {
      log('Account in account service database', accountService.getAccountById(userId))
      log('User in user service database', userService.getUserById(userId))
      log('User in reporting database', reportService.getUserById(userId))

      process.exit()
    }, 1000)
  })