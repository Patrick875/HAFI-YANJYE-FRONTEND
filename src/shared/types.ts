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
    role?: string | null;
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

export enum OrderStatus {
    PENDING = "PENDING",
    PAID = "PAID",
    DELIVERED = "DELIVERED",
    CANCELED = "CANCELED",
    CONFIRMED = "CONFIRMED",
    COMPLETED = 'COMPLETED',
}

export interface order {
    id: number;
    orderId: string;
    orderDate: string;
    status: OrderStatus;
    orderDetails: string;
    customer: customer;
}

export interface customer {
    id: number;
    fullName: string;
    telephone: string;
    role: string;
    orders: order[];
    email: string;
    password: string;
}



export type OrderItem = {
    id: number;
    product: {
        id: number;
        name: string;
        description: string;
        price: number;
        cost: number;

    };
    quantity: number;

};
export interface agent {
    email: string;
    fullName: string;
    id: number;
    password?: string;
    role: string;
    telphone: string;
    tinNumber: string | null
}
export interface identityPerson {
    fullName: string;
    id: number;
}
export interface identityItem {
    name: string;
    id: number
}