let arr = [];
const div = document.getElementById("con");
let imageLoaded = 0;
let totalImages = 10;
let ready = false;

async function fetchData() {
    try {
        let fetched = await fetch(`https://api.unsplash.com/photos/random/?client_id=3KPGOuV9xZmPVt2J1pZfaJVOcA8psCY7O386snAL42o&count=15`);
        arr = await fetched.json();
        display();
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function display() {
    arr.forEach(function (ele) {
        let a = document.createElement('a');
        a.href = ele.links.html;
        a.target = "_blank";
        let img = document.createElement('img');
        img.src = ele.urls.regular + "&width=404&height=607";
        a.appendChild(img);
        div.appendChild(a);
        img.addEventListener('load', loaded);
    });
}

function loaded() {
    imageLoaded++;
    if (imageLoaded === totalImages) {
        console.log("All images loaded");
        ready = true;
        imageLoaded = 0;
    }
}

fetchData();

window.addEventListener('scroll', function () {
    if ((window.scrollY >= document.body.offsetHeight - window.innerHeight - 1000) && ready) {
        fetchData();
        console.log("More images loaded");
        ready = false;
    }
});
