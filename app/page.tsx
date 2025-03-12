"use client";

import Header from "./components/Header";
import Categories from "./components/Categories";
import UploadFloatingButton from "./components/UploadFloatingButton";
import Footer from "./components/Footer";
import DisplayImages from "./components/DisplayImages";
import Ruler from "./components/Ruler";

export default function Home() {
    return (
        <div className="bg-black items-center justify-items-center h-dvh -dvw p-3 pb-20 font-[family-name:var(--font-geist-sans)]">
            <div className="sticky">
                <Header />
                <Ruler />
                <Categories />
            </div>
            <DisplayImages />
            <UploadFloatingButton />
            <Footer />
        </div>
    );
}
