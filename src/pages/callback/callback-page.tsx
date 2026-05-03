import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { crypto_currencies_display_order, fiat_currencies_display_order } from '@/components/shared';

/**
 * Gets the selected currency or falls back to appropriate defaults
 */
const getSelectedCurrency = (
    tokens: Record<string, string>,
    clientAccounts: Record<string, any>,
    state: any
): string => {
    const getQueryParams = new URLSearchParams(window.location.search);
    const currency =
        (state && state?.account) ||
        getQueryParams.get('account') ||
        sessionStorage.getItem('query_param_currency') ||
        '';
    
    const validCurrencies = [...fiat_currencies_display_order, ...crypto_currencies_display_order];
    if (tokens.acct1?.startsWith('VR') || currency === 'demo') return 'demo';
    if (currency && validCurrencies.includes(currency.toUpperCase())) return currency;
    
    const firstAccountKey = tokens.acct1;
    const firstAccountCurrency = clientAccounts[firstAccountKey]?.currency;
    return firstAccountCurrency || 'USD';
};

const CallbackPage = () => {
    useEffect(() => {
        const handleCallback = async () => {
            const hash = window.location.hash.substring(1);
            if (!hash) {
                // If no hash, check query params (sometimes legacy redirects use query params)
                const search = window.location.search.substring(1);
                if (!search) {
                    window.location.replace(window.location.origin);
                    return;
                }
            }

            const params = new URLSearchParams(hash || window.location.search.substring(1));
            const tokens: Record<string, string> = {};
            params.forEach((value, key) => {
                tokens[key] = value;
            });

            const accountsList: Record<string, string> = {};
            const clientAccounts: Record<string, { loginid: string; token: string; currency: string }> = {};

            for (const [key, value] of Object.entries(tokens)) {
                if (key.startsWith('acct')) {
                    const index = key.replace('acct', '');
                    const tokenKey = `token${index}`;
                    const curKey = `cur${index}`;
                    if (tokens[tokenKey]) {
                        accountsList[value] = tokens[tokenKey];
                        clientAccounts[value] = {
                            loginid: value,
                            token: tokens[tokenKey],
                            currency: tokens[curKey] || '',
                        };
                    }
                }
            }

            if (Object.keys(accountsList).length === 0) {
                // Fallback: maybe it's OIDC or a single token?
                if (tokens.token1 && tokens.acct1) {
                    accountsList[tokens.acct1] = tokens.token1;
                    clientAccounts[tokens.acct1] = {
                        loginid: tokens.acct1,
                        token: tokens.token1,
                        currency: tokens.cur1 || '',
                    };
                } else {
                    window.location.replace(window.location.origin);
                    return;
                }
            }

            localStorage.setItem('accountsList', JSON.stringify(accountsList));
            localStorage.setItem('clientAccounts', JSON.stringify(clientAccounts));
            
            // Set first account as active by default
            const firstAccount = Object.values(clientAccounts)[0];
            localStorage.setItem('authToken', tokens.token1 || firstAccount?.token || '');
            localStorage.setItem('active_loginid', tokens.acct1 || firstAccount?.loginid || '');

            Cookies.set('logged_state', 'true', {
                expires: 30,
                path: '/',
                secure: true,
            });

            // Determine the appropriate currency to use
            const selected_currency = getSelectedCurrency(tokens, clientAccounts, null);
            
            // Success! Redirect to the bot
            window.location.replace(`${window.location.origin}/bot/?account=${selected_currency}`);
        };

        handleCallback();
    }, []);

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '100vh',
            flexDirection: 'column',
            gap: '20px',
            background: 'var(--general-main-1)',
            color: 'var(--text-general)',
            fontFamily: 'sans-serif'
        }}>
            <div style={{
                padding: '40px',
                borderRadius: '12px',
                background: 'var(--general-section-1)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                textAlign: 'center'
            }}>
                <h2 style={{ marginBottom: '10px' }}>Authenticating ProfitScopeX</h2>
                <p style={{ opacity: 0.8 }}>Please wait while we set up your secure session...</p>
                <div style={{ 
                    marginTop: '20px',
                    width: '40px',
                    height: '40px',
                    border: '3px solid var(--brand-red-coral)',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    display: 'inline-block',
                    animation: 'spin 1s linear infinite'
                }} />
                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                `}</style>
            </div>
        </div>
    );
};

export default CallbackPage;
