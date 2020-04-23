console.log("calculador configuracion electronica de atomos")

//el el maximo camino posible de recorrido. Todos los numeros atomicos recorren esta ruta en orden
let RecorridoElectronico = ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p", "5s", "4d", "5p", "6s", "4f", "5d", "6p", "7s", "5f", "6d", "7p"]



let nombres = []//array que almacena los nombres de los elementos
let numeros = []//array que alamacena los numeros atomicos de los elementos


//inicia el programa
llenarDatos()



function llenarDatos () {//funcion que llena datos de los arreglos
    var stdin = process.openStdin();//inicializar entrada de teclado
    console.log("Ingrese los datos")
    let isNombre = true//bandera para alternar si lee nombre o numero
    //primero llenar nombre
    stdin.addListener("data", function (d) {//se pone a la escucha del teclado y cada que se da "enter" o salto de linea captura lo escribido y pasa a "d"
        d = d.toString().trim()//convertimos a cadena
        if (d == "Exit" || d == "exit") {//para evaluar si escribio exit
            if (isNombre) {//evalua si exit fue escrito luego de completar una secuencia( es decir un nombre de elemnto y su numero)
                console.log("Termino llenar entrada")
                //console.log(nombres, numeros)
                console.log("Salida: ")
                calcularConfiguracionElectronica()//llama al calculador de configuracion electronica
                process.exit()
            } else {//exit fue escrito luego de un nombre, por lo que faltaria el numero
                //no puede salir, debe completar la secuencia
                console.log("Antes de salir primero ,complete el numero de: ", nombres[nombres.length - 1])
            }
        } else {//si no escribio exit//lee valores
            if (isNombre) {//si lo que lee es un nombre
                if (isNaN(d) == true) {//d no es numero, es un string.
                    if (d.length <= 50) {//que la longitud sea menor a 50
                        nombres.push(d)//agregamos el nombre al array de nombres
                        isNombre = false//cambiamos a que no es letra el siguiente valor a ser leido debe ser un numero
                    } else {
                        console.log("El nombre debe tener menos de 50 letras")
                    }
                } else {//d es numero
                    console.log("Debe ingresar un nombre de elemento valido, no numeros")
                }
            } else {//esta leyendo un numero atomico es esperado por el valor de isNombre
                try {//intentaremos parsear un numero
                    d = parseInt(d)
                    if (!isNaN(d)) {//isNaN devuevle false si d es numero
                        if (d > 0 && d <= 118) {
                            numeros.push(d)
                            isNombre = true//inciaara una nueva secuencia de casos de prueba. El siguiente calor a esperar es nombre
                        } else {
                            console.log("el numero desde ser mayor que 0 y menor o igual a 118")
                        }
                    } else {//si d no es numero
                        console.log("debe de ingresar el numero atomico correspondiente a: " + nombres[nombres.length - 1])
                    }
                } catch (error) {
                    console.log("Escriba un numero valido para: " + nombres[nombres.length - 1])
                }
            }
        }
    })

}
function calcularConfiguracionElectronica () {
    numeros.forEach(element => {//hallara la configuracion electronica para un atomo de numero element
        let numero = element//es el numero atomico
        let suma = 0//representa cuanto valor de numero ya lleva acumulado
        let debe = numero//representara la cantidad que falta para llegar a "numero". Inicia con valor de "numero" por que inicialmente para que llegue al valor de "numero" le falta "numero"
        for (i = 0; i < RecorridoElectronico.length && suma < numero; i++) {
            switch (RecorridoElectronico[i].charAt(1)) {//verificaremos el orbital
                case "s"://maximo a tomar es 2
                    if (debe >= 2) {//si el valor que debe es mayor o igual que el del maximo del orbital
                        debe = debe - 2//el valor de debe se reduce en maximo valor del orbbital por que este restara cuanto falta para llegar a numero
                        suma = suma + 2//nuestro acumulador aumenta en el valor añadido por el orbital
                        process.stdout.write(RecorridoElectronico[i] + "2" + " ")//imprimimos sin dar salto de linea el valor del subnivel y le agregamos la cantidad de electrones maxima que da el nivel
                    } else {//el decir si lo que debe es menor a la cantidad de electrones que puede aportar este subnivel. este seria los ultimos electrones a agregar
                        suma = suma + debe//suma toma el valor de numero, luego se evalua en el for
                        process.stdout.write(RecorridoElectronico[i] + debe + " ")//imprimimos sin dar salto de linea el valor del subnivel y agregramos la cantidad de electrones que corresponde a debe y es menor a la cantidad maxima que da el subnivel
                    }
                    break;
                case "p"://maximo a tomar es 6
                    if (debe >= 6) {
                        debe = debe - 6
                        suma = suma + 6
                        process.stdout.write(RecorridoElectronico[i] + "6" + " ")
                    } else {
                        suma = suma + debe
                        process.stdout.write(RecorridoElectronico[i] + debe + " ")
                    }
                    break;
                case "d"://maximo a tomar es 10
                    if (debe >= 10) {
                        debe = debe - 10
                        suma = suma + 10
                        process.stdout.write(RecorridoElectronico[i] + "10" + " ")
                    } else {
                        suma = suma + debe
                        process.stdout.write(RecorridoElectronico[i] + debe + " ")
                    }
                    break;
                case "f"://maximo a tomar es 14
                    if (debe >= 14) {
                        debe = debe - 14
                        suma = suma + 14
                        process.stdout.write(RecorridoElectronico[i] + "14" + " ")
                    } else {
                        suma = suma + debe
                        process.stdout.write(RecorridoElectronico[i] + debe + " ")
                    }
                    break;
            }
        }
        console.log("")//salto de linea por que escribira la configuracion electronica para otro numero atomico
    });
}