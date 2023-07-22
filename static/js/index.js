document.onreadystatechange = () => {
    if (document.readyState !== 'complete') {
        document.querySelector('body').style.visibility = 'hidden';
        document.querySelector('#loader').style.visibility = 'visible';
        document.querySelector('body').style.overflow = 'hidden';
    }
    else {
        document.querySelector('body').style.visibility = 'visible';
        document.querySelector('#loader').style.visibility = 'hidden';
        document.querySelector('body').style.overflow = 'auto';
    }
}

const getFooterToGoToTop = document.getElementsByClassName('go-up')[0];
getFooterToGoToTop.addEventListener('click', () => {
    window.scrollTo('0', '0');
})
