'use strict'

const bcrypt = require('bcrypt')

module.exports = (app, model) => {
  const { INTEGER, STRING, BOOLEAN,DATE} = app.Sequelize
  const User = app.model.define('User', {
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
      allowNull: false,
      type: DATE
    },
    updated_at: {
      allowNull: false,
      type: DATE
    }
  })


  /**
   * * 哈希密码 Hooks
   * @param {User} user 用户实例
   * @return {void}
   */
  async function hashPwd(user) {
    if (!user.changed('password')) {
      return
    }
    user.password = await bcrypt.hash(user.password, 10)
  }

 
   User.beforeSave(hashPwd)

     /**
     * 用户登录方法
     * @param {string} email 邮箱
     * @param {string} password 密码
     * @return {(User|boolean)} 登陆成功的用户
     */
    User.Auth = async function (email, password) {
      const user = await this.findOne({
        where: {
          email
        }
      })
      if (await bcrypt.compare(password, user.password)) {
        return user
      }
      return false
    }

 

    return User;
  };