import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { Path } from '@/Common/Enum/Path'
import { styled } from 'styled-components'
import { colorsTheme } from './../styles/StyledComponents/Common/colors';
import { Button } from '@mui/material'
// import { Button } from '@/Common/Components/Button/Button'
// import { ThemeButton } from '@/Common/Enum/themeButton'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  return (
    <Modal>
      <Title>VIDEO - SCREEN RECORDER</Title>
      Record your video from screen or camera

      <ButtonBlock>
        <Button color='primary' variant='contained' onClick={() => router.push(Path.RECORDER)}>Screen Recorder</Button>
        <Button color='primary' variant='contained' onClick={() => router.push(Path.MEDIARECORDER)}>Video Camera Recorder</Button>

      </ButtonBlock>
    </Modal>
  )
}

const Title = styled.div`
font-size: 16px;
font-weight:600;
  width: auto;
  margin-bottom: 20px;
  color: ${colorsTheme.colors.light[500]};
`
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 360px;
  align-items: center;
  justify-content:center;
  width: 400px;
  height: 300px;
  background: ${colorsTheme.colors.dark[100]};
`

const ButtonBlock = styled.div`
  margin-top: 20px;
  display: inline-flex;
  
  gap: 5px;
`