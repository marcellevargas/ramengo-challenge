document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);

    const id = params.get('id');
    const description = params.get('description');
    const image = params.get('image');

    console.log('ID:', id);
    console.log('Description:', decodeURIComponent(description));
    console.log('Image URL:', decodeURIComponent(image));

    const contentDiv = document.getElementById('content');
    if (contentDiv) {
        contentDiv.innerHTML = `
            <h1>${decodeURIComponent(description)}</h1>
            <img src="${decodeURIComponent(image)}" alt="${decodeURIComponent(description)}">
            <p>ID: ${id}</p>
        `;
    }
});
