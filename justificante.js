

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import { getDatabase, ref, onValue, update,remove } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
const firebaseConfig = {
    apiKey: "AIzaSyBpfZQ-XYddUmYiWoI2DUC33f-XhDDgoIE",
    authDomain: "cobaes35-a4d98.firebaseapp.com",
    projectId: "cobaes35-a4d98",
    databaseURL: "https://cobaes35-a4d98-default-rtdb.firebaseio.com",
    storageBucket: "cobaes35-a4d98.appspot.com",
    messagingSenderId: "758607121239",
    appId: "1:758607121239:web:eb5f71566fdf6b6d844c12"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reportesRefInasistencia = ref(db, 'Justificante');



onValue(reportesRefInasistencia, (snapshot) => {
    const container = document.getElementById('cardContainerJustificante');
    container.innerHTML = ''; 

    snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key; 
        const value = childSnapshot.val();
        const statusClass = value.status ? 'resuelto' : 'no-resuelto';
        const statusText = value.status ? 'Resuelto' : 'No Resuelto';
        const statusBtnClass = value.status ? 'print-button-false' : 'print-button';

        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
               <div class="card-header">
                <h3>${value.nombre}</h3>
               <button data-key="${key}" class="delete-button delete-button-justificante fa fa-trash"></button>
            </div>
            <p>Tipo de Reporte: <strong><span class="tipoReporte">${value.tipo}</span></strong></p>
            <p>Fecha de Realización: <span class="fecha">${value.fecha}</span></p>
            <p>Status: <span class="status ${statusClass}">${statusText}</span></p>
            <div class="button-container">
                <button data-key="${key}" class="${statusBtnClass} resolver-button-justificante">${value.status ? 'No resuelto' : 'Resuelto'}</button>
                <button data-key="${key}" class="printbutton printbuttonjustificante" onClick="subirScroll()">Imprimir</button>
                <button data-image-url="${value.imagen}" class="printbutton verComprobante">Comprobante</button>
            </div>
        `;

        container.appendChild(card);
    });
    
    document.querySelectorAll('.delete-button-justificante').forEach(button => {
        button.addEventListener('click', async (event) => {
            const key = event.target.getAttribute('data-key');
    
            if (confirm('¿Estás seguro de que deseas eliminar este registro?')) {
                try {
                    const deleteRef = ref(db, 'Justificante/' + key);

                    await remove(deleteRef);

                    const card = event.target.closest('.card');
                    if (card) {
                        card.remove();
                    }
                    console.log('Registro eliminado con éxito.');
                } catch (error) {
                    console.error('Error al eliminar el registro:', error);
                }
            }
        });
    });
    

    document.querySelectorAll('.verComprobante').forEach(button => {
        button.addEventListener('click', (event) => {
            const imageUrl = event.target.getAttribute('data-image-url');
    
            if (imageUrl) {
                window.open(imageUrl, '_blank');
            }
        });
    });

    document.querySelectorAll('.resolver-button-justificante').forEach(button => {
        button.addEventListener('click', (event) => {
            const key = event.target.getAttribute('data-key');
            const newStatus = event.target.classList.contains('print-button-false') ? false : true;

            const updateRef = ref(db, 'Justificante/' + key);
            update(updateRef, {
                status: newStatus
            });
        });
    });
    

      
    document.querySelectorAll('.printbuttonjustificante').forEach(button => {
        button.addEventListener('click', (event) => {
            const key = event.target.getAttribute('data-key');
            const value = snapshot.child(key).val();
            imprimirJustificante(value.fecha2,value.semestre,value.grupo,value.nombre,value.dia1,value.dia2,value.mes,value.motivo);

        });
    });

});


