const footer = document.querySelector('footer');
footer.innerHTML = `
    <p> &copy; 2026. Todos los derechos reservados</p>
    <p>Para reclamos ingresá <a href="">acá</a>. /
    Para el botón de arrepentimiento <a href="">haz clic aquí</a>
    </p>
`;
const links = footer.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¡Gracias por tu interés!',
            text: 'Estamos trabajando para brindarte la mejor experiencia. Pronto podrás acceder a esta sección.',
            icon: 'info',
            confirmButtonText: 'Entendido'
        });
    });
});
