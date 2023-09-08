import { colorsTheme } from "@/styles/StyledComponents/Common/colors"


export const useButtonColorType = () => {
  const handler = (theme: string) => {
    switch (theme) {
      case 'primary':
        return {
          background: `${colorsTheme.colors.accent[500]}`,
          color: `${colorsTheme.colors.light[100]}`,
          '&:hover': {
            background: `${colorsTheme.colors.accent[100]}`,
          },
          '&:active': {
            background: `${colorsTheme.colors.accent[700]}`,
            color: `${colorsTheme.colors.light[500]}`,
          },
          '&.disabled': {
            background: `${colorsTheme.colors.accent[900]}`,
            color: `${colorsTheme.colors.light[900]}`,
          },
        }
      case 'secondary':
        return {
          background: `${colorsTheme.colors.dark[300]}`,
          color: `${colorsTheme.colors.light[100]}`,
          '&:hover': {
            background: `${colorsTheme.colors.dark[100]}`,
          },
          ' &:active ': {
            background: '#212121',
          },
          '&.disabled ': {
            background: `${colorsTheme.colors.dark[100]}`,
            color: '#8D9094',
          },
        }
      case 'outlined':
        return {
          color: `${colorsTheme.colors.accent[500]}`,
          border: `1px solid ${colorsTheme.colors.accent[500]}`,
          background: 'none',
          '&:hover': {
            color: `${colorsTheme.colors.accent[100]}`,
            border: `1px solid ${colorsTheme.colors.accent[100]}`,
          },
          '&:active': {
            color: `${colorsTheme.colors.accent[700]}`,
            border: `1px solid ${colorsTheme.colors.accent[700]}`,
          },
          '&.disabled': {
            color: `${colorsTheme.colors.accent[900]}`,
            border: `1px solid ${colorsTheme.colors.accent[900]}`,
          },
        }
      case 'clear':
        return {
          'max-width': '100px',
          'max-height': '36px',
          color: `${colorsTheme.colors.accent[500]}`,
          padding: '0',
          border: 'none',
          background: 'none',
          outline: 'none',
          '&:hover': {
            color: `${colorsTheme.colors.accent[100]}`,
          },
          '&:active': {
            color: `${colorsTheme.colors.accent[700]}`,
          },
          '&.disabled': {
            color: `${colorsTheme.colors.accent[900]}`,
          },
        }
      default:
        return {
          background: `${colorsTheme.colors.accent[500]}`,
          color: `${colorsTheme.colors.light[100]}`,
        }
    }
  }

  return { handler }
}
