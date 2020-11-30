import defaultSettings from '@config/config'

const title = defaultSettings.title;

export function getPageTitle(pageTitle) {
    if (pageTitle) {
        return `${pageTitle} - ${title}`
    }
    return `${title}`
}

export function setPageTitle(pageTitle) {
    document.title = getPageTitle(pageTitle)
}
