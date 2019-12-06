import React from 'react'
import { render } from 'react-dom'
import UseScript from './src'

const NODE = document.querySelector('#app')

render(<UseScript name="Harold" />, NODE)
