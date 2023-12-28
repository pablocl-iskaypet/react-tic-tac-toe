import {Game} from './shared/components/Game'
import './App.css';
import {LanguageSelector} from './shared/components/Language'

function App() {
  return (
    <div className="App">
      <LanguageSelector/>
      <Game/>
    </div>
  );
}

export default App;
