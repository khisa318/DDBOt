import { useDevice } from '@deriv-com/ui';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <div className='app-header__logo'>
            <a href='/' className='logo-link'>
                <span className='logo-text'>🚀 ProfitScopeX</span>
            </a>
        </div>
    );
};
