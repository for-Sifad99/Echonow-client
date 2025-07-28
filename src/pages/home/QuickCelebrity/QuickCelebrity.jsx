import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import { FaRegShareSquare } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth/useAuth";
import toast from "react-hot-toast";

const QuickCelebrity = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: celebrityArticles, isPending, isError } = useQuery({
        queryKey: ["celebrityArticles"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles/special");
            return res.data.celebrity;
        },
    });

    const handleNavigate = (article, id) => {
        if (article.isPremium && user?.isPremium) {
            navigate(`/article/${id}`);
        } else if (!article.isPremium) {
            navigate(`/article/${id}`);
        }
        else if (article.isPremium && !user?.isPremium) {
            toast.error('Please get subscription first!')
        }
    }

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Something went wrong</p>;

    return (
        <div className="sm:bg-red-100 md:bg-transparent max-w-[1200px] text-[var(--dark)] dark:text-[var(--white)] mx-auto sm:px-4 px-2 py-10">
            <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-3">
                    <div className="w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    <h2 className="text-3xl font-libreBas font-bold">
                        Quick News
                    </h2>
                    <div className="w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                </div>
                <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-sm mt-1">
                    Let's know our celebrities current situation
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {celebrityArticles?.map((article) => (
                    <div
                        onClick={() => handleNavigate(article, article._id)}
                        key={article._id}
                        className="group relative flex flex-col md:flex-row justify-center md:gap-4 border border-[#e0e0e0] dark:border-[#3f3f3f]"
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-40 w-full sm:h-48 md:h-full md:w-40 lg:h-52 lg:w-48 object-cover rounded"
                        />
                        <div className="md:mt-3 space-y-2 p-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                            <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">{article.tags}</span>
                            <h3 className="text-xl sm:text-base xl:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">
                                <span className="sm:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                <span className="hidden sm:block md:hidden"> ''{article.title.slice(0, 50)}..''</span>
                                <span className="hidden md:block lg:hidden"> ''{article.title.slice(0, 30)}..''</span>
                                <span className="hidden lg:block"> ''{article.title.slice(0, 50)}..''</span>
                            </h3>
                            <h4 className="mt-4 sm:mt-0 lg:mt-4 text-xs font-oxygen leading-4 text-[ar(--base-200) opacity-70 dark:opacity-90">
                                <span className="sm:hidden">{article.description.slice(0, 100)}....</span>
                                <span className="hidden sm:block lg:hidden">{article.description.slice(0, 80)}....</span>
                                <span className="hidden lg:block">{article.description.slice(0, 100)}....</span>
                            </h4>
                            <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                <p>By <span className="opacity-70">{article.authorName} • {new Date(article.postedDate).toDateString()}</span>
                                </p>
                                <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-60 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                            </div>
                        </div>
                        {article.isPremium &&
                            <div className='absolute bottom-6.5 -left-4.5 group-hover:-left-5.5 rotate-90 group-hover:rotate-270 transition duration-500'>
                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default QuickCelebrity;
