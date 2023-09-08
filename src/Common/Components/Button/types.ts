import { ThemeButton } from '@/Common/Enum/themeButton'
import { ButtonHTMLAttributes } from 'react'



export type ButtonPropsType = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean
  theme: ThemeButton
  width?: string
}

export type StyledButtonPropsType = {
  handler: HandleButtonType
  height?: string
  theme: ThemeButton
  type?: 'button' | 'reset' | 'submit'
  width?: string
}

export type HandleButtonType = {
  '&.disabled'?: HoverActiveDisableType
  '&:active'?: HoverActiveDisableType
  '&:hover'?: HoverActiveDisableType
  background?: string
  border?: string
  color?: string
  'max-height'?: string
  'max-width'?: string
  outline?: string
  padding?: string
}

type HoverActiveDisableType = {
  border?: string
  color?: string
}
