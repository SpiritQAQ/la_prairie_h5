import mongoose, {
  Schema,
  model,
  Model,
  Document,
  HookNextFunction,
} from 'mongoose'

export interface IUserInfo extends Document {
  name: string
  email: string // 邮箱
  gender: 0 | 1 | 2 //0 未知 2女 1男
  school: string
  major: string // 专业
  graduationYear: string // 毕业年份
  phone: string // 联系电话
}

export interface IUserDocument extends IUserInfo {
  updateAt: Date
  createAt: Date
  env: 0 | 1 // 环境 0测试 1正式
}

const userSchema: Schema = new Schema(
  {
    // model级别检测 和 validateRegisterInput的业务级别检测可以同时存在配合使用
    name: {
      type: String,
      trim: true,
      required: [true, '用户名不得为空'],
      // minlength: [5, '用户名最小长度为5个字符'],
    },
    email: String,
  },
  {
    timestamps: true,
  }
)

// userSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
//   // 保存到数据库之前的钩子函数
//   try {
//     next()
//   } catch (error) {
//     next(error)
//   }
// })

// const User: Model<IUserDocument, {}> = model<IUserDocument>('User', userSchema)
const User =
  mongoose.models.User || mongoose.model<IUserDocument>('User', userSchema)

export default User
