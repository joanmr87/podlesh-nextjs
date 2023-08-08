function NotificationButton({ onClick }) {  
  return (
    <button 
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out" 
      onClick={onClick}
    >
      Enviar
    </button>
  );            
}

export default NotificationButton;
