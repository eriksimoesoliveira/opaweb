document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('[data-section]');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            const submenu = toggle.nextElementSibling;
            submenu.classList.toggle('show');
        });
    });

    document.addEventListener('click', (event) => {
        submenuToggles.forEach(toggle => {
            const submenu = toggle.nextElementSibling;
            if (!toggle.contains(event.target) && !submenu.contains(event.target)) {
                submenu.classList.remove('show');
            }
        });
    });

    // Set up event listeners for each link
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if(this.getAttribute('data-section')){
                loadSection(sectionId);
                history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
            }
        });
    });

    // Set the default section to load based on the URL
    const defaultSectionId = window.location.hash.substring(1);
    loadSection(defaultSectionId || 'what-we-are');

    function loadSection(sectionId) {
        const sectionElement = document.getElementById('section');

        fetch(`sections/${sectionId}.html`)
            .then(response => response.text())
            .then(data => {
                sectionElement.innerHTML = data;

                // Only run loadLevels when "members" section is activated
                if (sectionId === 'members') {
                    loadLevels();
                }
            })
            .catch(error => console.error("Error loading section:", error));
    }

    function loadLevels() {

        const idList = [
            "76561198880256779",
            "76561198044554166",
            "76561198086481162",
            "76561198077945436",
            "76561199219737474",
            "76561198428260263",
            "76561198970702915",
            "76561198951887025",
            "76561198043576393",
            "76561197987233720",
            "76561197961956900",
            "76561198066704802",
            "76561198053161518",
            "76561198265144671",
            "76561198073604850",
            "76561197982657661",
            "76561198450434814",
            "76561199100189090",
        ]

        idList.forEach(id => {
            fetch(`https://csstats.gg/player/${id}`)
                .then(response => response.text())
                .then(htmlString => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, "text/html");

                    const ranksOver = doc
                        .getElementById("player-ranks")
                        .getElementsByClassName("ranks")[0]
                        .getElementsByClassName("over")[0];

                    const rankImg = ranksOver
                        .getElementsByClassName("rank")[0]
                        .getElementsByTagName("img")[0].src;
                    const bestImg = ranksOver
                        .getElementsByClassName("best")[0]
                        .getElementsByTagName("img")[0].src;

                    document.getElementById(`${id}_FC_level`).innerHTML = `<img src="${rankImg}" alt="Rank" />`;
                    document.getElementById(`${id}_FC_level_best`).innerHTML = `<img src="${bestImg}" alt="Rank" />`;

                })
                .catch(error => console.error("Error fetching player data:", error));
        }); 

        idList.forEach(id => {
            fetch(`https://csstats.gg/player/${id}/stats`)
                .then(response => response.text())
                .then(htmlString => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, "text/html");

                    console.log(doc.getElementById("player-overview"))
                    const matches = doc
                        .getElementById("player-overview")
                        .getElementsByClassName("total-stat")[0]
                        .getElementsByClassName("total-value")[0].innerText

                
                    document.getElementById(`${id}_k`).innerHTML = `${matches}`;

                })
                .catch(error => console.error("Error fetching player data:", error));
        }); 
    }
});

// Listen for popstate event to handle back/forward button navigation
window.addEventListener('popstate', () => {
    const sectionId = history.state.sectionId;
    loadSection(sectionId);
});

