import React from 'react'
import { render } from 'react-dom'
import Survey from './survey'

render(
  <Survey type='general' />,
  document.querySelector('#survey')
)
