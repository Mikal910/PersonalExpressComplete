const moveToRead = document.getElementsByClassName("move-to-read");
const moveToWant = document.getElementsByClassName("move-to-want");
const trash = document.getElementsByClassName("fa-trash");

Array.from(moveToRead).forEach(function(element) {
    element.addEventListener('click', function() {
        const title = this.parentNode.childNodes[1].innerText;
        const author = this.parentNode.childNodes[3].innerText;
        console.log(title,author)
        fetch('comics/move-to-read', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'title': title,
                'author': author
            })
        })
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.reload(true);
        });
    });
});

Array.from(moveToWant).forEach(function(element) {
    element.addEventListener('click', function() {
        const title = this.parentNode.childNodes[1].innerText;
        const author = this.parentNode.childNodes[3].innerText;
        fetch('comics/move-to-want', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                'title': title,
                'author': author
            })
        })
        .then(response => {
            if (response.ok) return response.json();
        })
        .then(data => {
            console.log(data);
            window.location.reload(true);
        });
    });
});

Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function() {
        const title = this.parentNode.parentNode.childNodes[1].innerText;
        const author = this.parentNode.parentNode.childNodes[3].innerText;
        fetch('comics', {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'title': title,
                'author': author
            })
        }).then(function(response) {
            window.location.reload();
        });
    });
});