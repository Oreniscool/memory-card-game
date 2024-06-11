import refresh from '../assets/refresh.svg';

function Restart() {
  function handleClick() {
    location.reload();
  }
  return (
    <div className="restart" onClick={handleClick}>
      <img src={refresh} alt="restart" />
    </div>
  );
}
export default Restart;
