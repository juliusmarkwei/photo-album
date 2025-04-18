"use client";

import Header from "./components/Header";
import Categories from "./components/Categories";
import UploadFloatingButton from "./components/UploadFloatingButton";
import Footer from "./components/Footer";
import DisplayImages from "./components/DisplayImages";
import Ruler from "./components/Ruler";
import { useEffect, useState } from "react";
import { PhotoCategories } from "./constants/categories";
import { shuffle } from "./utils/shuffelList";

type Image = {
    url: string;
    name: string;
    category: string;
    key: string;
};

export default function Home() {
    const [images, setImages] = useState<Image[]>([]);
    const [filteredImages, setFilteredImages] = useState<Image[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedCategory, setSelectedCategory] = useState<string>(
        PhotoCategories.All
    );
    const [searchTerm, setSearchTerm] = useState("");
    const [query, setQuery] = useState("");

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

    console.log("Selected category is: ", selectedCategory);

    // Filter images by category and search term
    useEffect(() => {
        const lastShuffleTime = parseInt(
            localStorage.getItem("lastShuffleTime") || "0",
            10
        );

        const _filteredImages = images.filter(
            (img) =>
                (selectedCategory === PhotoCategories.All ||
                    img.category === selectedCategory) &&
                (!searchTerm ||
                    img.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        const currentTime = Date.now();
        if (currentTime - lastShuffleTime > 10000) {
            shuffle(_filteredImages);
            localStorage.setItem("lastShuffleTime", currentTime.toString());
        }

        setFilteredImages(_filteredImages);
    }, [images, selectedCategory, searchTerm]);

    return (
        <div className="relative bg-black items-center justify-items-center h-dvh w-full p-3 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="fixed w-full top-0 left-0 bg-black z-50">
                <Header
                    setSearchTerm={setSearchTerm}
                    setQuery={setQuery}
                    query={query}
                    setSelectedCategory={setSelectedCategory}
                />
                <Ruler />
                <Categories setSelectedCategory={setSelectedCategory} />
            </div>

            <div className="mt-[140px]">
                <DisplayImages
                    filteredImages={filteredImages}
                    isLoading={isLoading}
                />
                <UploadFloatingButton />
                <Footer />
            </div>
        </div>
    );
}
