'use strict'

const Tortoise = require('tortoise')
const _ = require('lodash')

const tortoise = new Tortoise(process.env.RABBITMQ_URI || 'amqp://localhost')
const QUEUE_ACCOUNT_CREATE = 'account-created'
const QUEUE_ACCOUNT_EDIT = 'account-edited'

// Account DB
const accountDB = {}

function createAccount (account) {
  // Create account in service's DB
  accountDB[account.id] = account

  // Emit event about create
  return tortoise
    .queue(QUEUE_ACCOUNT_CREATE)
    .publish({
      id: account.id,
      balance: accountDB[account.id].balance
    })
}

function updateAccount (account) {
  // Update account in service's DB
  accountDB[account.id] = _.merge(accountDB[account.id], account)

  // Emit event about update
  return tortoise
    .queue(QUEUE_ACCOUNT_EDIT)
    .publish({
      id: account.id,
      balance: accountDB[account.id].balance
    })
}

function getAccountById (userId) {
  return accountDB[userId]
}

module.exports = {
  createAccount,
  updateAccount,
  getAccountById
}