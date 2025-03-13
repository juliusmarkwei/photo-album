"use client";

import Header from "./components/Header";
import Categories from "./components/Categories";
import UploadFloatingButton from "./components/UploadFloatingButton";
import Footer from "./components/Footer";
import DisplayImages from "./components/DisplayImages";
import Ruler from "./components/Ruler";

export default function Home() {
    return (
        <div className="relative bg-black items-center justify-items-center h-dvh w-full p-3 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="fixed w-full top-0 left-0 bg-black z-50">
                <Header />
                <Ruler />
                <Categories />
            </div>

            <div className="mt-[140px]">
                <DisplayImages />
                <UploadFloatingButton />
                <Footer />
            </div>
        </div>
    );
}
