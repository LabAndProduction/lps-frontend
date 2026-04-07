"use client";

import { IStaticMapProps } from "@/types/props/ui.types";
import classNames from "classnames";
import { useEffect, useRef } from "react";

export default function StaticMap({ iframe, wrapperClassname = "" }: IStaticMapProps) {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mapRef && mapRef.current) {
            mapRef.current.innerHTML = iframe;
        }
    }, [iframe]);

    return (
        <div className={classNames("custom-block w-full relative overflow-hidden", wrapperClassname)} ref={mapRef}>
            <div className="absolute -top-[5.625rem]" id="map"></div>
        </div>
    );
}
