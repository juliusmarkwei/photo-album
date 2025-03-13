"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";

const DisplayImages = () => {
    const [images, setImages] = useState<{ url: string; name: string }[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 48; // Images per page

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch("/api/photos");
                const data = await response.json();
                console.log(data);
                setImages(data.images);
            } catch (error) {
                console.error("Error fetching images:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Responsive breakpoints for Masonry
    const breakpointColumnsObj = {
        default: 6,
        1200: 5,
        992: 4,
        768: 3,
        500: 2,
    };

    // Get images for the current page
    const indexOfLastImage = currentPage * pageSize;
    const indexOfFirstImage = indexOfLastImage - pageSize;
    const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);

    // Handle pagination
    const nextPage = () => {
        if (indexOfLastImage < images.length)
            setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <section className="h-full w-dvw mt-2">
            {/* No images found */}
            {!isLoading && images.length === 0 && (
                <div className="flex justify-center items-center w-full h-full my-auto">
                    <h1 className="text- font-medium text-white">
                        No images found
                    </h1>
                </div>
            )}

            {/* Image Grid */}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex  gap-x-2 lg:gap-y-8 lg:gap-x-4 lg:px-2"
                columnClassName="flex flex-col"
            >
                {currentImages.map((image, index) => (
                    <div key={index} className="relative mb-4 group">
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={300}
                            height={500}
                            className="object-cover rounded-lg transition duration-200 group-hover:blur-xs"
                            priority
                        />

                        <span
                            className="hidden absolute bottom-2 left-2 font-bold text-gray-950 px-2 py-1 rounded-2xl bg-gray-300 group-hover:block"
                            title={image.name}
                        >
                            {image.name.length < 30
                                ? image.name
                                : image.name.slice(0, 30) + "..."}
                        </span>

                        <span className="hidden absolute top-2 right-4 bg-black rounded-3xl group-hover:block">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                tabIndex={0}
                                className="size-10 text-white p-2 focus:bg-pink-500 transition-colors duration-200"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                            </svg>
                        </span>
                    </div>
                ))}
            </Masonry>

            {/* Loading UI */}
            {isLoading && (
                <div className="flex justify-center items-center w-full h-full my-auto z-30">
                    <h3 className="text- font-medium text-white">Loading...</h3>
                </div>
            )}

            {/* Pagination Controls */}
            <div className=" fixed bottom-2 w-full flex justify-center items-center gap-4 mt-6">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={` h-12 w-16 flex items-center justify-center rounded-lg ${
                        currentPage === 1
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200 cursor-pointer"
                    }`}
                    title="Previous"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`size-6 p-2 w-full h-full  ${
                            currentPage === 1
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 19.5 8.25 12l7.5-7.5"
                        />
                    </svg>
                </button>

                <button
                    onClick={nextPage}
                    disabled={indexOfLastImage >= images.length}
                    className={`h-12 w-16 flex items-center justify-center rounded-lg ${
                        indexOfLastImage >= images.length
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-white text-black hover:bg-gray-200"
                    }`}
                    title={`${
                        indexOfLastImage >= images.length
                            ? "No next page"
                            : "Next"
                    }`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className={`size-6 p-2 w-full h-full  ${
                            indexOfLastImage >= images.length
                                ? "cursor-not-allowed"
                                : "cursor-pointer"
                        }`}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default DisplayImages;
