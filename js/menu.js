const nav = document.querySelector('nav');

window.addEventListener('scroll', function(){ // este metodo permite "escuchar que susede con el evento scroçç"
    nav.classList.toggle('active', window.scrollY >0) // con toggle podemos realizar dos acciones, active, por un lado  y cuando hacemos  scroll sobe el eje y
});





