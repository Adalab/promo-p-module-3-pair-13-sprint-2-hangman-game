import '../styles/components/Letters.scss';

function ErrorLetters() {
  return (
    <div className='error'>
      <h2 className='title'>Letras falladas:</h2>
      <ul className='letters'>{renderErrorLetters()}</ul>
    </div>
  );
}

export default Error;
