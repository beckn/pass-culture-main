import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Formik } from 'formik'
import React from 'react'

import AdageMultiselect, { ItemProps } from '../AdageMultiselect'

const options = [
  { key: '1', value: 'Architecture' },
  { key: '2', value: 'Danse' },
  { key: '3', value: 'Théatre' },
]

const renderAdageMultiselect = (initialValues: ItemProps[] = []) => {
  render(
    <Formik
      initialValues={{ educationalDomains: initialValues }}
      onSubmit={() => {}}
    >
      <AdageMultiselect
        options={options}
        placeholder="Ex: Théâtre"
        name="educationalDomains"
        label="Rechercher un domaine artistique"
      />
    </Formik>
  )
}

describe('AdageMultiselect', () => {
  it('should filter options when user type in input', async () => {
    renderAdageMultiselect()

    const input = screen.getByPlaceholderText('Ex: Théâtre')
    await userEvent.type(input, 'Th')

    expect(screen.getByText('Théatre')).toBeInTheDocument()
    expect(screen.queryByText('Architecture')).not.toBeInTheDocument()
    expect(screen.queryByText('Danse')).not.toBeInTheDocument()
  })
  it('should check an option when user click on it', async () => {
    renderAdageMultiselect()

    const option = screen.getByText('Danse')
    await userEvent.click(option)

    expect(screen.getByLabelText('Danse')).toBeChecked()
  })

  it('should uncheck an option when user click on it', async () => {
    renderAdageMultiselect([options[1]])

    const option = screen.getByText('Danse')
    await userEvent.click(option)

    expect(screen.getByLabelText('Danse')).not.toBeChecked()
  })

  it('should display all options when user erase input value', async () => {
    renderAdageMultiselect()

    const input = screen.getByPlaceholderText('Ex: Théâtre')

    await userEvent.type(input, 'Th')

    expect(screen.getByText('Théatre')).toBeInTheDocument()
    expect(screen.queryByText('Architecture')).not.toBeInTheDocument()
    expect(screen.queryByText('Danse')).not.toBeInTheDocument()

    await userEvent.clear(input)

    expect(screen.getByText('Théatre')).toBeInTheDocument()
    expect(screen.getByText('Architecture')).toBeInTheDocument()
    expect(screen.getByText('Danse')).toBeInTheDocument()
  })
})
