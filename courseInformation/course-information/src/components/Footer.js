import React from 'react'


const Footer = ({courses}) => {
  const total = courses.parts.map(x => x.exercises).reduce((s, p) => s + p)
  return (
    <p><b>Total of {total} exercises</b></p>
  )
}

export default Footer