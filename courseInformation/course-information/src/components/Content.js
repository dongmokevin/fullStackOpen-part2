import React from 'react'
import Part from './Part'

const Content = ({courses}) => (
    <div>
      {courses.parts.map(x => (<Part key={x.id} part={x.name} exercise={x.exercises} />))}
    </div>
  )

  export default Content


