// Configurações globais
const API_BASE_URL = '';

// Elementos DOM
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const btnSend = document.getElementById('btnSend');
const btnAudio = document.getElementById('btnAudio');

// Estado do chatbot
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadInitialData();
});

// Inicialização da aplicação
function initializeApp() {
    // Adicionar classe para animações de entrada
    document.body.classList.add('loaded');
    
    // Configurar navegação suave
    setupSmoothScrolling();
    
    // Configurar menu mobile
    setupMobileMenu();
    
    // Configurar animações de scroll
    setupScrollAnimations();
}

// Configurar event listeners
function setupEventListeners() {
    // Chatbot
    chatbotToggle.addEventListener('click', toggleChatbot);
    chatbotClose.addEventListener('click', toggleChatbot);
    btnSend.addEventListener('click', sendMessage);
    btnAudio.addEventListener('click', toggleAudioRecording);
    
    // Input do chatbot
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Questionário
    const questionarioForm = document.getElementById('questionarioForm');
    if (questionarioForm) {
        questionarioForm.addEventListener('submit', handleQuestionarioSubmit);
    }
    
    // Navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Navegação suave
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Menu mobile
function setupMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
}

// Animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    document.querySelectorAll('.card, .semana, .section-header').forEach(el => {
        observer.observe(el);
    });
}

// Carregar dados iniciais
async function loadInitialData() {
    try {
        await Promise.all([
            loadCursos(),
            loadTrilhas(),
            loadEmpresas(),
            loadProtocolo()
        ]);
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        showNotification('Erro ao carregar dados. Tente novamente.', 'error');
    }
}

// Carregar cursos
async function loadCursos() {
    try {
        const response = await fetch('/api/cursos');
        const cursos = await response.json();
        renderCursos(cursos);
    } catch (error) {
        console.error('Erro ao carregar cursos:', error);
    }
}

// Renderizar cursos
function renderCursos(cursos) {
    const cursosGrid = document.getElementById('cursosGrid');
    if (!cursosGrid) return;
    
    cursosGrid.innerHTML = cursos.map(curso => `
        <div class="card">
            <h3>${curso.titulo}</h3>
            <p>${curso.descricao}</p>
            <div class="card-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${curso.duracao}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-signal"></i>
                    <span>${curso.nivel}</span>
                </div>
            </div>
            <div class="card-tags">
                <span class="tag">${curso.categoria}</span>
            </div>
        </div>
    `).join('');
}

// Carregar trilhas
async function loadTrilhas() {
    try {
        const response = await fetch('/api/trilhas');
        const trilhas = await response.json();
        renderTrilhas(trilhas);
    } catch (error) {
        console.error('Erro ao carregar trilhas:', error);
    }
}

// Renderizar trilhas
function renderTrilhas(trilhas) {
    const trilhasGrid = document.getElementById('trilhasGrid');
    if (!trilhasGrid) return;
    
    trilhasGrid.innerHTML = trilhas.map(trilha => `
        <div class="card">
            <h3>${trilha.nome}</h3>
            <p>${trilha.objetivo}</p>
            <div class="card-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>${trilha.duracao_total}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-book"></i>
                    <span>${trilha.cursos.length} cursos</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Carregar empresas
async function loadEmpresas() {
    try {
        const response = await fetch('/api/empresas');
        const empresas = await response.json();
        renderEmpresas(empresas);
    } catch (error) {
        console.error('Erro ao carregar empresas:', error);
    }
}

// Renderizar empresas
function renderEmpresas(empresas) {
    const empresasGrid = document.getElementById('empresasGrid');
    if (!empresasGrid) return;
    
    empresasGrid.innerHTML = empresas.map(empresa => `
        <div class="card">
            <h3>${empresa.nome}</h3>
            <p><strong>Setor:</strong> ${empresa.setor}</p>
            <p><strong>Localização:</strong> ${empresa.localizacao}</p>
            <div class="card-meta">
                <div class="meta-item">
                    <i class="fas fa-briefcase"></i>
                    <span>${empresa.vagas.length} vagas</span>
                </div>
            </div>
            <div class="card-tags">
                ${empresa.vagas.map(vaga => `<span class="tag">${vaga}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// Carregar protocolo
async function loadProtocolo() {
    try {
        const response = await fetch('/api/protocolo-21-dias');
        const protocolo = await response.json();
        renderProtocolo(protocolo);
    } catch (error) {
        console.error('Erro ao carregar protocolo:', error);
    }
}

// Renderizar protocolo
function renderProtocolo(protocolo) {
    const protocoloContent = document.getElementById('protocoloContent');
    if (!protocoloContent) return;
    
    let html = '';
    
    Object.entries(protocolo).forEach(([semanaKey, semana]) => {
        const semanaNum = semanaKey.split('_')[1];
        const semanaTitulo = `Semana ${semanaNum}`;
        
        html += `
            <div class="semana">
                <h3>
                    <i class="fas fa-calendar-week"></i>
                    ${semanaTitulo}
                </h3>
                <div class="semana-objetivo">
                    <strong>Objetivo:</strong> ${semana.objetivo}
                </div>
                <div class="dias-grid">
        `;
        
        Object.entries(semana.dias).forEach(([diaKey, dia]) => {
            html += `
                <div class="dia">
                    <h4>Dias ${diaKey}</h4>
                    <ul class="atividades">
                        ${dia.atividades.map(atividade => `<li>${atividade}</li>`).join('')}
                    </ul>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    protocoloContent.innerHTML = html;
}

// Chatbot
function toggleChatbot() {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
    }
}

// Enviar mensagem
async function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Adicionar mensagem do usuário
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Mostrar indicador de digitação
    addTypingIndicator();
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mensagem: message })
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            // Remover indicador de digitação
            removeTypingIndicator();
            // Adicionar resposta do bot
            addMessage(data.resposta, 'bot');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Erro no chat:', error);
        removeTypingIndicator();
        addMessage('Desculpe, ocorreu um erro. Tente novamente.', 'bot');
    }
}

