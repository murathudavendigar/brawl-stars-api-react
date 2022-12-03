import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Lilita+One&display=swap');
*{
      margin:0;
    padding: 0;
    box-sizing: border-box;
}

body{

  
    background-image: url("https://preview.redd.it/iapqmzd3zu721.jpg?auto=webp&s=d70e6a1f8d6a9b4cfc8bb210d3438ce9a0478169");
    background-size: contain;
    background-repeat: repeat;
    font-family: 'Lilita One', cursive;
    height: 100vh;

    
    }
`;

export default GlobalStyle;
