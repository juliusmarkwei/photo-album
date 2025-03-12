"use client";

import Image from "next/image";
import React, { useEffect } from "react";

const DisplayImages = () => {
    const [images, setImages] = React.useState<{ url: string; name: string }[]>(
        []
    );
    const [isLoading, setIsLoading] = React.useState(true);

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

    return (
        <section className="h-full w-full mt-2">
            {/* No images found UI */}
            {!isLoading && images.length === 0 && (
                <div className="flex justify-center items-center w-full h-full my-auto">
                    <h1 className="text- font-medium text-white">
                        No images found
                    </h1>
                </div>
            )}

            {/* Display images */}
            <div className="grid grid-cols-2 lg:grid-cols-5 w-[80%] overflow-y-scroll lg:gap-4">
                {images.map((image) => (
                    <div key={image.url} className="w-full h-full relative">
                        <Image
                            src={image.url}
                            alt={image.name}
                            width={150}
                            height={200}
                            className="object-cover rounded-3xl w-[45%] h-[50%] lg:w-full  lg:h-11/12"
                        />

                        <span className="absolute bottom-2 text-black w-full flex items-center justify-start px-2 font-medium">
                            {image.name}
                        </span>
                    </div>
                ))}
            </div>

            {/* Show loading UI */}
            {isLoading && (
                <div className="flex justify-center items-center w-full h-full my-auto z-30">
                    <h3 className="text- font-medium text-white">Loading...</h3>
                </div>
            )}
        </section>
    );
};

export default DisplayImages;