// Adicionar mensagem
function addMessage(content, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const icon = document.createElement('i');
    icon.className = type === 'bot' ? 'fas fa-robot' : 'fas fa-user';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = content;
    
    messageDiv.appendChild(icon);
    messageDiv.appendChild(messageContent);
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Indicador de digitação
function addTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
    const icon = document.createElement('i');
    icon.className = 'fas fa-robot';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '<span class="typing-dots">Digitando<span>.</span><span>.</span><span>.</span></span>';
    
    typingDiv.appendChild(icon);
    typingDiv.appendChild(messageContent);
    
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Remover indicador de digitação
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Gravação de áudio
async function toggleAudioRecording() {
    if (!isRecording) {
        await startAudioRecording();
    } else {
        stopAudioRecording();
    }
}

// Iniciar gravação de áudio
async function startAudioRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            await sendAudioMessage(audioBlob);
        };
        
        mediaRecorder.start();
        isRecording = true;
        btnAudio.innerHTML = '<i class="fas fa-stop"></i>';
        btnAudio.style.background = '#ef4444';
        
        // Parar gravação automaticamente após 10 segundos
        setTimeout(() => {
            if (isRecording) {
                stopAudioRecording();
            }
        }, 10000);
        
    } catch (error) {
        console.error('Erro ao acessar microfone:', error);
        showNotification('Erro ao acessar microfone. Verifique as permissões.', 'error');
    }
}

// Parar gravação de áudio
function stopAudioRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;
        btnAudio.innerHTML = '<i class="fas fa-microphone"></i>';
        btnAudio.style.background = '';
    }
}

// Enviar mensagem de áudio
async function sendAudioMessage(audioBlob) {
    try {
        const formData = new FormData();
        formData.append('audio', audioBlob);
        
        const response = await fetch('/api/chat-audio', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.status === 'success') {
            addMessage('🎵 Áudio enviado com sucesso!', 'user');
            addMessage(data.resposta, 'bot');
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Erro ao enviar áudio:', error);
        addMessage('🎵 Áudio enviado!', 'user');
        addMessage('Recebi seu áudio! Como posso te ajudar?', 'bot');
    }
}

// Questionário
async function handleQuestionarioSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const dados = Object.fromEntries(formData.entries());
    
    try {
        const response = await fetch('/api/questionario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dados)
        });
        
        const result = await response.json();
        
        if (result.status === 'success') {
            showNotification('Questionário enviado com sucesso! Obrigado por participar.', 'success');
            e.target.reset();
        } else {
            throw new Error(result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar questionário:', error);
        showNotification('Erro ao enviar questionário. Tente novamente.', 'error');
    }
}

// Navegação para seções
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Notificações
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Adicionar ao DOM
    document.body.appendChild(notification);
    
    // Event listener para fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Adicionar estilos CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background 0.3s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .typing-dots span {
        animation: typing 1.4s infinite;
        opacity: 0;
    }
    
    .typing-dots span:nth-child(2) {
        animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
        animation-delay: 0.4s;
    }
    
    @keyframes typing {
        0%, 60%, 100% {
            opacity: 0;
        }
        30% {
            opacity: 1;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

document.head.appendChild(notificationStyles);

// Utilitários
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy loading para imagens
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Configurar lazy loading
setupLazyLoading();

// Adicionar classe loaded ao body após carregamento
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
