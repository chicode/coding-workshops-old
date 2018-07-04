import React from 'react'
import { Img } from 'components'
import { Link } from 'react-router-dom'

export default ({ to }) => (
  <Link to={to}>
    <Img src="home" />
  </Link>
)
