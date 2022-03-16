// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'

import nextConnect from 'next-connect'
import { postRegister } from '../../backend/controllers/User/postUser'
import errorMiddleware from '../../backend/middlewares/error.middleware'

import User, { IUserInfo, IUserDocument } from '../../backend/mongoModels/User'

import isEmpty from 'validator/lib/isEmpty'
import isEmail from 'validator/lib/isEmail'

const isEmpty2 = (string: string) => !string && isEmpty(string)

// const validateRegisterInput = ({
//   name,
//   email,
//   gender = 0,
//   school,
//   major,
//   graduationYear,
//   phone,
// }: IUserInfo) => {
//   let errors: any = {}

//   if (isEmpty2(name)) {
//     errors.name = '姓名不能为空'
//   }
//   if (isEmpty2(email)) {
//     errors.email = '邮箱不能为空'
//   }
//   if (!isEmail(email)) {
//     errors.email = '请输入正确的邮箱地址'
//   }
//   if (gender !== 2 && gender !== 1) {
//     errors.gender = '请选择性别'
//   }
//   if (isEmpty2(school)) {
//     errors.school = '请输入学校'
//   }
//   if (isEmpty2(major)) {
//     errors.major = '请输入专业'
//   }
//   if (isEmpty2(graduationYear)) {
//     errors.graduationYear = '请选择毕业年份'
//   }
//   if (isEmpty2(phone)) {
//     errors.phone = '电话不能为空'
//   }

//   return { errors, valid: Object.keys(errors).length < 1 }
// }

// const postUserInfo: NextApiHandler = async (req, res) => {
//   try {
//     const userInfo: IUserInfo = req.body || {}

//     const validateResult = validateRegisterInput(userInfo)

//     if (!validateResult.valid) {
//       const errorText =
//         validateResult.errors[Object.keys(validateResult.errors)[0]]

//       res.status(200).json({
//         success: false,
//         message: errorText,
//       })
//       return
//     }

//     const newUser = new User(userInfo)

//     const resUser = await newUser.save()

//     res.json({
//       success: true,
//       data: resUser,
//       message: '注册成功',
//     })
//   } catch (e) {
//     return res.json({
//       success: false,
//       data: e,
//       message: '注册失败',
//     })
//   }

//   // const newUser = new User(userInfo)

//   // const resUser = await newUser.save()

//   res.status(200).json({ name: 'John Doe' })
// }

// export default postUserInfo

const handler = nextConnect()
// // handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
// //   // let doc = await req.db.collection('daily')
// //   // console.log('🚀 ~ file: postUserInfo.ts ~ line 12 ~ handler.post ~ req', req)
// //   // console.log(doc)
// //   // res.json(doc)
// //   res.status(200).json({ name: 'John Doe' })
// // })

handler.post((req, res, next) => {
  postRegister(req, res, next)
})

export default handler
