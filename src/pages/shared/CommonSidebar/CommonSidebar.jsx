import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic/useAxios";
import SubLoader from '../Loader/SubLoader';
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { LiaGithub } from "react-icons/lia";
import { IoLogoInstagram } from "react-icons/io";
import { AiOutlineYoutube } from "react-icons/ai";
import { SlSocialPintarest } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth/useAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CommonSidebar = () => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const { data: topFashion = [], isLoading } = useQuery({
        queryKey: ["top-fashion"],
        queryFn: async () => {
            const res = await axiosPublic.get("/articles/top-fashion");
            return res.data;
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

    return (
        <aside className="w-full md:w-[260px] lg:w-[350px] xl:w-sm md:sticky top-4 h-fit">
            {/* Social Icons */}
            <div className="pb-4 rounded-md space-y-4">
                <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-1 text-base text-[var(--white)] font-jost">
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center bg-blue-600">
                                <a href="#"><BiLogoFacebook /></a></p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Facebook</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Likes</h3>
                    </div>
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center bg-blue-400">
                                <a href="#"><RiTwitterLine /></a>
                            </p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Twitter</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Followers</h3>
                    </div>
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center bg-pink-500">
                                <a href="#"><IoLogoInstagram /></a>
                            </p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Instagram</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Followers</h3>
                    </div>
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center bg-[var(--primary)]">
                                <a href="#"><AiOutlineYoutube /></a>
                            </p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Youtube</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Subscribes</h3>
                    </div>
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center bg-red-700">
                                <a href="#"><SlSocialPintarest />
                                </a>
                            </p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Pintarest</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Pin</h3>
                    </div>
                    <div className="flex items-center justify-between border border-[#e0e0e0] dark:border-[#3f3f3f] py-2 px-3">
                        <div className="flex items-center gap-2">
                            <p className="h-7 w-7 rounded-full flex items-center justify-center text-xs bg-gray-700 dark:bg-gray-900">    <a href="#" ><LiaGithub />
                            </a>
                            </p>
                            <h3 className="text-xs text-[var(--dark)] dark:text-[var(--white)]">Github</h3>
                        </div>
                        <h3 className="text-[11px] text-[var(--dark)] dark:text-[var(--white)] opacity-80 dark:opacity-60">Stars</h3>
                    </div>
                </div>
            </div>


            {/* Explore More */}
            {isLoading ? <div className="flex items-center justify-center mx-auto my-6">
                <div className="md:hidden">
                    <SubLoader size="text-base" />
                </div>
                <div className="hidden md:block">
                    <SubLoader size="text-xl" />
                </div>
            </div> :
                <div className="py-4 rounded-md">
                    <h3 className="text-lg font-bold font-libreBas mb-3 text-[var-(--dark)] dark:text-[var(--white)]">Explore More</h3>

                    {topFashion.slice(0, 1).map((article, idx) => (
                        <div
                            onClick={() => handleNavigate(article, article._id)}
                            key={idx}
                            className="group relative flex flex-col"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-60 object-cover"
                            />
                            <div className="text-[var(--dark)] dark:text-[var(--white)]  md:mt-3 space-y-2 py-3 pr-3 md:p-0 md:pr-3 md:pt-2 md:pb-3 lg:pb-0">
                                <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-[var(--primary)] text-[var(--white)] inline-block">Featured</span>
                                <h3 className="text-xl sm:text-base xl:text-xl font-bold font-libreBas leading-6 sm:leading-5 lg:leading-6 group-hover:underline">''{article.title.slice(0, 50)}..''
                                </h3>
                                <h4 className="mt-4 text-xs font-oxygen leading-4 text-[ar(--base-200) opacity-70 dark:opacity-90">{article.description.slice(0, 100)}....
                                </h4>
                                <div className='mt-2 sm:mt-0 xl:mt-2 flex items-center justify-between gap-2 text-xs sm:text-[10px] lg:text-xs font-jost'>
                                    <p>
                                        <span className="opacity-90 dark:opacity-90">By</span> <span className='opacity-70 dark:opacity-90 font-bold dark:font-semibold'>{article.authorName}</span> • <span className="opacity-70"> {new Date(article.postedDate).toDateString()}</span>
                                    </p>
                                    <span className='text-xs sm:text-[8px] md:text-[10px] lg:text-xs opacity-60 dark:opacity-80 cursor-pointer'> <FaRegShareSquare /></span>
                                </div>
                            </div>
                            {article.isPremium &&
                                <div className='absolute top-[27px] -left-5.5 rotate-270 transition duration-500'>
                                    <span className="font-jost px-3 py-[3px] text-[10px]  uppercase font-semibold bg-orange-400 text-[var(--white)]  inline-block">Premium</span>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            }
            {isLoading ? <div className="flex items-center justify-center mx-auto my-6">
                <div className="md:hidden">
                    <SubLoader size="text-base" />
                </div>
                <div className="hidden md:block">
                    <SubLoader size="text-xl" />
                </div>
            </div> :
                <div className="py-4">
                    {topFashion.slice(1, 4).map((article, idx) => (
                        <div
                            onClick={() => handleNavigate(article, article._id)}
                            key={idx}
                            className="group flex gap-3 w-full h-24 dark:text-[var(--white)] transition"
                        >
                            <img
                                src={article.image}
                                alt={article.title}
                                className="min-w-[84px] max-w-[84px] min-h-[80px] max-h-[80px] object-cover rounded"
                            />
                            <div className='flex flex-col gap-2'>
                                <div className="flex items-center gap-1">
                                    <span className="font-jost w-fit text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]">Featured</span>
                                    {article.isPremium &&
                                        <span className="font-jost w-fit text-[10px] px-1 py-0.5 uppercase font-semibold bg-orange-400 text-[var(--white)] inline-block">P</span>
                                    }
                                </div>
                                <h3 className="mt-1 group-hover:underline text-[13px] sm:text-[15px] md:text-[13px] font-bold font-libreBas leading-3.5 sm:leading-4 md:leading-3.5">
                                    <span className="sm:hidden"> {article.title.slice(0, 35)}...</span>
                                    <span className="hidden sm:block md:hidden"> {article.title}...</span>
                                    <span className="hidden md:block lg:hidden"> {article.title.slice(0, 35)}...</span>
                                    <span className="hidden lg:block"> {article.title.slice(0, 60)}...</span>
                                </h3>
                                <span className='font-jost text-[10px] sm:text-[13px] md:text[8px] lg:text-[13px] leading-1 opacity-70'>{new Date(article.postedDate).toDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>}
        </aside>
    );
};

export default CommonSidebar;
