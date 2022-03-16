import isEmail from 'validator/lib/isEmail'
import isEmpty from 'validator/lib/isEmpty'
import HttpException from '../../exceptions/HttpException'
import { UNPROCESSABLE_ENTITY } from 'http-status-codes'
import User, { IUserInfo, IUserDocument } from '../../mongoModels/User'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { NextResponse } from 'next/server'
import nextConnect from 'next-connect'

// interface RegisterInputError extends Partial<IUserDocument> {}
const isEmpty2 = (string: string) => !string && isEmpty(string)
const validateRegisterInput = ({
  name,
  email,
  gender = 0,
  school,
  major,
  graduationYear,
  phone,
}: IUserInfo) => {
  let errors: any = {}

  if (isEmpty(name)) {
    errors.push('姓名不能为空')
  }
  if (isEmpty2(email)) {
    errors.email = '邮箱不能为空'
  }
  if (!isEmail(email)) {
    errors.email = '请输入正确的邮箱地址'
  }
  // if (gender !== 2 && gender !== 1) {
  //   errors.gender = '请选择性别'
  // }
  // if (isEmpty2(school)) {
  //   errors.school = '请输入学校'
  // }
  // if (isEmpty2(major)) {
  //   errors.major = '请输入专业'
  // }
  // if (isEmpty2(graduationYear)) {
  //   errors.graduationYear = '请选择毕业年份'
  // }
  // if (isEmpty2(phone)) {
  //   errors.phone = '电话不能为空'
  // }

  return { errors, valid: Object.keys(errors).length < 1 }
}

export const postRegister = async (
  req: NextApiRequest,
  res: NextApiResponse,
  next: NextResponse
) => {
  try {
    const userData: IUserInfo = req.body
    const validateResult = validateRegisterInput(userData)

    if (!validateResult.valid) {
      const errorText =
        validateResult.errors[Object.keys(validateResult.errors)[0]]
      throw new HttpException(UNPROCESSABLE_ENTITY, errorText)
    }

    if (!userData.phone)
      throw new HttpException(UNPROCESSABLE_ENTITY, '手机号不对哦')

    const hadEmail = await User.findOne({ email: userData.email })
    if (hadEmail) {
      throw new HttpException(UNPROCESSABLE_ENTITY, '邮箱已被使用')
    }

    const newUser = new User(userData)

    const resUser = await newUser.save()

    res.json({
      success: true,
      data: resUser,
      message: '注册成功',
    })
  } catch (error) {
    res.json({
      success: false,
      message: error,
      data: {},
    })
  }
}
