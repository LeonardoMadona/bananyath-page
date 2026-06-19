
window.addEventListener("load", ()=>{
    var path = window.location.pathname;
    var page = path.split("/").pop();

    if(page == '')
    {
        document.getElementById("customize-button").addEventListener('click', () => {
            Customize();
        })
    }
})


function Customize()
{
    window.location = 'customize.html';
}