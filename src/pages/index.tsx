import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { Path } from '@/Common/Enum/Path'
import { styled } from 'styled-components'
import { colorsTheme } from './../styles/StyledComponents/Common/colors';
import { Button } from '@/Common/Components/Button/Button'
import { ThemeButton } from '@/Common/Enum/themeButton'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Title>VIDEO SCREEN RECORDER</Title>
xvcxvv
      <Button theme={ThemeButton.OUTLINED} onClick={()=>router.push(Path.RECORDER)}>Go</Button>
    </main>
  )
}

const Title = styled.div`
font-size: 16px;
font-weight:600;
  width: auto;
  color: ${colorsTheme.colors.light[700]}
`