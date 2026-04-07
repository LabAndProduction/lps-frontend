import SectionWrapper from "@/components/layout/SectionWrapper";
import { ICartWrapperProps } from "@/types/props/ui.types";

export default function CartWrapper({ content, sidebar }: ICartWrapperProps) {
    return (
        <SectionWrapper>
            <div className="cart-wrapper-grid">
                {content}
                {sidebar}
            </div>
        </SectionWrapper>
    );
}
