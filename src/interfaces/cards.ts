export interface Card {
    _id?: string;
    title: string;
    subtitle: string;
    description: string;
    bizNumber?: number;
    phone: string;
    email: string;
    web?: string;
    image: {
        url: string;
        alt?: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip?: number;
    }
}