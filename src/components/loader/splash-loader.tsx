import { useEffect, useState } from 'react';
import './splash-loader.scss';

export default function SplashLoader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 30;
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='splash-loader-container'>
            <div className='splash-content'>
                <div className='splash-logo-wrapper'>
                    <div className='splash-logo'>
                        <svg viewBox='0 0 120 120' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <defs>
                                <linearGradient id='logoGradient' x1='0%' y1='0%' x2='100%' y2='100%'>
                                    <stop offset='0%' style={{ stopColor: '#6366f1', stopOpacity: 1 }} />
                                    <stop offset='100%' style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                                </linearGradient>
                            </defs>
                            
                            <circle cx='60' cy='60' r='55' fill='url(#logoGradient)' opacity='0.1' />
                            
                            <path
                                d='M 35 75 L 50 60 L 65 68 L 80 45 L 95 55'
                                stroke='url(#logoGradient)'
                                strokeWidth='3'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            />
                            
                            <text x='60' y='90' fontSize='32' fontWeight='bold' textAnchor='middle' fill='url(#logoGradient)'>
                                $
                            </text>
                        </svg>
                    </div>
                    <h1 className='splash-title'>ProfitScopeX</h1>
                    <p className='splash-subtitle'>Automated Trading Bot</p>
                </div>

                <div className='splash-progress'>
                    <div className='progress-bar'>
                        <div
                            className='progress-fill'
                            style={{
                                width: `${progress}%`,
                                transition: 'width 0.3s ease-out',
                            }}
                        />
                    </div>
                    <p className='progress-text'>
                        {progress < 30
                            ? 'Initializing...'
                            : progress < 60
                            ? 'Loading modules...'
                            : progress < 90
                            ? 'Connecting...'
                            : 'Almost ready...'}
                    </p>
                </div>

                <div className='splash-features'>
                    <div className='feature-item'>
                        <div className='feature-icon'>⚙️</div>
                        <span>Smart Bots</span>
                    </div>
                    <div className='feature-item'>
                        <div className='feature-icon'>📊</div>
                        <span>Real-time Analytics</span>
                    </div>
                    <div className='feature-item'>
                        <div className='feature-icon'>🔒</div>
                        <span>Secure Trading</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
