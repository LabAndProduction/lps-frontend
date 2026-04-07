import FooterBottom from "./footerBottom/FooterBottom";
import FooterTop from "./footerTop/FooterTop";

export default function Footer() {
    return (
        <footer className="lg:pb-0 pb-[3.5rem] mt-[3.75rem]">
            <FooterTop />
            <FooterBottom />
        </footer>
    );
}
