
window.addEventListener("load", ()=>{
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if(page == '')
    {
        document.getElementById("customize-button").addEventListener('click', () => {
            Customize();
        })
        
        InstantiateCarrousel();

        document.getElementById("carrousel-prev").addEventListener('click', () => {
            MoveCarrousel(-1);
        })

        document.getElementById("carrousel-next").addEventListener('click', () => {
            MoveCarrousel(1);
        })
    }
    else if(page =='customize.html')
    {
        //do customize page stuff
    }

})

let imagePaths = [
    'images/b1.jpg',
    'images/b2.jpg',
    'images/b3.jpg',
    'images/b4.png'
]

let carrouselIndex = 0;

function Customize()
{
    window.location = 'customize.html';
}

function InstantiateCarrousel()
{
    var carrouselContainer = document.getElementById("images-holder");
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

function MoveCarrousel( direction )
{
    //when we click, move carrousel to the next position.

    carrouselIndex = (carrouselIndex + direction) % imagePaths.length;

    if(carrouselIndex < 0)
    {
        carrouselIndex = imagePaths.length + carrouselIndex;
    }

    console.log(carrouselIndex)

    var imageHolder = document.getElementById('images-holder');

    imageHolder.style.transform = `translateX(-${carrouselIndex * imageHolder.parentElement.clientWidth}px)`;

    console.log('moving with offset ' + direction);

}