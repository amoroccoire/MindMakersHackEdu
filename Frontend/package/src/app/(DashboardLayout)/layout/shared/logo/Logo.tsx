import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "70px",
  width: "180px",
  overflow: "hidden",
  display: "block",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
<Image
  src="/images/logos/logoReto.png"
  alt="logo"
  height={90}
  width={134}
  priority
  style={{
    width: '194px',   
    height: '140px',   
    position: 'absolute',  
    top: '-20px',     
    left: '30px'      
  }}
/>
    </LinkStyled>
  );
};

export default Logo;
