import NavBar from '../components/NavBar';
import FileUploader from '../components/FileUploader';
import ClientList from '../components/ClientList';
import NotificationButton from '../components/NotificationButton';

export default function AppPage() {
  export default function AppPage() {
    const [clients, setClients] = useState([]); // Usamos useState para manejar el estado de los clientes
    
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      // Lógica para procesar el archivo y establecer el estado de "clients"
    };
  
    const sendNotifications = () => {
      // Lógica para enviar notificaciones
    };
  
    return (
      <div>
        <NavBar />
        <FileUploader onFileSelected={handleFileUpload} />
        {clients.length ? <ClientList clients={clients} /> : <p>No hay clientes cargados</p>}
        <NotificationButton onClick={sendNotifications} />
      </div>
    );
  }
  
}
