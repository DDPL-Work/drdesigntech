/**
 * WhatsApp deep linking utility for mobile and desktop web.
 * On mobile devices, triggers native WhatsApp application directly via protocol scheme.
 * On desktop, opens web.whatsapp.com / wa.me in a new tab.
 */

export const DEFAULT_WHATSAPP_PHONE = "917217052558";

export function isMobileDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  const ua = navigator.userAgent || "";
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(ua);
  const isTouchScreen = window.innerWidth <= 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 1);
  return isMobileUA || isTouchScreen;
}

export function getWhatsAppHref(phone = DEFAULT_WHATSAPP_PHONE, text = "", forMobile = false) {
  const cleanPhone = String(phone).replace(/\D/g, "");
  const encodedText = text ? encodeURIComponent(text) : "";
  if (forMobile) {
    return `whatsapp://send?phone=${cleanPhone}${encodedText ? `&text=${encodedText}` : ""}`;
  }
  return `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;
}

export function openWhatsApp(phone = DEFAULT_WHATSAPP_PHONE, text = "", event = null) {
  if (event && typeof event.preventDefault === "function") {
    event.preventDefault();
  }

  const cleanPhone = String(phone).replace(/\D/g, "");
  const encodedText = text ? encodeURIComponent(text) : "";
  const appUrl = `whatsapp://send?phone=${cleanPhone}${encodedText ? `&text=${encodedText}` : ""}`;
  const webUrl = `https://wa.me/${cleanPhone}${encodedText ? `?text=${encodedText}` : ""}`;

  if (typeof window === "undefined") return;

  const mobile = isMobileDevice();

  if (mobile) {
    const startTime = Date.now();
    // Directly navigate to native app scheme
    window.location.href = appUrl;

    // Safety fallback: if user does not have WhatsApp app installed,
    // window will remain active. After 1.2s, redirect to wa.me web link.
    const fallbackTimer = setTimeout(() => {
      if (typeof document !== "undefined" && !document.hidden && Date.now() - startTime < 2500) {
        window.location.href = webUrl;
      }
    }, 1200);

    const cancelFallback = () => {
      clearTimeout(fallbackTimer);
      window.removeEventListener("blur", cancelFallback);
      window.removeEventListener("pagehide", cancelFallback);
      window.removeEventListener("visibilitychange", cancelFallback);
    };

    window.addEventListener("blur", cancelFallback, { once: true });
    window.addEventListener("pagehide", cancelFallback, { once: true });
    window.addEventListener("visibilitychange", cancelFallback, { once: true });
  } else {
    // Desktop: open wa.me in a new tab
    window.open(webUrl, "_blank", "noopener,noreferrer");
  }
}

