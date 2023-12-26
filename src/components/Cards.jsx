import React from 'react'
import { Card } from 'react-bootstrap'

export default function Cards({title}) {
  return (
    <Card>
        <Card.Img srs='imgProject.jpg'/>
        <Card.Title>{title}</Card.Title>
    </Card>
  
  )
}
