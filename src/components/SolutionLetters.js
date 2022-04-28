import '../styles/components/Letters.scss';

function SolutionLetters() {
  return (
    <div className='solution'>
      <h2 className='title'>Solución:</h2>
      <ul className='letters'>{renderSolutionLetters()}</ul>
    </div>
  );
}

export default Solution;
