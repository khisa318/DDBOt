import React from 'react';
import { observer } from 'mobx-react-lite';
import './dtrader.scss';

const DTrader: React.FC = observer(() => {
    return (
        <div className='dtrader'>
            <iframe
                id='dtrader-iframe'
                className='dtrader-iframe'
                src='https://newdtrader.vercel.app/'
                style={{ width: '100%', height: '100%', border: 'none' }}
                title='DTrader'
            />
        </div>
    );
});

export default DTrader;
