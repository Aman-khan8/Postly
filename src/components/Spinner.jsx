  
function Loader({ color = 'border-indigo-700', size = 'w-12 h-12' }) {
  return (
    <div className={`animate-spin rounded-full border-4 border-t-transparent ${color} ${size}`}></div>
  );
}


export default Loader;