import { standalone_routes } from '@/components/shared';
import { DerivLogo, useDevice } from '@deriv-com/ui';
import './app-logo.scss';

export const AppLogo = () => {
    const { isDesktop } = useDevice();

    if (!isDesktop) return null;
    return (
        <a className='app-header__logo-container' href={standalone_routes.bot}>
            <div className='app-header__logo-icon'>PS</div>
            <span className='app-header__logo-text'>ProfitScopeX</span>
        </a>
    );
};
