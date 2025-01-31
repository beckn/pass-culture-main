import fr from 'date-fns/locale/fr'
import React from 'react'
import ReactDatePicker, { registerLocale } from 'react-datepicker'
import type { ReactDatePickerProps } from 'react-datepicker'

import strokeCalendarIcon from 'icons/stroke-calendar.svg'
import { FORMAT_DD_MM_YYYY } from 'utils/date'

import { BaseInput } from '../shared'

import './BaseDatePicker.module.scss'

registerLocale('fr', fr)

type Props = Omit<ReactDatePickerProps, 'value'> & {
  hasError?: boolean
  filterVariant?: boolean
  openingDateTime?: Date
  value?: Date | null
  'aria-label'?: string
}

export const BaseDatePicker = ({
  hasError,
  filterVariant,
  openingDateTime,
  value,
  'aria-label': ariaLabel,
  ...props
}: Props): JSX.Element => (
  <ReactDatePicker
    {...props}
    customInput={
      <BaseInput
        rightIcon={strokeCalendarIcon}
        hasError={hasError}
        filterVariant={filterVariant}
        aria-label={ariaLabel}
      />
    }
    dateFormat={FORMAT_DD_MM_YYYY}
    dropdownMode="scroll"
    locale="fr"
    placeholderText="JJ/MM/AAAA"
    openToDate={value ? value : openingDateTime}
    selected={value}
  />
)
