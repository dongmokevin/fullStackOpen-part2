import React from 'react'
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

const Course = ({courses}) => (
    <div>
      <Header courses={courses.name} />
      <Content courses ={courses}/>
      <Footer courses={courses} />
    </div>
)

export default Course