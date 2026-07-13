
window.addEventListener("load", ()=>{

    document.getElementById("customize-button").addEventListener('click', () => {
        Customize();
    })

    InstantiateCarrousel();
})

let imagePaths = [
    'images/b1.jpg',
    'images/b2.jpg',
    'images/b3.jpg',
    'images/b4.jpg'
]

let carrouselIndex = 0;

function Customize()
{
    window.location = 'customize.html';
}

function InstantiateCarrousel()
{
    var carrouselContainer = document.getElementById("carrouselDiv");
    carrouselIndex = 0;


    for(let i = 0; i < imagePaths.length; i++)
    {
        var imgElement = new Image();

        imgElement.src = imagePaths[i];
        imgElement.alt = 'Bananyth ' + i;
        imgElement.classList = 'carrousel-image';


        carrouselContainer.appendChild(imgElement);
    }
}

function MoveCarrousel()
{
    //when we click, move carrousel to the next position.
}