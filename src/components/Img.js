import React from 'react'

export default ({ active, src, onClick }) => {
  active = active === undefined ? true : active
  return (
    <img
      src={`/assets/${src + (active ? '' : '-inactive')}.svg`}
      onClick={() => active && onClick()}
    />
  )
}
