import React from 'react';
import PageHelmet from '../../shared/PageTitle/PageHelmet';
import DashCard from './DashCard';
import BalanceChart from './BalanceChart'
import TotalVisitChart from './TotalVisitChart';
import PieChart from './PieChart';

const Dashboard = () => {
    return (
        <>
            {/* Page Title */}
            <PageHelmet
                title="Admin Dashboard"
                description="Manage users, articles, and publishers with the EchoPress admin dashboard."
            />

            {/* Content */}
            <section>
                <h1 className='flex justify-center sm:justify-start text-4xl sm:text-5xl text-[var(--dark)] dark:text-[var(--white)] font-oxygen font-semibold leading-11 mb-6'>Dashboard</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:flex justify-center xl:justify-start mx-auto gap-3">
                    <DashCard />
                </div>
                <div className='flex flex-col sm:flex-row gap-3 mt-3 sm:mt-6'>
                    <TotalVisitChart />
                    <PieChart />
                    <BalanceChart />
                </div>
            </section>
        </>
    );
};

export default Dashboard;
