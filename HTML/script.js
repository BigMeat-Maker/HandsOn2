document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;
        });

    fetch("footer.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

    applyNewsTypingEffect();

    document.querySelectorAll(".wiki-link").forEach(item => {
        item.addEventListener("click", function () {
            const animalName = this.getAttribute("data-animal");
            const wikiApiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${animalName}`;

            fetch(wikiApiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.content_urls) {
                        window.open(data.content_urls.desktop.page, "_blank"); // Open Wikipedia page
                    } else {
                        alert("Wikipedia page not found!");
                    }
                })
                .catch(error => console.error("Error fetching Wikipedia data:", error));
        });
    });

    const lat = -2.163106;
    const lon = -55.126648;
    const nasaApiKey = "Ve303Fqh8SUGwsku3ec94DuZWQlyDs0yGPiM7Z6x"; 
    const earthImgUrl = `https://api.nasa.gov/planetary/earth/imagery?lon=${lon}&lat=${lat}&dim=0.5&date=2024-01-01&cloud_score=true&api_key=Ve303Fqh8SUGwsku3ec94DuZWQlyDs0yGPiM7Z6x`;


    fetch(earthImgUrl)
        .then(response => response.blob())
        .then(blob => {
            document.getElementById("nasaSatelliteImage").src = URL.createObjectURL(blob);
        })
        .catch(error => console.error("Error fetching NASA Earth image:", error));

});

window.addEventListener("load", (event) => {
    new cursoreffects.bubbleCursor();
});

const habitatInfo = {
    savanna: {
        title: "The Savanna",
        text: "A vast grassland home to lions, elephants, and zebras, where the golden sun meets endless horizons.",
        sound: "/Sounds/savanna.mp3"
    },
    rainforest: {
        title: "The Rainforest",
        text: "Lush, dense, and teeming with life, the rainforest shelters some of the planet’s most unique creatures.",
        sound: "/Sounds/rainforest.mp3"
    },
    deepsea: {
        title: "The Deep Sea",
        text: "A world of darkness and mystery, the deep sea is home to bioluminescent creatures and undiscovered species.",
        sound: "/Sounds/deepsea.mp3"
    }
};

let soundEffect = new Audio();

function showHabitatInfo(habitat) {
    document.getElementById("habitatOverlay").style.display = "flex";

    soundEffect.src = habitatInfo[habitat].sound;
    soundEffect.play();

    applyTextScramble(habitatInfo[habitat].title);
    applyTypingEffect(document.getElementById("habitatText"), habitatInfo[habitat].text);
}

function closeOverlay() {
    document.getElementById("habitatOverlay").style.display = "none";
    soundEffect.pause();
}

const resolver = {
    resolve: function resolve(options, callback) {
        const resolveString = options.resolveString;
        const combinedOptions = Object.assign({}, options, { resolveString: resolveString });

        function getRandomInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomCharacter(characters) {
            return characters[getRandomInteger(0, characters.length - 1)];
        }

        function doRandomiserEffect(options, callback) {
            const characters = options.characters;
            const element = options.element;
            const partialString = options.partialString;
            let iterations = options.iterations;

            setTimeout(() => {
                if (iterations >= 0) {
                    const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

                    if (iterations === 0) {
                        element.textContent = partialString;
                    } else {
                        element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
                    }

                    doRandomiserEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            }, options.timeout);
        }

        function doResolverEffect(options, callback) {
            const resolveString = options.resolveString;
            const offset = options.offset;
            const partialString = resolveString.substring(0, offset);
            const combinedOptions = Object.assign({}, options, { partialString: partialString });

            doRandomiserEffect(combinedOptions, () => {
                const nextOptions = Object.assign({}, options, { offset: offset + 1 });

                if (offset <= resolveString.length) {
                    doResolverEffect(nextOptions, callback);
                } else if (typeof callback === "function") {
                    callback();
                }
            });
        }

        doResolverEffect(combinedOptions, callback);
    }
};

function applyTextScramble(text) {
    const options = {
        offset: 0,
        timeout: 5,
        iterations: 8,
        characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=<>?/[]{}",
        resolveString: text,
        element: document.getElementById("habitatTitle")
    };

    resolver.resolve(options);
}

function applyTypingEffect(element, text) {
    element.innerHTML = "";
    let i = 0;

    function typeCharacter() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeCharacter, 25);
        }
    }

    typeCharacter();
}

function applyNewsTypingEffect() {
    const newsItems = document.querySelectorAll(".list-group-item p");

    newsItems.forEach((item, index) => {
        const text = item.textContent;
        item.textContent = "";
        let i = 0;

        function typeCharacter() {
            if (i < text.length) {
                item.textContent += text.charAt(i);
                i++;
                setTimeout(typeCharacter, 20);
            }
        }

        setTimeout(typeCharacter, index * 500);
    });
}
