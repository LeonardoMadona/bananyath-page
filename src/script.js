window.addEventListener("load", ()=>{
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if(page == '')
    {
        document.getElementById("customize-button").addEventListener('click', () => {
            Customize();
        })
    }

    else if(page == 'customize.html')
    {        
        if(document.getElementById("home-button")){

            document.getElementById("home-button").addEventListener('click', () => {
                Home();
            })
        }
    }
})


function Customize()
{
    window.location = '../customize.html';
}

function Home()
{
    window.location = '../index.html';
}