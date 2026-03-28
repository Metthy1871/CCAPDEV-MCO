const config = {
    apiUrl: import.meta.env.PROD 
        ? 'https://ccapdev-mco-qira.onrender.com'
        : 'http://localhost:3000'
}

export default config;