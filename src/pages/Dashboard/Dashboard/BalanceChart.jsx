import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { IoPaperPlaneOutline } from "react-icons/io5";

const balanceData = [
    ["Month", "Balance"],
    ["Apr", 80],
    ["May", 40],
    ["Jun", 50],
    ["Jul", 250],
    ["Aug", 500],
    ["Sep", 320],
    ["Oct", 180],
    ["Nov", 200],
    ["Dec", 490],
];

const BalanceChart = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // Detect dark mode using matchMedia
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeQuery.matches);

        // Listen for changes
        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener("change", handleChange);

        return () => darkModeQuery.removeEventListener("change", handleChange);
    }, []);

    const chartOptions = {
        chartArea: { width: "100%", height: "70%" },
        vAxis: {
            gridlines: { color: isDarkMode ? "#555" : "#ccc" },
            textStyle: { fontSize: 10, color: isDarkMode ? "#ffffff" : "#000" },
        },
        hAxis: {
            textStyle: { fontSize: 10, color: "#9f97a4" },
        },
        colors: [ "#8884d8"],
        backgroundColor: "transparent",
    };

    return (
        <div className="flex flex-col justify-center items-center bg-[var(--white)] dark:bg-[var(--dark-secondary)] rounded-xl shadow-md mx-auto p-4 w-full max-w-[440px] sm:max-w-full h-full md:h-[270px] lg:h-[267px] xl:h-[270px] overflow-x-hidden">
            <div className="w-full lg:w-[220px] xl:w-[320px] h-full px-2">
                <div className="flex justify-between">
                    <h3 className="text-[13px] sm:text-[10px] md:text-[13px] font-semibold text-[var(--dark)] dark:text-[var(--white)] ">
                        Balance
                    </h3>
                    <span className="flex items-center justify-center text-xs bg-[#e7e6ff] text-[#8884d8] hover:bg-[#8884d8] hover:text-[var(--white)] w-8 h-8 rounded-full transition duration-500 cursor-pointer">
                        <IoPaperPlaneOutline className="text-sm" />
                    </span>
                </div>

                <h2 className="text-[16px] font-bold text-gray-800 dark:text-gray-300 leading-none -mt-4 md:-mt-3.5">
                    $6,000
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(USD)</span>
                </h2>
            </div>

            <div className="w-full lg:w-[220px] xl:w-[320px] h-full px-2">
                <Chart
                    chartType="ColumnChart"
                    width="100%"
                    data={balanceData}
                    options={chartOptions}
                />
            </div>
        </div>
    );
};

export default BalanceChart;
