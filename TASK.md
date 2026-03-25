# Importer and Distributors

Tomasz Jantos wants to put an accent, that he is a Importer of ammo and there are companies that are his distributors.

## Genral Idea

We must create a page named "Import and Distribution". It must include a map of Poland with division on voivodeships (do the reasearch on proper astro / npm package). Map must support mapping a specific color to a particular set of voivodeships. Second part is the set of companies, that will define which voivodeshiips they operate on. they will laso define color.

## Content

We must create a dedicated astro collection for the partner companies. The collection schema must contain:

- slug
- name
- color
- nip
- address {
    street
    postal code
    city
}
- contact {
    phone
    email
}
- voivodeships:string[]

## Translations
Since these are only addresses, we must provide translation only for ui. Mapping from partner company to voivodeship color will be done with literal polish names.

## Composition

Tomasz Jantos wants it to horizontally, so first card is Grey Hunter data and second is polish map with companies info on the left and map with their coverage on the right.