// react-testing-library doc: https://testing-library.com/docs/react-testing-library/api
import '@testing-library/jest-dom'

import { render, screen } from '@testing-library/react'

import { BannerSummary } from '../'
import React from 'react'

describe('new_components:BannerSummary', () => {
  it('renders component successfully', async () => {
    render(<BannerSummary />)

    expect(
      screen.getByText(
        'Vérifiez les informations ci-dessous avant de publier votre offre.'
      )
    ).toBeInTheDocument()
  })
})
