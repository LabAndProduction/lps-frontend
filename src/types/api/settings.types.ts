export interface ISettings {
    title: string;
    logo: string;
    logo_light: string;
    logo_svg: string;
    logo_light_svg: string;
    email: string;
    phone: string;
    phone2: string;
    phone3: string;
    address: string | null;
    address2: string | null;
    work_hours: string | null;
    work_hours2: string | null;
    map: string | null;
    map2: string | null;
    telegram: string;
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
    tiktok: string;
    uzum: string;
    linkedin: string;
    google_analytics_code: string | null;
    yandex_metrika_code: string | null;
    facebook_pixel_code: string | null;
    jivochat_code: string | null;
    bitrix_widget_code: string | null;
    inweb_widget_code: string | null;
    click: IClick;
    paycom: {
        merchant_id: string;
    };
}

interface IClick {
    merchant_id: string;
    service_id: string;
    user_id: string;
}
