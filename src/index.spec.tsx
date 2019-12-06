import React from 'react'
import { create } from 'react-test-renderer'
import UseScript from '.'

describe('UseScript component', () => {
  const NAME = 'Buckwheat'
  test('Has class \'hello-world\'', () => {
    const { root } = create(<UseScript name={NAME} />)
    expect(root.findByType('div').props.className).toEqual('hello-world')
  })

  test('Has name property', () => {
    const { root } = create(<UseScript name={NAME} />)
    expect(root.props.name).toEqual(NAME)
  })

  test('Matches UseScript innertext.', () => {
    const { root } = create(<UseScript name={NAME} />)
    expect(root.findByType('div').children.join('')).toEqual('Hello Buckwheat!')
  })
})
