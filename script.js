const screen1 = document.getElementById('screen1');
        const screen2 = document.getElementById('screen2');
        const clockElement = document.getElementById('clock');
        const particlesContainer = document.getElementById('particlesContainer');

        let particles = [];
        let animationId = null;
        const particleCount = 150;

        
        screen1.addEventListener('click', () => {
            screen1.classList.add('hide');
            screen2.classList.add('show');
            createParticles();
            animateParticles();
        });

        // хуета которая обновляет часы
        function updateClock() {
            const now = new Date();
            
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
            
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            };
            
        }


        function createParticles() {
            particlesContainer.innerHTML = '';
            particles = [];
            
            for (let i = 0; i < particleCount; i++) {
                createParticle();
            }
        }

        function createParticle() {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайный размер от 1 до 4 пикселей
            const size = Math.random() * 3 + 1;
            
            // рандом транспарент
            const opacity = Math.random() * 0.7 + 0.3;

            const pinkVariations = [
                'rgba(255, 182, 193, ', 
                'rgba(255, 105, 180, ', 
                'rgba(255, 20, 147, ',  
                'rgba(219, 112, 147, ', 
                'rgba(199, 21, 133, '   
            ];
            
            // Случайный цвет
            const pinkIndex = Math.floor(Math.random() * pinkVariations.length);
            const pinkColor = pinkVariations[pinkIndex];

            particle.style.backgroundColor = pinkColor + opacity + ')';

            // Случайная начальная позиция начинается с верху экрана
            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * -100; 
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${startX}px`;
            particle.style.top = `${startY}px`;
            
            // Случайная скорость падения
            const speed = Math.random() * 1.5 + 0.5;
            
            // Случайное колебание (дрейф)
            const drift = (Math.random() - 0.5) * 1.5;
            
            particlesContainer.appendChild(particle);
            
            // Сохраняем данные частицы
            particles.push({
                element: particle,
                x: startX,
                y: startY,
                speed: speed,
                drift: drift,
                size: size,
                opacity: opacity
            });
        }

        // Функция анимации частиц
        function animateParticles() {
            particles.forEach(particle => {
                // Двигаем частицу вниз
                particle.y += particle.speed;
                
                // Добавляем больше направленя влево-вправо
                particle.x += particle.drift;
                
                // Если частица ушла за нижний край, возвращаем её наверх
                if (particle.y > window.innerHeight) {
                    particle.y = -particle.size;
                    particle.x = Math.random() * window.innerWidth;
                }
                
                // Если частица ушла за левый или правый край, меняем направление дрейфа
                if (particle.x < -particle.size || particle.x > window.innerWidth) {
                    particle.drift = -particle.drift;
                }
                
                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
                
                const flicker = Math.sin(Date.now() / 1500 + particle.x) * 0.15 + 0.85;
                particle.element.style.opacity = particle.opacity * flicker;
            });
            
            animationId = requestAnimationFrame(animateParticles);
        }

        // Обработка изменения размера окна
        window.addEventListener('resize', () => {
            if (screen2.classList.contains('show')) {
                createParticles();
            }
        });

        // время обновления
        updateClock();
        setInterval(updateClock, 1000);