import PropTypes from 'prop-types'
import { useEffect } from 'react';

const Toast = ({message, type, onClose}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        },5000);

        return () => {
            clearTimeout(timer)
        }
    }, [onClose]);
    
    const styles = type === "SUCCESS" 
        ? "fixed top-4 right-4 z-50 p-4 rounded-md bg-green-600 text-white max-w-md"
        : "fixed top-4 right-4 z-50 p-4 rounded-md bg-red-600 text-white max-w-md"
    return (
        <div className={styles}>
            <div className='flex justify-center items-center'>
                <span className='text-lg font-semibold'>{message}</span>
            </div>
        </div>
    )
};

Toast.propTypes = {
    message: PropTypes.string,
    type: PropTypes.string,
    onClose: PropTypes.func
};

export default Toast;