"use strict";



$(function () {

    let map_facil = new Map();
    inicializarMapaFacil(map_facil);
    let map_medio = new Map(map_facil);
    inicializarMapaMedio(map_medio);
    let map_dificil = new Map(map_medio);
    inicializarMapaDificil(map_dificil);
    let marcado = {
        id: null,
        foto: ""
    };
    let clicks;
    let dificultad = 0; //0 -> facil 1 -> medio 2 -> dificil
    let yaContestados;

    $("#botonIniciar").on("click", function () {
        $(".carta").remove();
        $("li").remove();
        if ($("#facil").prop("checked")) {
            colocarCartas(map_facil, 12);
            $("#cartas").css("display", "grid")
                .css("grid-template-columns", "200px 200px 200px 200px 200px 200px");
            $("#encontrados").css("display", "grid")
                .css("grid-template-columns", "50px 50px 50px");

        }
        else if ($("#medio").prop("checked")) {
            colocarCartas(map_medio, 24);
            //console.log(map_medio);
            $("#cartas").css("display", "grid")
                .css("grid-template-columns", "200px 200px 200px 200px 200px 200px");
            $("#encontrados").css("display", "grid")
                .css("grid-template-columns", "50px 50px 50px");
            dificultad = 1;
        }
        else if ($("#dificil").prop("checked")) {
            colocarCartas(map_dificil, 36);
            $("#cartas").css("display", "grid")
                .css("grid-template-columns", "150px 150px 150px 150px 150px 150px 150px 150px 150px");
            $("#encontrados").css("display", "grid")
                .css("grid-template-columns", "50px 50px 50px 50px 50px ");
            dificultad = 2;
        }
        clicks = 0;
    });


    $("img").on("click", function (event) {
        alert("hola");
    })

    $("#cartas").on("click", "li", function (event) {

        let tablero;
        if (dificultad == 0) {
            tablero = new Map(map_facil);
        }
        else if (dificultad == 1) {
            tablero = new Map(map_medio);
        }
        else {
            tablero = new Map(map_dificil);
        }
        $("#clicks").text(clicks + " Clicks");
        let id = $(event.target).prop("id");
        console.log($(event.target));
        if ($(event.target).prop("id")) {
            if (marcado.id == null) {
                clicks++;
                $("#clicks").text(clicks + " Clicks");
                marcado.id = $(event.target).prop("id");
                marcado.foto = $(event.target).prop("name");
                $("#" + id).prop("src", tablero.get(parseInt(id)).imagen_front);
            }
            else {
                $("#" + id).prop("src", tablero.get(parseInt(id)).imagen_front);
                setTimeout(function () {
                    if (marcado.id.split("_")[0] === $(event.target).prop("id").split("_")[0] &&
                        (marcado.foto == "uno" && $(event.target).prop("name") == "uno" ||
                            marcado.foto == "dos" && $(event.target).prop("name") == "dos")) {
                        alert("Has pulsado la misma carta dos veces");
                        $("#clicks").text(clicks + " Clicks");
                    }
                    else {
                        clicks++;
                        $("#clicks").text(clicks + " Clicks");
                        if (marcado.id.split("_")[0] === $(event.target).prop("id").split("_")[0]) {
                            if (marcado.foto == "uno" && $(event.target).prop("name") == "dos" ||
                                marcado.foto == "dos" && $(event.target).prop("name") == "uno") {
                                $("#" + id).css("visibility", "hidden");
                                $("#" + marcado.id).css("visibility", "hidden");
                                let nuevoElemento = $("<li>" +
                                    "<img src=" + tablero.get(parseInt(marcado.id.split("_")[0])).imagen_front +
                                    " height=50 width= 50 class=carta>" + "</li>");
                                $("#encontrados").append(nuevoElemento);

                            }
                            else {
                                $("#" + id).prop("src", tablero.get(parseInt(id)).imagen_back);
                                $("#" + marcado.id).prop("src", tablero.get(parseInt(id)).imagen_back);
                            }

                        }
                        else {
                            $("#" + id).prop("src", tablero.get(parseInt(id)).imagen_back);
                            $("#" + marcado.id).prop("src", tablero.get(parseInt(id)).imagen_back);


                        }
                        
                    marcado.id = null;
                    marcado.valor = "";
                    }

                }, 600);
            }
            //alert(valor);
        }

    });

});

function colocarCartas(mapa, max) {
    let mapa_aux = new Map(mapa);
    let colocados = 0;
    let usados = new Map();

    while (colocados < max) {
        let random = Math.floor((Math.random() * mapa_aux.size));
        if (usados.get(random) === undefined) {
            //no hay ninguna carta todavía
            let nuevoElemento = $("<li class= " + mapa_aux.get(random).id + ">" +
                "<img src=" + mapa_aux.get(random).imagen_back + " name= uno " +
                " id= " + random + "_UNO height=120 width= 120 class=carta>" + "</li>");
            $("#cartas").append(nuevoElemento);
            usados.set(random, 1);
            colocados += 1;
        }
        else if (usados.get(random) == 1) {
            //ya hay una carta
            let nuevoElemento = $("<li class= " + mapa_aux.get(random).id + ">" +
                "<img src=" + mapa_aux.get(random).imagen_back + " name= dos " +
                " id= " + random + "_DOS height=120 width= 120 class=carta>" + "</li>");
            $("#cartas").append(nuevoElemento);
            usados.set(random, 2);
            colocados += 1;
        }
        //alert(random);
    }
}

function inicializarMapaFacil(map) {
    map.set(0, {
        id: "buho",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/buho.jpg"
    });
    map.set(1, {
        id: "caballito",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/caballito.jpg"
    });
    map.set(2, {
        id: "cangrejo",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/cangrejo.jpg"
    });
    map.set(3, {
        id: "erizo",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/erizo.jpg"
    });
    map.set(4, {
        id: "gato",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/gato.jpg"
    });
    map.set(5, {
        id: "mono",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/mono.png"
    });
}

function inicializarMapaMedio(map) {
    map.set(6, {
        id: "perro",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/perro.jpg"
    });
    map.set(7, {
        id: "cocodrilo",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/cocodrilo.jpg"
    });
    map.set(8, {
        id: "delfin",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/delfin.jpg"
    });
    map.set(9, {
        id: "jirafa",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/jirafa.png"
    });
    map.set(10, {
        id: "rana",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/rana.png"
    });
    map.set(11, {
        id: "serpiente",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/serpiente.png"
    });
}

function inicializarMapaDificil(map) {
    map.set(12, {
        id: "panda",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/panda.jpg"
    });
    map.set(13, {
        id: "cerdo",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/cerdo.jpg"
    });
    map.set(14, {
        id: "pato",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/pato.jpg"
    });
    map.set(15, {
        id: "pez",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/pez.jpg"
    });
    map.set(16, {
        id: "pulpo",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/pulpo.png"
    });
    map.set(17, {
        id: "oso",
        imagen_back: "imagenes/carta.jpg",
        imagen_front: "imagenes/oso.jpg"
    });
}