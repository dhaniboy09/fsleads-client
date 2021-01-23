import '../styles/globals.scss'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
