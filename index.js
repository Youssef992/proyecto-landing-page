const formularioAnime= document.querySelector('#anime-form');
const listaAnimes= document.getElementById('listadoanimes');

let arrayAnimes=[]
//Funciones

const CrearRegistro =()=>{
    let tituloAnime = document.getElementById('titulo').value;
    let generoAnime  = document.getElementById('genero').value;
    let estatusAnime  = document.getElementById('estatus').value;

    let lista={
    titulo:tituloAnime,
    genero:generoAnime,
    estatus:estatusAnime
    }
   
    arrayAnimes.push(lista);
    return lista;
}

const GuardarRegistroDB=()=>{
    localStorage.setItem('lista-anime',JSON.stringify(arrayAnimes));
    MostrarRegistroDB();
}

const MostrarRegistroDB=()=>{
    listaAnimes.innerHTML='';
    arrayAnimes= JSON.parse(localStorage.getItem('lista-anime'));
    if(arrayAnimes===null){
        arrayAnimes=[];
    }else{
        arrayAnimes.forEach((element,index) =>{
            if(element.estatus==='Finalizado'){
                listaAnimes.innerHTML+=`<div class="alert alert-success" role="alert" id="${index}"><b>${element.titulo}</b> - ${element.genero} - ${element.estatus}<span class="float-right"><i class="material-icons" id="${index}">done</i><i class="material-icons" id="${index}">delete</i></span></div>`
           
            }else{
                listaAnimes.innerHTML+=`<div class="alert alert-danger" role="alert" id="${index}"><b>${element.titulo}</b> - ${element.genero} - ${element.estatus}<span class="float-right"><i class="material-icons" id="${index}">done</i><i class="material-icons" id="${index}">delete</i></span></div>`
            }
        });
    }
}

const EliminarRegistroDB=(index)=>{

    arrayAnimes.splice(index,1);
    GuardarRegistroDB();
}

const EditarRegistroDB= (index)=>{
    let cambiar= prompt("¿Desea cambiar el nombre del título? (Y/N)");
    if(arrayAnimes[index].estatus==='Finalizado'){
        if(cambiar.toUpperCase().includes("Y")){
            let tituloAnime= prompt("Escriba el nombre del nuevo título");
            arrayAnimes[index].titulo= tituloAnime;
        }
        arrayAnimes[index].estatus= 'Iniciada';
    }else{
        if(cambiar.toUpperCase().includes("Y")){
            let tituloAnime= prompt("Escriba el nombre del nuevo título");
            arrayAnimes[index].titulo= tituloAnime;
        }
        arrayAnimes[index].estatus= 'Finalizado';
    }
    GuardarRegistroDB();
}

//EventListeners

formularioAnime.addEventListener('submit',(e)=>{
    e.preventDefault();
    CrearRegistro();
    GuardarRegistroDB();
    formularioAnime.reset();

});

document.addEventListener('DOMContentLoaded',MostrarRegistroDB);

listaAnimes.addEventListener('click',(e)=>{
e.preventDefault();
console.log(e);
 if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
     
    let index = e.target.id;
    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      EliminarRegistroDB(index);
    }
    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarRegistroDB(index);
    }
  }
})