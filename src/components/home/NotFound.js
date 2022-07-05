import { FaExclamationTriangle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center alert'>
      <FaExclamationTriangle className='text-rose-700 text-8xl' />
      <h1 className='text-rose-700 text-3xl'>Error 404</h1>
      <p className=''>Sorry, this page does not exist.</p>
      <Link to='/home' className='btn'>
        To Home
      </Link>
    </div>
  );
}
