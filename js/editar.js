$(document).ready(function() {
    var ListaDeCandidatos = localStorage.getItem('ListaDeCandidatos');
    var id = location.search.split("=");
    console.log(id[1], JSON.parse(ListaDeCandidatos));

});