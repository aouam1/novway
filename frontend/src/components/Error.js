import React from 'react'

import { Link } from 'react-router-dom'
const Error = () => {
  return <div className='page-100 error-wrapper'>
    <section>
      <h1>404</h1>
      <h3>Sorry, the page you tried cannot be found</h3>
      <Link className='btn' to='/'>
      back home</Link>
    </section>
  </div>
}

export default Error
