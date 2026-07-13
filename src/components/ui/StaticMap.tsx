"use client";

export interface IStaticMapProps {
    iframe: string | null;
}

export default function StaticMap({ iframe }: IStaticMapProps) {
    return (
        <>
            {!!iframe && iframe.length > 0 && (
                <div
                    className="custom-block w-full relative overflow-hidden [&_iframe]:w-full [&_iframe]:min-h-[400px] [&_iframe]:h-auto"
                    dangerouslySetInnerHTML={{ __html: iframe }}></div>
            )}
        </>
    );
}
