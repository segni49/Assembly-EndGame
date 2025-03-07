import wordsArray from "./Wordarray.jsx"
function getFarewellText(language, ) {
    const options = [
      `Farewell, ${language}`,
      `Adios, ${language}`,
      `R.I.P, ${language}`,
      `WE'LL MISS YOU, ${language}`,
      `Oh no, not, ${language}`,
      `Till the next time, ${language}`,
     `${language}, bites the dust`,
      `Au revoir, ${language}`,
      `Au secours, ${language}`,
      `Tchau, ${language}`,
      `Au plaisir de vous rencontrer, ${language}`,
      `Nos souvenirs, ${language}`

    ];
    const randomindex =Math.floor(Math.random()*options.length);
    return options[randomindex];
   
    
}
export function randomword() {
  const randomIndex = Math.floor(Math.random() * wordsArray.length);
  const randomword = wordsArray[randomIndex];
  const splitword = randomword.split('')
  return splitword;

}


export default  getFarewellText;
