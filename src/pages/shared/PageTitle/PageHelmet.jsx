import React from 'react';
import { Helmet } from 'react-helmet-async';

const PageHelmet = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title ? `EchoNow - ${title}` : 'EchoNow'}</title>
            <meta name="description" content={description || 'EchoNow - Explore daily news, trends, and premium content.'} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta charSet="UTF-8" />
            <meta name="author" content="EchoNow Team" />
            <meta name="keywords" content="news, articles, premium, publishing, echoNow, blog" />
        </Helmet>
    );
};

export default PageHelmet;