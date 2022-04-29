import { useEffect, useState } from 'react';
// import { Route, Routes } from 'react-router-dom';

// Api
import getWordFromApi from '../services/api';
// Estilos
import '../styles/App.scss';
// Fuente
import font from '../fonts/KgTenThousandReasons-R1ll.ttf';
// Imagen
import blackboard from '../images/blackboard.jpg';

// "Partials"
import Header from './Header';
import Dummy from './Dummy';
import Form from './Form';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const maxNumberOfErrors = 13;

  useEffect(() => {
    setLoading(true);
    getWordFromApi().then((word) => {
      setWord(word);
      setLoading(false);
    });
  }, []);

  // Eventos
  const handleWord = (value) => {
    setWord(value);
    setUserLetters([]);
    setLastLetter('');
  };

  const handleKeyDown = (ev) => {
    // ¿Sabrías decir para qué es esta línea?
    ev.target.setSelectionRange(0, 1);
  };

  const handleChange = (ev) => {
    let re = /[a-zA-Z]/; // (3.3) 2. Controlando qué letras están permitidas
    if (re.test(ev.target.value)) {
      handleLastLetter(ev.target.value);
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const renderSolutionLetters = () => {
    const wordLetters = word.split('');
    return wordLetters.map((letter, index) => {
      const exists = userLetters.includes(letter.toLocaleLowerCase());
      return (
        <li key={index} className='letter'>
          {exists ? letter : ''}
        </li>
      );
    });
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className='letter'>
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);
    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className='page'>
      <Header />
      <main className='main'>
        <section>
          <SolutionLetters />
          <ErrorLetters />
          <Form />
        </section>
        <Dummy />
      </main>
    </div>
  );
}

export default App;
