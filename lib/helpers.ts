interface NavItem {
  _key: string;
  typeOfLink: "internal" | "external";
  text: string;
  title: string | null;
  slug?: string;
  pagePortionKey?: string;
  externalUrl?: string;
  navUrl?: string;
}

export function navUrlProcessor(
  navItems: NavItem[],
  homepageSlug: string
): NavItem[] {
  //   dataShape = [
  //     {
  //       _key: "ac16281d5748",
  //       typeOfLink: "internal",
  //       slug: "home",
  //       pagePortionKey: "contact",
  //       text: "Contact Us",
  //       title: null,
  //     },
  //     {
  //       text: "Agency",
  //       title: null,
  //       _key: "58b81db294d7",
  //       typeOfLink: "external",
  //       externalUrl: "https://www.firmalt.com",
  //     },
  //   ];

  return navItems.map((item) => {
    if (item.typeOfLink === "external") {
      item.navUrl = item.externalUrl;
      return item;
    } else if (item.typeOfLink === "internal") {
      let path = item.slug === homepageSlug ? "" : item.slug;
      if (item.pagePortionKey) {
        item.navUrl = `${path}/#${item.pagePortionKey}`;
        return item;
      } else {
        item.navUrl = `${path}/`;
        return item;
      }
    }
    return item; // Default case to handle any other typeOfLink values
  });
}
