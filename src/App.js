import { useEffect, useState } from 'react';
import './App.css';
import { BarChart } from './components/Barchart'


function App() {
  let [dataCharacter, setDataCharacter] = useState({});
  let [charactersChart, setCharactersChart] = useState([]);

  async function loadUnpopularCharacter() {
    const locationAPI = `https://rickandmortyapi.com/api/location/?name=Earth%20(C-137)`;
    const dataLocation = await fetch(locationAPI).then(res => res.json());
    const charactersID = dataLocation.results.map(residents => {
      return residents.residents.map(resident => {
        return +resident.split('/').pop();
      })
    });

    const charactersAPI = `https://rickandmortyapi.com/api/character/${charactersID}`;
    const data = await fetch(charactersAPI).then(res => res.json());
    const unpopularCharacter = data.reduce((prev, curr) => {
      return prev.episode.length < curr.episode.length ? prev : curr;
    })
    setDataCharacter(unpopularCharacter);
  }

  async function loadCharactersDataForChart() {
    const charactersNames = ['Rick Sanchez', 'Summer Smith', 'Morty Smith', 'Beth Smith', 'Jerry Smith'];
    const charactersInfo = await Promise.all(
      charactersNames.map(async (name) => await (await fetch(`https://rickandmortyapi.com/api/character/?name=${name}&status=alive`)).json())
    )
    const charactersData = charactersNames.map((character, index) =>
    ({
      name: character,
      value: charactersInfo[index].results[0].episode.length,
      image: charactersInfo[index].results[0].image
    }));
    setCharactersChart(charactersData);
  }

  useEffect(() => {
    loadUnpopularCharacter();
    loadCharactersDataForChart();
  }, []);

  let characterDOM, characterImage = <h1>Loading...</h1>
  if (dataCharacter.name) {
    characterImage = (<div className='image-container'>
      <img className='character-image' src={dataCharacter.image}></img>
    </div>)
    const tableRows = {
      Name : dataCharacter.name,
      Location: dataCharacter.location.name,
      'Origin Name': dataCharacter.origin.name,
      Popularity: dataCharacter.episode.length
    };
    characterDOM = Object.entries(tableRows).map(([key, value], index) => {
      return (<tr className='row' key={index}>
      <td className='row' scope="row">{key}:</td>
      <td>{value}</td>
    </tr>);
    });
    characterDOM = (
      <table className='character-table'>
        <tbody>
         {characterDOM}
        </tbody>
      </table>);
  }

  return (
    <div className="App">
      <div className="header">
      </div>
      <div className='title'>Rick and Morty</div>
      <div className='character-table'>
        <div className='sub-title'>The Most Unpopular Character</div>
        {characterImage}
        {characterDOM}

      </div>
      <div className='title'>Characters Episodes</div>
      <BarChart chartBars={charactersChart} />
    </div>
  );

}
export default App;
