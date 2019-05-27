'use strict'

const assert = require('assert')
const Account = require('./account')
const accountEvent = require('./accountEvent')

const log = console.log

// Init
accountEvent.reset()

log('--- Create events ---')

// Open accounts
Account.open('Somkiat', 1000)
Account.open('Pui', 500)
Account.open('Bom', 0)
log('Accounts are opened', Account.get())

// Transfer some money
Account.transferMoney('Somkiat', 'Pui', 500)
Account.transferMoney('Somkiat', 'Bom', 500)
log('Some money are transfered', Account.get())

// Close account
Account.close('Somkiat')
log('Somkiat closed', Account.get())

log('--- Process events ---')

// Rebuild fron event log
log('Rebuild accounts from event log', accountEvent.rebuild())
assert.deepEqual(Account.get(), accountEvent.rebuild())

// Rollback or undo from event log
log('Undo last event', accountEvent.undo(Account.get(), 1))
log('Undo last two event', accountEvent.undo(Account.get(), 2))

// Query event from event log
log('Query first step', accountEvent.query(1))
log('Query second step', accountEvent.query(2))
log('Query second step', accountEvent.query(3))