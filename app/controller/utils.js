'use strict';

const qr = require('qr-image')
const svgCaptcha = require('svg-captcha')
const { Controller } = require('egg')

class UtilsController extends Controller {

  async unauthorization(){
    const { ctx, app, logger } = this;
    let  context = { 
         title: '401 Unauthorization',           
         content:'401 Unauthorization'
  }
    await ctx.render('unauthorization.njk', context);
  }

  async qrcode() {
    const { ctx, logger } = this;
    const { text, size, margin } = {...ctx.params, ...ctx.query} 
   
    //qr/sdafa?ccv=baud&size=10&margin=10
    try {
      // 大小默认5，二维码周围间距默认1
      let img = qr.image(text || '', { type: 'png', size: parseInt(size) || 5, margin: parseInt(margin) || 1 })
      ctx.status = 200
      ctx.type = 'image/png'
      ctx.body = img
    } catch (e) {
      ctx.status = 414
      ctx.set('Content-Type', 'text/html')
      ctx.body = '<h1>414 Request-URI Too Large</h1>'
    }    
  }

  async captcha() {
    const { ctx, logger, app  } = this    
    const { type } = {...ctx.params, ...ctx.query} 
    const captcha = svgCaptcha.create({noise:5, color: true, background: '#cc9966',ignoreChars: '0o1i'})
    const captchaText = (captcha.text).toLowerCase()
     if ( 1 == parseInt(type)) {
        //把登录验证码保存到redis中
        await app.redis.setex(`captcha:signin:${captchaText}`,180, captchaText)        
    } else {
        // 注册验证码保存到redis中
        await app.redis.setex(`captcha:signup:${captchaText}`,180,  captchaText)
    }
    //req.session.captcha = captcha.text;   
    ctx.status = 200
  	ctx.type = 'svg'
    ctx.body = captcha.data
  }
}

module.exports = UtilsController
