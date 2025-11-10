document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('[data-section]');
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    // Menu toggle
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

    // Section link handling
    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const sectionId = this.getAttribute('data-section');
            if (sectionId) {
                loadSection(sectionId);
                history.pushState({ sectionId: sectionId }, '', `#${sectionId}`);
            }
        });
    });

    // Load default section
    const defaultSectionId = window.location.hash.substring(1);
    loadSection(defaultSectionId || 'what-we-are');

    // === LOAD SECTION FUNCTION ===
    function loadSection(sectionId) {
        const sectionElement = document.getElementById('section');

        fetch(`sections/${sectionId}.html`)
            .then(response => response.text())
            .then(data => {
                sectionElement.innerHTML = data;
                navLinks.classList.remove('show');

                // Only run badge loader if we’re in the "badges" section
                if (sectionId === 'badges') {
                    initBadges();
                }
            })
            .catch(error => console.error("Error loading section:", error));
    }

    // === BADGES INITIALIZER ===
    function initBadges() {
        const badgesContainer = document.querySelector('#section #badges .badges-container');
        if (!badgesContainer) return;

        const placeholder = "badges/Place Holder.png";

        // === YOUR CONSTANT BADGE DATA ===
        const badgesWeekly = [
            {
                id: 0,
                name: "Semana 1: Jogador Presente (Bronze)",
                description: "Participar de 3 lobbies na semana 1",
                score: 10,
                image: "badges/Week 1 - Easy.png"
            },
            {
                id: 1,
                name: "Semana 1: Jogador Presente (Prata)",
                description: "Participar de 6 lobbies na semana 1",
                score: 10,
                image: "badges/Week 1 - Normal.png"
            },
            {
                id: 2,
                name: "Semana 1: Jogador Presente (Ouro)",
                description: "Participar de 10 lobbies na semana 1",
                score: 10,
                image: "badges/Week 1 - Hard.png"
            },
            {
                id: 3,
                name: "Semana 2: Arms Race (Bronze)",
                description: "Ficar em terceiro lugar em uma partida pública de Arms Race",
                score: 10,
                image: "badges/Week 2 - Easy.png"
            },
            {
                id: 4,
                name: "Semana 2: Arms Race (Prata)",
                description: "Ficar em segundo lugar em uma partida pública de Arms Race",
                score: 10,
                image: "badges/Week 2 - Normal.png"
            },
            {
                id: 5,
                name: "Semana 2: Arms Race (Ouro)",
                description: "Ficar em primeiro lugar em uma partida pública de Arms Race",
                score: 10,
                image: "badges/Week 2 - Hard.png"
            },
            {
                id: 6,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
            {
                id: 7,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
            {
                id: 8,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
            {
                id: 9,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
            {
                id: 10,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
            {
                id: 11,
                name: "Aguarde!",
                description: "Aguarde!",
                score: 0,
                image: placeholder
            },
        ];

        const badgesExtras = [
            {
                id: 100,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            {
                id: 101,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            {
                id: 102,
                name: "Utiliário",
                description: "Causar 600+ damage em utiliárias em uma única partida.",
                score: 30,
                image: "badges/Dano Utilitaria.png"
            },
            {
                id: 103,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            {
                id: 104,
                name: "Deixa comigo",
                description: "Fazer um Ace contra um Eco round",
                score: 20,
                image: "badges/5k Eco.png"
            },
            {
                id: 105,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            
            {
                id: 106,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            
            {
                id: 107,
                name: "Deixa comigo 2",
                description: "Fazer um Ace contra um round armado",
                score: 30,
                image: "badges/5k Brabo.png"
            },
            ,
            {
                id: 108,
                name: "Melhor que Pro Player",
                description: "Conseguir um Rating > 2.0 em uma partida",
                score: 30,
                image: placeholder
            },
            ,
            {
                id: 109,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 110,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 111,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 112,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 113,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 114,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 115,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 116,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 117,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 118,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
            ,
            {
                id: 119,
                name: "Secreta",
                description: "Esta badge é secreta, nenhum jogador a conseguiu ainda.",
                score: 0,
                image: placeholder
            },
        ];
        const players = [
            {
                name: "KICKFLIP",
                icon: "https://avatars.steamstatic.com/6f64b26ce99d6c9abf393c9d6d93de761b13efa4_full.jpg",
                weeklyEarned: [0,1,2,3,4,5],
                extraEarned: [],
            },
            {
                name: "Chalkzera",
                icon: "https://avatars.steamstatic.com/2fe771fa3a9ff244c7ac87f920aaff328b4373f6_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [],
            },
            {
                name: "Ғ Γ Ε Ε Ϻ Λ И",
                icon: "https://avatars.steamstatic.com/b5b70f62f61309c07f5c5eeec1e93be83759fbbb_full.jpg",
                weeklyEarned: [0, 1,2,3,4,5],
                extraEarned: [104],
            },
            {
                name: "flavin",
                icon: "https://avatars.steamstatic.com/31bf9ffa9c098fe666743dee27a59c620edd90b1_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [],
            },
            {
                name: "Cnidario",
                icon: "https://avatars.steamstatic.com/da833b2451aa8c865645fce9fc64bce8f20b7b32_full.jpg",
                weeklyEarned: [0,1,2,3,4,5],
                extraEarned: [104],
            },
            {
                name: "★rafA",
                icon: "https://avatars.steamstatic.com/18223a552b92487e391277da11292233196b9525_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [108],
            },
            {
                name: "Mark",
                icon: "https://avatars.steamstatic.com/b7a198202a491dd17f29437db6bf17393104da7d_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [],
            },
            {
                name: "Ramone",
                icon: "https://avatars.steamstatic.com/59dcdef5a2dba82936a6b94a7c1834585626dcb2_full.jpg",
                weeklyEarned: [0],
                extraEarned: [],
            },
            {
                name: "MARLON ZAMBONI",
                icon: "https://avatars.steamstatic.com/a53fd1f5680ad1e9c76862a4db4ece0dd6ef756d_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [102,104,107],
            },
            {
                name: "Cezinho",
                icon: "https://avatars.steamstatic.com/7801e665fec735a18793d8b5fce9ed4baeeeac3a_full.jpg",
                weeklyEarned: [0],
                extraEarned: [],
            },
            {
                name: "Purgatory",
                icon: "https://avatars.steamstatic.com/931f5415b19a7d322492ecbcde81465f12b4d5b0_full.jpg",
                weeklyEarned: [],
                extraEarned: [],
            },
            {
                name: "[8oE] JaliM",
                icon: "https://avatars.steamstatic.com/cac325718704e8fe90806d8faac75819f0888f77_full.jpg",
                weeklyEarned: [0,1,2],
                extraEarned: [],
            },
            {
                name: "árvore",
                icon: "https://avatars.steamstatic.com/a73955f5d746e6e266b5170c2eed3047928ff0b7_full.jpg",
                weeklyEarned: [],
                extraEarned: [],
            },
            {
                name: "mohawk",
                icon: "https://avatars.steamstatic.com/52caa4582e2da170bac2aa64646bb30c98b8dcbf_full.jpg",
                weeklyEarned: [0,1],
                extraEarned: [],
            },
            {
                name: "Mariachi",
                icon: "https://avatars.steamstatic.com/1daea670ffd01ba138306d4f05c4d5363750b824_full.jpg",
                weeklyEarned: [],
                extraEarned: [],
            },
            {
                name: "TUCAO",
                icon: "https://avatars.steamstatic.com/ddc46eb16112a3d755acbae6a6cbbd1d4bd682ee_full.jpg",
                weeklyEarned: [0,1],
                extraEarned: [],
            },
        ];

        function createBadgeRow(badges, earnedIds) {
            return badges.map(badge => {
                const earned = earnedIds.includes(badge.id);
                const cls = `badge ${earned ? "earned" : "silhouette"}`;
                const src = badge.image;
                const tooltip = `${badge.name}&#10;${badge.description}&#10;${badge.score}pts`;
                return `<img src="${src}" class="${cls}" title="${tooltip}" alt="${badge.name}" />`;
            }).join("");
        }

        function totalScore(badges, earnedIds) {
            return badges
                .filter(b => earnedIds.includes(b.id))
                .reduce((sum, b) => sum + b.score, 0);
        }

        function createPlayerCard(player, index) {
            const weeklyScore = totalScore(badgesWeekly, player.weeklyEarned);
            const extraScore = totalScore(badgesExtras, player.extraEarned);

            return `
              <div class="player-card">
                <div class="player-header" onclick="toggleBadges(this)">
                  <img src="${player.icon}" alt="${player.name}" class="player-icon" />
                  <div class="player-info">
                    <h2>#${index + 1} - ${player.name}</h2>
                    <p>
                      ${player.weeklyEarned.length} semanais • ${player.extraEarned.length} extras
                      <br><small>Total: ${weeklyScore + extraScore} pontos</small>
                    </p>
                  </div>
                  <span class="arrow">▼</span>
                </div>

                <div class="badges-grid">
                  <h3>Semanais (${weeklyScore} pts)</h3>
                  <div class="badge-row">
                    ${createBadgeRow(badgesWeekly, player.weeklyEarned)}
                  </div>

                  <h3>Extras (${extraScore} pts)</h3>
                  <div class="badge-row">
                    ${createBadgeRow(badgesExtras, player.extraEarned)}
                  </div>
                </div>
              </div>
            `;
        }

        players.sort((b, a) =>
            (totalScore(badgesWeekly, b.weeklyEarned) + totalScore(badgesExtras, b.extraEarned))
            -
            (totalScore(badgesWeekly, a.weeklyEarned) + totalScore(badgesExtras, a.extraEarned))
        ).reverse();
        badgesContainer.innerHTML = players.map(createPlayerCard).join("");
        document.querySelectorAll('#section .player-card.expanded').forEach(c => c.classList.remove('expanded'));
    }
});

// Handle browser navigation (back/forward)
window.addEventListener('popstate', () => {
    const sectionId = history.state?.sectionId;
    if (sectionId) {
        loadSection(sectionId);
    }
});

function toggleBadges(element) { const card = element.parentElement; card.classList.toggle("expanded"); }