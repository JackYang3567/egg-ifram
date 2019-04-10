// {app_root}/app.js
/*
'use strict'

const { globalBaseInitial } = require('./init')
globalBaseInitial(__dirname)
*/
module.exports = app => {
    if (app.config.env === 'local' || app.config.env === 'unittest') {
      app.beforeStart(async () => {
        await app.model.sync({force: true});
        await app.adminModel.sync({force: true});
      });
    }
 };