export const isMobileDevice = () => {
    if ( typeof window === "undefined") return false;
    return /mobile|android|iphone|ipad/i.test(navigator.userAgent)
}