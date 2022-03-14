import React from 'react'
import Link from 'next/link'

const Page1 = () => {
  return (
    <>
      <div>Im Page1</div>
      <Link href="./page2">To Page2</Link>
    </>
  )
}

export default Page1
