import { determineErrorMessage } from "../utils"

export const fetchSkips = async () => {
    try {
        const res = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft')
        const data = await res.json()
        return { data, error: null }
    } catch (e) {
        const message = determineErrorMessage(e);

        return { data: null, error: message }
    }
}