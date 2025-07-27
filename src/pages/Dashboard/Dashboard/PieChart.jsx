import React from 'react';
import { IoPaperPlaneOutline } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../../hooks/useAxiosPublic/useAxios';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';


const COLORS = ['#00C49F', '#8884d8', '#FFBB28', '#FF8042', '#0088FE'];

const DynamicPublicationPieChart = () => {
    const axiosPublic = useAxiosPublic();

    const { data: publications = [], isLoading } = useQuery({
        queryKey: ['publishers-stats'],
        queryFn: async () => {
            const res = await axiosPublic.get('/publishers-stats');
            return res.data;
        },
    });

    const totalArticles = publications.reduce((sum, pub) => sum + pub.arts, 0);

    const data = publications.map(pub => ({
        name: pub.name,
        value: pub.arts,
        count: pub.arts,
    }));

    return (
        <div className="flex flex-col items-center justify-center mx-auto dark:bg-[var(--dark-secondary)] bg-[var(--white)] rounded-xl shadow-md text-black p-4 w-full max-w-[440px] sm:max-w-full h-[240px] sm:h-[266px] md:h-[270px] lg:h-[267px] xl:h-[270px]">
            {/* Title */}
            <div className="w-full flex justify-between">
                <h3 className="px-1 flex flex-col text-[13px] sm:text-[11px] font-semibold text-[var(--dark)] dark:text-[var(--white)] mb-2">
                    <p className='-mb-1'>Publishers Articles</p>
                    <p>Distribution</p>
                </h3>
                <span className='flex items-center justify-center text-xs bg-[#ffeabc] text-[#f09c00] hover:bg-[#FFBB28] hover:text-[var(--white)] w-8 h-8 rounded-full transition duration-500 cursor-pointer'>
                    <IoPaperPlaneOutline className="text-sm" />
                </span>
            </div>

            {/* Loading Placeholder */}
            {isLoading ? (
                <p className="mt-4 text-sm text-gray-500">Loading...</p>
            ) : (
                <div className='w-full h-full'>
                        <ResponsiveContainer width="100%" height={'100%'} className='relative'>
                        <PieChart>
                            <Pie
                        
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                nameKey="name"
                            >
                                {data.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value, name, props) =>
                                    [`${props.payload.count} articles (${((value / totalArticles) * 100).toFixed(1)}%)`, name]
                                }
                            />
                        </PieChart>

                        {/* Labels */}
                        <div className='font-medium text-[var(--accent)] dark:text-[var(--accent-white)] max-w-fit max-h-fit absolute top-[40%] left-[calc(50%-(95.67px/2))]'>
                            {data.map((entry, index) => (
                                <p key={index} className="text-[10px] leading-3">
                                    <span
                                        className="rounded-full"
                                        style={{
                                            backgroundColor: COLORS[index % COLORS.length],
                                            display: 'inline-block',
                                            width: '8px',
                                            height: '8px',
                                            marginRight: '4px',
                                        }}
                                    ></span>
                                    <span className='capitalize'>{entry.name} ({((entry.value / totalArticles) * 100).toFixed(0)}%)</span>
                                </p>
                            ))}
                        </div>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
    );
};

export default DynamicPublicationPieChart;
