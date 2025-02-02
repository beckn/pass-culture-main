import cn from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { Button } from 'ui-kit/Button'
import { ButtonVariant } from 'ui-kit/Button/types'
import { SvgIcon } from 'ui-kit/SvgIcon/SvgIcon'

import styles from './Tabs.module.scss'

interface Tab {
  label: string
  key: string
  url?: string
  onClick?: () => void
  icon?: string
}
export interface FilterTabsProps {
  tabs: Tab[]
  selectedKey?: string
}

const Tabs = ({ selectedKey, tabs }: FilterTabsProps): JSX.Element => {
  return (
    <ul className={styles['tabs']}>
      {tabs.map(({ key, label, url, icon, onClick }) => {
        return (
          <li
            className={cn(styles['tabs-tab'], {
              [styles['is-selected']]: selectedKey === key,
            })}
            key={`tab_${key}`}
          >
            {url ? (
              <Link
                className={styles['tabs-tab-link']}
                key={`tab${url}`}
                to={url}
              >
                {icon && (
                  <SvgIcon
                    src={icon}
                    alt=""
                    className={styles['tabs-tab-icon']}
                  />
                )}
                <span>{label}</span>
              </Link>
            ) : (
              <Button
                variant={ButtonVariant.TERNARY}
                icon={icon}
                onClick={onClick}
                className={styles['tabs-tab-button']}
              >
                {label}
              </Button>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default Tabs
