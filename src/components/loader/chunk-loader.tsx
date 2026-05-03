import { Loader } from '@deriv-com/ui';
import SplashLoader from './splash-loader';

export default function ChunkLoader({ message }: { message: string }) {
    // Show splash loader only on initial app load, not on chunk loading
    const isInitialLoad = message.includes('connect to the server') || message.includes('offline dashboard');
    
    if (isInitialLoad) {
        return <SplashLoader />;
    }

    return (
        <div className='app-root'>
            <Loader />
            <div className='load-message'>{message}</div>
        </div>
    );
}
