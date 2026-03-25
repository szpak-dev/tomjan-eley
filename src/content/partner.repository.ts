import { getCollection } from "astro:content";

export type PartnerAddress = {
    street: string;
    postalCode: string;
    city: string;
};

export type PartnerContact = {
    phone: string;
    email: string;
};

export type PartnerCompany = {
    slug: string;
    name: string;
    color: string;
    nip: string;
    address: PartnerAddress;
    contact: PartnerContact;
    voivodeships: string[];
};

function sortPartners(partners: PartnerCompany[]): PartnerCompany[] {
    return [...partners].sort((left, right) => left.name.localeCompare(right.name, "pl"));
}

export async function find(): Promise<PartnerCompany[]> {
    const partners = await getCollection("partners");

    return sortPartners(
        partners.map((entry) => ({
            slug: entry.data.slug,
            name: entry.data.name,
            color: entry.data.color,
            nip: entry.data.nip,
            address: entry.data.address,
            contact: entry.data.contact,
            voivodeships: entry.data.voivodeships,
        }))
    );
}

export async function get(slug: string): Promise<PartnerCompany> {
    const partners = await find();
    const partner = partners.find((entry) => entry.slug === slug);

    if (!partner) {
        throw new Error(`Partner with slug "${slug}" not found.`);
    }

    return partner;
}

export async function findVoivodeshipCoverage(): Promise<Record<string, string>> {
    const partners = await find();

    return partners.reduce<Record<string, string>>((coverage, partner) => {
        for (const voivodeship of partner.voivodeships) {
            coverage[voivodeship] = partner.color;
        }

        return coverage;
    }, {});
}