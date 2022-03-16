import React from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'
import run from '../../backend'
import axios from 'axios'

const dev = process.env.NODE_ENV !== 'production'

export const server = dev
  ? 'http://localhost:3000'
  : 'https://your_deployment.server.com'

const Page1 = (props) => {
  console.log('🚀 ~ file: index.tsx ~ line 24 ~ Page1 ~ props', props)

  const userInfo = {
    // name: '二狗子',
    email: '444042073qq.com', // 邮箱
    gender: 1,
    school: '家里蹲',
    major: 'cs',
    graduationYear: '2022',
    // phone: '13222233312',
  }
  const handlePostUserInfo = async () => {
    try {
      const res = await axios({
        url: `${server}/api/postUserInfo`,
        method: 'post',
        data: userInfo,

        headers: {
          'Content-Type': 'application/json',
        },
      })
      // const res = await fetch(`${server}/api/postUserInfo`, {
      //   method: 'post',
      //   body: JSON.stringify(userInfo),
      //   text
      // })
      console.log(
        '🚀 ~ file: index.tsx ~ line 19 ~ handlePostUserInfo ~ res',
        res
      )
    } catch (e) {
      console.log(e)
    }

    // const data = await res.json()

    // if (!data) {
    //   return {
    //     redirect: {
    //       destination: '/',
    //       permanent: false,
    //     },
    //   }
    // }
  }
  return (
    <>
      <div>Im Page1</div>
      <Link href="/page2">To Page2</Link>
      <button onClick={() => handlePostUserInfo()}>Post!</button>
      <Footer></Footer>
    </>
  )
}

export async function getStaticProps() {
  const res = await run()

  // const res = await fetch(`${server}/api/postUserInfo`)
  // const data = await res.json()

  // if (!data) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {},
  }
}

export default Page1
