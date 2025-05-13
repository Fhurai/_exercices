document.addEventListener('DOMContentLoaded', function(){
    clickButton();
    cancelButton();
    clickOverlay();
});

function clickButton(){
    document.querySelector('button').addEventListener('click', function(){
        document.querySelector('.backdrop[for="btn"]').classList.add('show');
    });
}

function cancelButton(){
    document.querySelector('#modal2 button').addEventListener('click', function(){
        document.querySelector('.backdrop[for="btn"]').classList.remove('show');
    });
}

function clickOverlay(){
    document.querySelector('.backdrop[for="btn"]').addEventListener('click', function(event){
        if(event.target === event.currentTarget && event.currentTarget.classList.contains('show')){
            document.querySelector('.backdrop[for="btn"]').classList.remove('show');
        }
    });
}