import FashionMain from "./FashionMain";
import CommonSidebar from '../../shared/CommonSidebar/CommonSidebar';

const Fashion = () => {
    return (
        <div className="max-w-[1200px] mx-auto px-2 sm:px-4 py-10 flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-5 xl:gap-6">
            <div className="flex-1">
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-1.5 sm:gap-3">
                        <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                        <h2 className="text-xl sm:text-3xl font-libreBas font-bold text-[var(--dark)] dark:text-[var(--white)]">
                            Latest Stories
                        </h2>
                        <div className="w-8 sm:w-12 bg-[var(--dark)] dark:bg-[var(--white)] h-[2px]"></div>
                    </div>
                    <p className="font-oxygen text-[var(--accent)] dark:text-[var(--accent-white)] text-xs sm:text-sm sm:mt-1">
                        Let's know about our current modern fashions
                    </p>
                </div>
                <FashionMain />
            </div>
            <CommonSidebar />
        </div>
    );
};

export default Fashion;
