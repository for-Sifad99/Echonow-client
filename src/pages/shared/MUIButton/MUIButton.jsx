import React from 'react';
import Button from '@mui/material/Button';

const MUIButton = ({
    icon = null,
    size = '2.5rem',
    bgColor = '#ffe6e7',
    color = '#f22d3a',
    radius = '0%',
    onClick = () => { },
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                minWidth: size,
                width: size,
                height: size,
                backgroundColor: bgColor,
                color: color,
                borderRadius: radius,
                '&:hover': {
                    backgroundColor: bgColor,
                },
            }}
        >
            {icon}
        </Button>
    );
};

const MUILink = ({
    icon1 = null,
    text = '',
    icon2 = null,
    size = '2.5rem',
    bgColor = '#fff',
    color = '#5e5d72',
    radius = '2%',
    active = false,
    activeColor = '#f22d3a', 
    activeBgColor = '#ffe6e7', 
    onClick = () => { },
}) => {
    return (
        <Button
            onClick={onClick}
            sx={{
                width: size,
                minWidth: size,
                height: 'auto',
                justifyContent: 'flex-start',
                backgroundColor: active ? activeBgColor : bgColor,
                color: active ? activeColor : color,
                borderRadius: radius,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: active ? activeBgColor : '#f1f1f1',
                },
            }}
        >
            <div className="flex items-center text-base font-semibold px-2 py-1 w-full">
                <span className="text-xl">{icon1}</span>
                <span className="opacity-90 ml-2 mr-auto">{text}</span>
                {icon2}
            </div>
        </Button>
    );
};

export {MUIButton, MUILink};
