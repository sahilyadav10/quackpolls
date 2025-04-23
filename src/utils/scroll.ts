export const scrollToElement = (hash: string, offset: number = -100) => {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  const element = document.getElementById(id.replace("#", ""));

  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset + offset;
    if (id.includes("project")) {
      const screenHeight = window.innerHeight;
      if (screenHeight > 1000) {
        const projectsHeight = element.getBoundingClientRect().height;
        const bottomOffset = screenHeight - projectsHeight - 200;
        window.scrollTo({
          top: offsetPosition - Math.max(200, bottomOffset),
          behavior: "smooth",
        });
      } else {
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    return true;
  }

  return false;
};

export const handleHashChange = (
  window: Window,
  id: string | undefined,
  offset: number = -100
) => {
  const hash = id || window.location.hash;

  return scrollToElement(hash, offset);
};

export const findMostVisibleSection = (sections: [string, number][]) => {
  return sections.reduce((mostVisible, current) => {
    const [, currentRatio] = current;
    const [, mostVisibleRatio] = mostVisible;

    return currentRatio > mostVisibleRatio ? current : mostVisible;
  });
};
