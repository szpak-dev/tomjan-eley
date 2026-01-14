export type Manufacturer = {
  name: string;
  slug: string;
  logoUrl: string;
};

const data = [
    {
        name: "Eley Hawk",
        slug: "eley-hawk",
        logoUrl: "greyhunter.com.pl/eley_hawk_tpc_strap_logo.webp",
    },
    {
        name: "Eley",
        slug: "eley",
        logoUrl: "greyhunter.com.pl/eley_logo.webp",
    },
]

export function find(): Manufacturer[] {
    return data
}

export function get(slug: string): Manufacturer {
    const manufacturer = data.find(manufacturer => manufacturer.slug === slug);
    
    if (!manufacturer) {
        throw new Error(`Manufacturer with slug "${slug}" not found.`);
    }
    
    return manufacturer;
}
