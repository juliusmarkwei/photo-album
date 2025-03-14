"use client";

import Image from "next/image";
import React, { useState } from "react";
import Masonry from "react-masonry-css";

interface DisplayImagesProps {
	filteredImages: { url: string; name: string; category: string }[];
	isLoading: boolean;
}

const DisplayImages: React.FC<DisplayImagesProps> = ({
	filteredImages,
	isLoading,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 48;

	const breakpointColumnsObj = {
		default: 6,
		1200: 5,
		992: 4,
		768: 3,
		500: 2,
	};

	const indexOfLastImage = currentPage * pageSize;
	const indexOfFirstImage = indexOfLastImage - pageSize;
	const currentImages = filteredImages.slice(
		indexOfFirstImage,
		indexOfLastImage
	);

	const nextPage = () => {
		if (indexOfLastImage < filteredImages.length)
			setCurrentPage((prev) => prev + 1);
	};

	const prevPage = () => {
		if (currentPage > 1) setCurrentPage((prev) => prev - 1);
	};

	return (
		<section className="h-full w-dvw mt-2">
			{!isLoading && filteredImages.length === 0 && (
				<div className="flex justify-center items-center w-full h-full my-auto">
					<h1 className="text- font-medium text-white">
						No images found
					</h1>
				</div>
			)}

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
					</div>
				))}
			</Masonry>

			{isLoading && (
				<div className="flex justify-center items-center w-full h-full my-auto z-30">
					<h3 className="text- font-medium text-white">Loading...</h3>
				</div>
			)}

			<div className="fixed bottom-2 w-full flex justify-center items-center gap-4 mt-6">
				<button
					onClick={prevPage}
					disabled={currentPage === 1}
					className={`h-12 w-16 flex items-center justify-center rounded-lg ${
						currentPage === 1
							? "bg-gray-600 cursor-not-allowed"
							: "bg-white text-black hover:bg-gray-200"
					}`}
					title="Previous"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="size-6 p-2 w-full h-full"
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
					disabled={indexOfLastImage >= filteredImages.length}
					className={`h-12 w-16 flex items-center justify-center rounded-lg ${
						indexOfLastImage >= filteredImages.length
							? "bg-gray-600 cursor-not-allowed"
							: "bg-white text-black hover:bg-gray-200"
					}`}
					title="Next"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="size-6 p-2 w-full h-full"
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
