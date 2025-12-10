import { render, screen } from '@testing-library/react'
import { describe, test, expect } from 'vitest'
import { Home } from './index'

describe('Home page', () => {
  test('renders the home component', () => {
    render(<Home />)
    expect(screen.getByText('anu creative')).toBeInTheDocument()
    expect(screen.getByText('design and development • web and mobile')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /View CV/i })).toHaveAttribute('href', '/cv')
  })

  test('renders the SVG', () => {
    render(<Home />)
    const svg = screen.getByTitle('anu creative logo')
    expect(svg).toBeInTheDocument()
  })
})
