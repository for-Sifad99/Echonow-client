import React, { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import PageHelmet from '../shared/PageTitle/PageHelmet';
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxios";
import useAuth from "../../../hooks/useAuth/useAuth";
import useDbUser from "../../../hooks/useDbUser/useDbUser";
import CommonSidebar from '../shared/CommonSidebar/CommonSidebar';
import SubLoader from '../shared/Loader/SubLoader';
import defaultUser from '../../assets/default-user.png'
import { useQuery } from "@tanstack/react-query";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { SlSocialPintarest } from "react-icons/sl";
import { FaRegShareSquare } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io";
import { TfiAlarmClock } from "react-icons/tfi";
import { BiLogoFacebook } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { toast } from 'sonner';

const ArticleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { dbUser } = useDbUser();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const hasUpdatedView = useRef(false);
  const [authorImage, setAuthorImage] = useState(defaultUser);

  const {
    data: article = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["article", id],
    queryFn: async () => {
      try {
        if (user) {
          const res = await axiosSecure.get(`/api/article/${id}`);
          return res.data;
        } else {
          const res = await axiosPublic.get(`/api/article/${id}`);
          return res.data;
        }
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error('Please login to view premium articles!');
          navigate('/auth/login');
          return null;
        }
        throw err;
      }
    },
    enabled: !!id,
  });

  // Fetch author data
  useEffect(() => {
    if (article?.authorEmail) {
      const fetchAuthorData = async () => {
        try {
          const res = await axiosPublic.get(`/api/users/by-email/${article.authorEmail}`);
          if (res.data?.photo) {
            setAuthorImage(res.data.photo);
          }
        } catch (err) {
          console.error("Failed to fetch author data:", err);
          setAuthorImage(defaultUser);
        }
      };
      fetchAuthorData();
    }
  }, [article?.authorEmail, axiosPublic]);

  useEffect(() => {
    if (article && article.isPremium && !user) {
      toast.error('Please login to view premium articles!');
      navigate('/auth/login');
    } else if (article && article.isPremium && user && !dbUser?.isPremium) {
      toast.error('Please subscribe to view premium articles!');
      navigate('/subscription');
    }
  }, [article, user, dbUser, navigate]);

  useEffect(() => {
    if (!id || hasUpdatedView.current || !article || article.isPremium) return;
    hasUpdatedView.current = true;
    axiosPublic
      .patch(`/api/article/${id}/views`)
      .then(() => refetch())
      .catch(console.error);
  }, [id, axiosPublic, refetch, article]);

  useEffect(() => {
    if (!id || hasUpdatedView.current || !article || !article.isPremium || !user)
      return;
    hasUpdatedView.current = true;
    axiosSecure
      .patch(`/api/article/${id}/views`)
      .then(() => refetch())
      .catch(console.error);
  }, [id, axiosSecure, refetch, article, user]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center mx-auto my-10">
        <SubLoader size="text-lg md:text-xl xl:text-2xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <p>Error loading article: {error.message}</p>
      </div>
    );
  }

  if (!article) return null;

  return (
    <>
      <PageHelmet
        title={`${article?.title}`}
        description={
          article?.description ||
          "Read this engaging article now on EchoNow – the voice of real stories."
        }
      />

      <section className="flex flex-col md:flex-row gap-4 w-full max-w-[1366px] mx-auto p-4 text-[var(--dark)] dark:text-[var(--white)]">
        <div className="flex-1">
          <div className="flex flex-col justify-center gap-3">
            {/* Header */}
            <div className="flex flex-col sm:flex-row text-[10px] sm:text-xs text-gray-500 dark:text-[var(--white)] font-oxygen">
              <div className="flex items-center">
                <Link className="text-gray-600 dark:text-[var(--white)]" to="/">
                  Home
                </Link>
                <MdOutlineKeyboardArrowRight />
                <div className="flex items-center">
                  {article.tags.map((t, index) => (
                    <span key={index} className="flex items-center">
                      <span>{t}</span>
                      {index !== article.tags.length - 1 && (
                        <MdOutlineKeyboardArrowRight />
                      )}
                    </span>
                  ))}
                </div>
                <MdOutlineKeyboardArrowRight />
              </div>
              <h3>{article?.title}</h3>
            </div>

            <h3 className="font-oxygen">
              through{" "}
              <a href="#" className="font-bold underline">
                {article.publisher}
              </a>
            </h3>

            <div className="font-jost flex items-center gap-2">
              {article.tags.map((t, index) => (
                <span
                  key={index}
                  className="text-[10px] px-3 py-0.5 uppercase font-semibold bg-[var(--primary)] text-[var(--white)]"
                >
                  {t}
                </span>
              ))}
            </div>

            <h1 className="font-libreBas text-xl sm:text-[34px] leading-6 sm:leading-10 font-bold">
              {article?.title}
            </h1>

            <div className="font-oxygen text-sm sm:text-base text-gray-800 dark:text-[var(--white)] dark:opacity-80 whitespace-pre-line">
              {article?.description}
            </div>

            {/* Author */}
            <div className="flex flex-col sm:flex-row gap-1 sm:items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 font-jost">
                <img
                  src={authorImage}
                  className="w-3.5 sm:w-5 rounded-full blur-sm transition-all duration-500"
                  alt="Author"
                  onLoad={(e) => e.target.classList.remove('blur-sm')}
                  onError={(e) => (e.target.src = defaultUser)}
                />
                <h2 className="text-gray-700 dark:text-[var(--white)] font-semibold -ml-1 sm:-ml-2">
                  {article.authorName}
                </h2>
                <h2 className="flex items-center gap-0.5">
                  <TfiAlarmClock />
                  Posted At:{" "}
                  {new Date(article.postedDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <h3 className="flex items-center gap-0.5">
                  <GrView />
                  {article?.viewCount || 0}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-base sm:text-xl">
                <a
                  href="#"
                  className="flex items-center gap-0.5 text-sm font-normal text-[var(--dark)] dark:text-[var(--white)] font-jost"
                >
                  <FaRegShareSquare /> Share
                </a>
                <a href="#" className="text-blue-600">
                  <BiLogoFacebook />
                </a>
                <a href="#" className="text-blue-400">
                  <RiTwitterLine />
                </a>
                <a href="#" className="text-pink-500">
                  <IoLogoInstagram />
                </a>
                <a
                  href="#"
                  className="text-sm sm:text-base text-[var(--primary)]"
                >
                  <SlSocialPintarest />
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="relative w-full">
              <img
                src={article?.image}
                alt={article?.title}
                className="mb-6 h-full w-full object-contain blur-sm transition-all duration-500"
                onLoad={(e) => e.target.classList.remove('blur-sm')}
                onError={(e) => (e.target.src = '/default-article.png')}
              />
              {article.isPremium && (
                <span className="absolute top-9 -left-5 sm:top-13 sm:-left-8 bg-yellow-400 text-xs sm:text-base font-bold text-black px-3 py-1 sm:px-6 sm:py-1.5 shadow rotate-270">
                  Premium
                </span>
              )}
            </div>

            {/* === Static Section === */}
            <div className="font-oxygen text-gray-800 dark:text-gray-200 text-sm sm:text-base leading-7 space-y-4">
              <p className="text-sm sm:text-lg sm:leading-6 md:text-xl">
                <span className="text-6xl sm:text-8xl font-libreBas font-bold float-left pr-2 text-[var(--dark)] dark:text-[var(--white)]">
                  W
                </span>
                hat's made Amazon shoppers fall in love with Tozos? Superior
                audio quality, of course, courtesy of 6-millimeter speaker
                drivers that produce powerful, crystal-clear sound. Trust us,
                these earbuds sound way better than the past.
              </p>

              <p className="leading-5">
                Most premium wireless earbuds are not waterproof, and that can
                be a bummer if you're into sweaty workouts or spend hours at the
                pool. But these are — so feel free to get wet! Not that you're
                planning to dunk them, but these buds can be submerged up to 3
                feet of water and are safe for showering too. That's not the
                case with Samsung Galaxy Buds or AirPods (while the Pros are
                water-resistant, that's not the same as waterproof).
              </p>

              <blockquote className="border-l-4 border-gray-400 dark:border-gray-500 pl-4 italic text-sm sm:text-base text-gray-600 dark:text-gray-300">
                "Many of life's failures are people who did not realize how close
                they were to success when they gave up."
                <br />
                <span className="block text-xs mt-1 font-semibold">
                  — Thomas A. Edison
                </span>
              </blockquote>
            </div>
          </div>
        </div>

        <CommonSidebar />
      </section>
    </>
  );
};

export default ArticleDetails;