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
import store from '../src/app/store'
import { MemoryRouter } from 'react-router-dom'

import RecipeList from '../src/features/recipes/RecipeList'

const testUser = { id: 1, name: 'Test User', email: 'test@email.com' }

describe('Smoke Tests', () => {
  test('expect true to be true', () => {
    expect(true).toBe(true)
  })
})
describe('RecipeList', () => {
  test('renders RecipeList component without errors', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RecipeList user={testUser} />
        </MemoryRouter>
      </Provider>
    )
  })
})
// test('renders RecipeList component with recipes', () => {
//   render(
//     <Provider store={store}>
//       <BrowserRouter>
//         <RecipeList user={testUser} />
//       </BrowserRouter>
//     </Provider>
//   )
//   const recipes = screen.getAllByTestId('recipe')
//   expect(recipes).toHaveLength(3)
// })
// })
