import { useEffect, useState } from "react";
import scss from "./ProgressBar.module.scss";
import styled from "styled-components";
import { colorsTheme } from "@/styles/StyledComponents/Common/colors";

export const ProgressBar = ({ percentage=0 }: {percentage?: number | null}) => {
 const [isCloud, setIsCloud] = useState(false)
 const [pro, setPro] = useState<number>()

  

  useEffect(()=>{
const number = Math.floor(percentage!)
 setPro(number)
  },[percentage])

  if (!percentage) {
    return null;
  }

  if (percentage=100) {
    setTimeout(()=>{
       handleCloud()
       return null;     

    }, 2000)
  }

  const handleCloud = () => {
    return (
      <CloudStyle >в облаке</CloudStyle>
    )
  }

  return (
    <div className={scss.ProgressBar}>
      <span>{pro}%</span>
      <div
        style={{ width: percentage + "%" }}
        className={scss.percentage}
      ></div>
    </div>
  );
};


const CloudStyle = styled.div`
      background: ${colorsTheme.colors.accent[100]};
    border-radius: 4px;
    color: #ffffff;
    padding: 5px 0;
    text-align: center;

`