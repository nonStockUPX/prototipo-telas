document.addEventListener('DOMContentLoaded', function() {
    const produtoGrande = document.getElementById('produtoGrande');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const src = thumbnail.getAttribute('src');
            produtoGrande.setAttribute('src', src);
        });
    });
});
