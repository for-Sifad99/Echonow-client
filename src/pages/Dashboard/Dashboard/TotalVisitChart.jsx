import React from 'react';
import { Chart } from 'react-google-charts';
import { IoPaperPlaneOutline } from "react-icons/io5";

const data = [
    ['Day', 'Visits'],
    ['Mon', 280],
    ['Tue', 200],
    ['Wed', 220],
    ['Thu', 170],
    ['Fri', 190],
    ['Sat', 210],
    ['Sun', 250],
];

const options = {
    backgroundColor: 'transparent',
    legend: 'none',
    hAxis: {
        textStyle: { color: '#9f97a4' },
    },
    vAxis: {
        gridlines: { color: "#555" },
        textStyle: { color: '#ccc' },
    },
    chartArea: { width: '100%', height: '70%' },
    colors: ['#f22d3a'],
    bar: { groupWidth: '60%' },
};

const TotalVisitChart = () => {
    return (
        <div className="flex flex-col justify-center items-center dark:bg-[var(--dark-secondary)] bg-[var(--white)] rounded-xl shadow-md mx-auto p-4 w-full max-w-[440px] sm:max-w-full h-full md:h-[270px] lg:h-[267px] xl:h-[270px] overflow-x-hidden">
            <div className="w-full lg:w-[220px] xl:w-[320px] h-full px-2">
                <div className="w-full flex items-center justify-between">
                    <h3 className="text-[13px] sm:text-[10px] md:text-[13px] font-semibold text-[var(--dark)] dark:text-[var(--white)] -mt-3">
                        Total Visit
                    </h3>
                    <span className='flex items-center justify-center text-xs bg-[var(--secondary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-[var(--white)] w-8 h-8 rounded-full transition duration-500 cursor-pointer'>
                        <IoPaperPlaneOutline className="text-sm" />
                    </span>
                </div>

                <h2 className="text-[16px] font-bold text-gray-800 dark:text-gray-300 leading-none -mt-3.5">
                    on July<span className="text-xs text-gray-500 dark:text-gray-400 ml-1">2024</span>
                </h2>
            </div>

            <div className="w-full lg:w-[220px] xl:w-[320px] h-full px-2">
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    );
};

export default TotalVisitChart;
