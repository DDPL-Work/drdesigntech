export const openLeadModal = (type = "quote") => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("open-lead", { detail: type }));
  }
};

