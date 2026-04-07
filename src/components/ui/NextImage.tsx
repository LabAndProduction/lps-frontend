import { INextImageProps } from "@/types/props/ui.types";
import Image from "next/image";

export default function NextImage({ ...props }: INextImageProps) {
    return (
        <Image
            {...props}
            quality={props.quality ? props.quality : 100}
            alt={props.alt ? props.alt : " "}
            src={props.src}
        />
    );
}
