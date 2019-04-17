'use strict'

const bcrypt = require('bcrypt')

module.exports = (app, model) => {
  const { INTEGER, STRING, BOOLEAN,DATE,BIGINT,NOW} = app.Sequelize
  const Admin = app.model.define('Admin', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    email: {
      type: STRING
    },
    password: {
      type: STRING
    },
    username: {
      type: STRING
    },
    nickname:{
      allowNull: true,
      type: STRING
    },
    birthday:{
      allowNull: true,
      type: STRING
    },
    tel: {
      type: STRING,
      allowNull: true
    },
    gender: {
      defaultValue: 0,
      type: INTEGER
    },
    mobile_phone:{
      type:BIGINT
    },
    address: {
      type: STRING
    },
    status:{
      defaultValue: 0,
      type: INTEGER
    },
    weibo: {
      type: STRING
    },
    weixin: {
      type: STRING
    },
    receive_remote: {
      type: BOOLEAN
    },
    email_verifyed: {
      type: BOOLEAN
    },
    avatar: {
      type: STRING
    },
    created_at: {
     
      defaultValue: NOW,
      type: DATE
    },
    updated_at: {
    
      defaultValue: NOW,
      type: DATE
    }
  })


  /**
   * * 哈希密码 Hooks
   * @param {Admin} admin 用户实例
   * @return {void}
   */
  async function hashPwd(admin) {
    if (!admin.changed('password')) {
      return
    }
    admin.password = await bcrypt.hash(admin.password, 10)
  }

 
   Admin.beforeSave(hashPwd)

     /**
     * 用户登录方法
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @return {(Admin|boolean)} 登陆成功的用户
     */

    Admin.Auth = async function (username, password) {
      const admin = await this.findOne({
        where: {
          username
        }
      })
      if (await bcrypt.compare(password, admin.password)) {
        return admin
      }
      return false
    }

    return Admin;
  };