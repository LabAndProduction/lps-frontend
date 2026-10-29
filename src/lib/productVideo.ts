// A product's video link turned into something the gallery can play in place: a YouTube
// video or playlist gets an embed address (the privacy-enhanced youtube-nocookie domain)
// and, for a single video, its preview frame. Any other link stays an outside link.
export interface IProductVideo {
    url: string;
    embed: string;
    poster: string | null;
}

export function productVideo(url: string): IProductVideo | null {
    let parsed: URL;
    try {
        parsed = new URL(url);
    } catch {
        return null;
    }
    const host = parsed.hostname.replace(/^(www\.|m\.)/, "");
    let id: string | null = null;
    if (host == "youtu.be") id = parsed.pathname.slice(1).split("/")[0] || null;
    else if (host == "youtube.com") {
        id =
            parsed.searchParams.get("v") ||
            parsed.pathname.match(/^\/(?:shorts|embed|live)\/([\w-]{6,})/)?.[1] ||
            null;
    } else return null;

    const list = parsed.searchParams.get("list");
    if (id) {
        return {
            url,
            embed: `https://www.youtube-nocookie.com/embed/${id}${list ? `?list=${list}` : ""}`,
            poster: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
        };
    }
    if (list) {
        return { url, embed: `https://www.youtube-nocookie.com/embed/videoseries?list=${list}`, poster: null };
    }
    return null;
}

// adds autoplay to an embed address, since the player starts on the visitor's click
export const autoplay = (embed: string) => `${embed}${embed.includes("?") ? "&" : "?"}autoplay=1`;
