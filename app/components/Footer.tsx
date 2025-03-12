import React from "react";

const Footer = () => {
    return (
        <footer className="flex items-center w-full justify-center fixed bottom-4">
            <p className="text-gray-300 text-[12px] lg:text-[16px]">
                Made with ❤️ by{" "}
                <a
                    href="https://github.com/juliusmarkwei"
                    target="_blank"
                    className="text-white hover:underline"
                >
                    0x0is1watchmaker$$
                </a>
            </p>
        </footer>
    );
};

export default Footer;
