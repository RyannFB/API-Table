const API_TOKEN = "1d7566f6442d37";

export async function getIpInfo(ip) {
    const url = `https://ipinfo.io/${ip}/json?token=${API_TOKEN}`;
    try{
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Erro',error.message);
        return null;
    }
};