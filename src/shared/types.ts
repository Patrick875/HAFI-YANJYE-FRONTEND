import { ReactElement } from "react";

export interface error {
    status: boolean;
    message: string
}
export interface navitem {
    page: string;
    link: string;
    icon: ReactElement;
    location: string
}
export interface img {
    data: string;
    url: string;
}
export interface user {
    fullname: string | null;
    email: string | null;
    telphone: string | null;
    id?: number | null;
    token?: string | null;
}
export interface image {
    link: string;
    id: number;
    product: string;
    name: string;
}
export interface product {
    cost: number;
    description: string;
    id: number;
    name: string;
    price: number;
    quatity: number;
    images?: image[];
    category: string;
}