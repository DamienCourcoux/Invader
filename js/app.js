// fonction init : responsable de créer la grille

var app = {
    // la taille de la grille
    gridSize: 8,
    pixelSize: 40,
    availableColors: [
        'plain',
        'empty',
        'light',
        'highlight',
    ],
    selectedColor: 'plain',
    // création du formulaire
    initForm: function () {
        // je cible le form dans le html
        app.formElement = document.querySelector('.configuration');

        // input "taille de la grille"
        var gridSizeInput = document.createElement('input');
        gridSizeInput.type = 'number';
        gridSizeInput.id = 'input-grid-size';
        gridSizeInput.min = 2;
        gridSizeInput.max = 25;
        gridSizeInput.defaultValue = 8;
        // notre champ est obligatoire
        gridSizeInput.required = true;
        gridSizeInput.placeholder = 'Taille de la grille';

        app.formElement.appendChild(gridSizeInput);

        // input "taille du pixel"
        var pixelSizeInput = document.createElement('input');
        pixelSizeInput.type = 'number';
        pixelSizeInput.id = 'input-pixel-size';
        pixelSizeInput.min = 5;
        pixelSizeInput.max = 50;
        pixelSizeInput.defaultValue = 20;
        pixelSizeInput.required = true;
        pixelSizeInput.placeholder = 'Taille du pixel';

        // je met linput dans le form
        app.formElement.appendChild(pixelSizeInput);

        // je crée le bouton "valider"
        var buttonElement = document.createElement('button');
        buttonElement.type = 'submit';
        buttonElement.id = 'submit-btn';
        buttonElement.textContent = 'Valider';

        // j'ajoute le bouton valider dans le form
        app.formElement.appendChild(buttonElement);

        // écouteur d'evenement pour la soumission du formulaire
        app.formElement.addEventListener('submit', function (event) {
            // preventDefault permet d'empecher le comportement "normal"
            // d'un evenement
            // ici, cela permettra de ne pas recharger la page lors du submit
            event.preventDefault();

            // je voudrais prendre la valeur de l'input "nombre de cases"
            // et la sauvegarder dans app.gridSize

            // je veux trouver l'input dans le formulaire
            // event.target == le formulaire car évenement submit
            // découverte : on peut .querySelector sur n'importe quel élément
            // pour trouver un de ses enfants

            app.gridSize = parseInt(event.target.querySelector('#input-grid-size').value);

            app.pixelSize = parseInt(event.target.querySelector('#input-pixel-size').value);

            // effacer le div "invader"
            app.invaderElement.innerHTML = '';

            // redessiner le tableau
            app.initGrid();
        });
    },

    initGrid: function () {
        // je récupere l'element invader
        app.invaderElement = document.getElementById('invader');

        // je crée une table
        var tableElement = document.createElement('table');

        // je met la table dans dans le div
        app.invaderElement.appendChild(tableElement);

        // je crée 8 TR
        for (var i = 0; i < app.gridSize; i++) {
            var trElement = document.createElement('tr');

            tableElement.appendChild(trElement);

            // dans ce TR, je crée 8 TD
            for (var j = 0; j < app.gridSize; j++) {
                var tdElement = document.createElement('td');

                // si on avait voulu faire l'écouteur d'evenement ici
                // tdElement.addEventListener('click', function(event) {
                //      console.log('clic sur un td');
                // });

                // je définis la taille de mon td (largeur et hauteur)
                tdElement.style.width = app.pixelSize + 'px';
                tdElement.style.height = app.pixelSize + 'px';


                trElement.appendChild(tdElement);
            }
        }

        // un écouteur d'evenement global
        // pour les clics sur le tableau
        tableElement.addEventListener('click', function (event) {
            // je veux colorier ma case
            // en fonction de la couleur selectionnée

            // je vais d'abord supprimer toutes les classes CSS de ma case
            event.target.className = '';

            // puis, je lui ajouterai une classe CSS du type color-MACOULEUR
            // et a la place de MACOULEUR, je mettrai app.selectedColor
            event.target.classList.add('color-' + app.selectedColor);
        });
    },

    initPalette: function () {
        // objectif
        // pour chacune des cases du tableau app.availableColors
        var paletteElement = document.getElementById('colorPalette');

        for (let currentColor of app.availableColors) {
            // créer un div
            var colorDiv = document.createElement('div');
            // lui mettre la classe .color-option
            colorDiv.classList.add('color-option');
            // si la couleur est active, on lui met la classe css qu'il faut
            if (currentColor === app.selectedColor) {
                colorDiv.classList.add('color-option--active');
            }
            // lui mettre la classe qui correspond à sa couleur
            colorDiv.classList.add('color-' + currentColor);


            // ajouter un écouteur d'evenement sur le bouton
            colorDiv.addEventListener('click', function(event) {
                // qu'est-ce que je veux faire lorsque je clique sur une couleur ?

                // je veux enlever l'ancienne .color-option--active
                // je cherche l'element qui a cette classe
                var previousActiveColor = document.querySelector('.color-option--active');
                // et je supprime la classe
  
                previousActiveColor.classList.remove('color-option--active');

                // je mets la classe .color-option--active sur la cible du clic (event target)
                event.target.classList.add('color-option--active');

                // on peut accéder a la variable currentColor, récupérée dans la boucle au dessus
                // meme si l'on est dans une "sous fonction"
                // c'est la notion de "closure" -> rdv plus tard dans la formation
                app.selectedColor = currentColor;
            });

            // et l'ajouter dans le div qui a l'id colorPalette
            paletteElement.appendChild(colorDiv);
        }
    },

    init: function () {
        app.initForm();
        app.initGrid();
        app.initPalette();
    },
};

// cet évenement aura lieu quand le HTML aura fini de charger
document.addEventListener('DOMContentLoaded', app.init);
