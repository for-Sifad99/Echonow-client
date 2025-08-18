import React from 'react';
import Button from '@mui/material/Button';

const MUIButton = ({
    icon = null,
    size = '50px',
    onClick = () => { },
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                minWidth: size,
                width: size,
                height: '46px',
                '&:hover': {
                    backgroundColor: 'transparent',
                }
            }}
        >
            <span className='flex items-center justify-center dark:bg-[var(--accent-white)] dark:text-[var(--dark)]  bg-[var(--secondary)] text-[var(--primary)] w-full h-full rounded-full'> {icon}</span>
        </Button>
    );
};

const MUILink = ({
    icon1 = null,
    text = '',
    icon2 = null,
    size = '2.5rem',
    active = false,
    onClick = () => { },
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: size,
                minWidth: size,
                height: '46px',
                justifyContent: 'flex-start',
                textTransform: 'none',
                backgroundColor: 'transparent',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
                padding: 0,
            }}
        >
            <div
                className={`flex items-center px-2 py-[11px] w-full text-base font-semibold rounded-md
           
          ${active
                        ? 'rounded-md bg-[var(--secondary)] text-[var(--primary)] dark:text-[var(--dark-bg)] dark:bg-[var(--accent-white)]'
                        : 'hover:bg-[var(--accent-white)] dark:hover:bg-[var(--accent)] text-[var(--dark)] dark:text-[var(--white)]'}
        `}
            >
                <span className="text-xl">{icon1}</span>
                <span className="ml-2 mr-auto opacity-70">{text}</span>
                <span className={`${active ? 'rotate-90' : ''}`}>{icon2}</span>
            </div>
        </Button>
    );
};

export { MUIButton, MUILink };
