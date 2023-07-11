jest.mock('../src/services/api', () => ({
  create: jest.fn(() => ({
    get: jest.fn(() => ({
      data: [
        {
          _id: 1,
          name: 'Test Recipe 1',
          ingredients: 'test',
          instructions: 'test'
        },
        {
          _id: 2,
          name: 'Test Recipe 2',
          ingredients: 'test',
          instructions: 'test'
        },
        {
          _id: 3,
          name: 'Test Recipe 3',
          ingredients: 'test',
          instructions: 'test'
        }
      ]
    }))
  }))
}))

import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import RecipeList from '../src/features/recipes/RecipeList'

// Create a mock Redux store
const mockStore = configureStore([])
const store = mockStore({})

const testUser = { id: 1, name: 'Test User', email: 'test@email.com' }

describe('Smoke Tests', () => {
  test('smoke test', () => {
    expect(true).toBe(true)
  })
})
describe('RecipeList', () => {
  test('renders RecipeList component without errors', () => {
    render(
      <Provider store={store}>
        <RecipeList user={testUser} />
      </Provider>
    )
  })
})
