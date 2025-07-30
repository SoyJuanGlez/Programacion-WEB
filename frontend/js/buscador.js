window.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query !== '') {
                window.location.href = `resultados.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
});
