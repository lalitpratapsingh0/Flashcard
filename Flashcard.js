 const elements = [
            { number: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', group: 'Nonmetal', state: 'Gas' },
            { number: 2, symbol: 'He', name: 'Helium', mass: '4.003', group: 'Noble gas', state: 'Gas' },
            { number: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', group: 'Alkali metal', state: 'Solid' },
            { number: 4, symbol: 'Be', name: 'Beryllium', mass: '9.012', group: 'Alkaline earth', state: 'Solid' },
            { number: 5, symbol: 'B', name: 'Boron', mass: '10.81', group: 'Metalloid', state: 'Solid' },
            { number: 6, symbol: 'C', name: 'Carbon', mass: '12.01', group: 'Nonmetal', state: 'Solid' },
            { number: 7, symbol: 'N', name: 'Nitrogen', mass: '14.01', group: 'Nonmetal', state: 'Gas' },
            { number: 8, symbol: 'O', name: 'Oxygen', mass: '16.00', group: 'Nonmetal', state: 'Gas' },
            { number: 9, symbol: 'F', name: 'Fluorine', mass: '19.00', group: 'Halogen', state: 'Gas' },
            { number: 10, symbol: 'Ne', name: 'Neon', mass: '20.18', group: 'Noble gas', state: 'Gas' },
            { number: 11, symbol: 'Na', name: 'Sodium', mass: '22.99', group: 'Alkali metal', state: 'Solid' },
            { number: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.31', group: 'Alkaline earth', state: 'Solid' },
            { number: 13, symbol: 'Al', name: 'Aluminum', mass: '26.98', group: 'Metal', state: 'Solid' },
            { number: 14, symbol: 'Si', name: 'Silicon', mass: '28.09', group: 'Metalloid', state: 'Solid' },
            { number: 15, symbol: 'P', name: 'Phosphorus', mass: '30.97', group: 'Nonmetal', state: 'Solid' },
            { number: 16, symbol: 'S', name: 'Sulfur', mass: '32.07', group: 'Nonmetal', state: 'Solid' },
            { number: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', group: 'Halogen', state: 'Gas' },
            { number: 18, symbol: 'Ar', name: 'Argon', mass: '39.95', group: 'Noble gas', state: 'Gas' },
            { number: 19, symbol: 'K', name: 'Potassium', mass: '39.10', group: 'Alkali metal', state: 'Solid' },
            { number: 20, symbol: 'Ca', name: 'Calcium', mass: '40.08', group: 'Alkaline earth', state: 'Solid' }
        ];

        let currentIndex = 0;
        let correctAnswers = 0;
        let isFlipped = false;

    
        function init() {
            updateCard();
            updateStats();
            updateProgress();
        }

        function updateCard() {
            const element = elements[currentIndex];
            const card = document.getElementById('flashcard');
            
            
            card.classList.remove('flipped');
            isFlipped = false;
            
            
            document.getElementById('elementNumber').textContent = element.number;
            document.getElementById('elementSymbol').textContent = element.symbol;
            
            
            document.getElementById('elementName').textContent = element.name;
            document.getElementById('elementDetails').innerHTML = 
                `Atomic Mass: ${element.mass}<br>Group: ${element.group}<br>State: ${element.state}`;
        }

        function flipCard() {
            const card = document.getElementById('flashcard');
            card.classList.toggle('flipped');
            isFlipped = !isFlipped;
        }

        function nextCard() {
            if (currentIndex < elements.length - 1) {
                currentIndex++;
                updateCard();
                updateStats();
                updateProgress();
            }
        }

        function previousCard() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCard();
                updateStats();
                updateProgress();
            }
        }

        function markCorrect() {
            correctAnswers++;
            updateStats();
            
            
            setTimeout(() => {
                nextCard();
            }, 500);
        }

        function shuffleCards() {
        
            for (let i = elements.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [elements[i], elements[j]] = [elements[j], elements[i]];
            }
            
            currentIndex = 0;
            updateCard();
            updateStats();
            updateProgress();
        }

        function updateStats() {
            document.getElementById('currentCard').textContent = currentIndex + 1;
            document.getElementById('totalCards').textContent = elements.length;
            document.getElementById('correctCount').textContent = correctAnswers;
        }

        function updateProgress() {
            const progress = ((currentIndex + 1) / elements.length) * 100;
            document.getElementById('progressFill').style.width = progress + '%';
        }


        document.getElementById('flashcard').addEventListener('click', flipCard);

        
        document.addEventListener('keydown', function(event) {
            switch(event.code) {
                case 'Space':
                    event.preventDefault();
                    flipCard();
                    break;
                case 'ArrowLeft':
                    event.preventDefault();
                    previousCard();
                    break;
                case 'ArrowRight':
                    event.preventDefault();
                    nextCard();
                    break;
                case 'Enter':
                    event.preventDefault();
                    markCorrect();
                    break;
            }
        });


        init();