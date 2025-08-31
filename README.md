# Estuda+ - Plataforma Educativa e Profissionalizante

Uma plataforma educativa moderna e inovadora voltada para jovens, oferecendo cursos rápidos, trilhas de capacitação prática e conexão com empresas parceiras. Inclui um protocolo psicológico de 21 dias para reprogramar a mentalidade de estudo e um chatbot inteligente integrado ao Google Gemini AI.

## 🚀 Características Principais

- **Design Moderno**: Interface preta com detalhes roxos escuros e elementos tecnológicos
- **Cursos Rápidos**: Programas de curta duração para habilidades essenciais
- **Trilhas de Capacitação**: Caminhos estruturados para formação profissional
- **Conexão com Empresas**: Parcerias para oportunidades de emprego e estágio
- **Protocolo Psicológico**: Programa de 21 dias para melhorar a relação com os estudos
- **Questionário Psicológico**: Avaliação personalizada do perfil de estudo
- **Chatbot Inteligente**: Assistente virtual com recursos de áudio e texto
- **API Integrada**: Backend em Python com Flask e integração ao Google Gemini AI

## 🛠️ Tecnologias Utilizadas

### Backend
- **Python 3.8+**
- **Flask**: Framework web
- **Flask-CORS**: Suporte a CORS
- **Google Generative AI**: Integração com Gemini AI
- **SQLite**: Banco de dados (opcional)

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Estilos modernos com variáveis CSS e animações
- **JavaScript ES6+**: Funcionalidades interativas
- **Font Awesome**: Ícones
- **Responsivo**: Design adaptável para mobile e desktop

## 📋 Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)
- Navegador web moderno
- Chave de API do Google Gemini AI

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd Site
```

### 2. Crie um ambiente virtual (recomendado)
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as dependências
```bash
pip install -r requirements.txt
```

### 4. Configure a chave da API
A chave da API do Google Gemini já está configurada no código:
```python
GEMINI_API_KEY = "AIzaSyChBgsam36iC9IS-sUKAPVCi9WlnO_eT-w"
```

### 5. Execute a aplicação
```bash
python app.py
```

### 6. Acesse no navegador
Abra `http://localhost:5000` no seu navegador

## 🎯 Funcionalidades

### Cursos e Trilhas
- Visualização de cursos disponíveis
- Trilhas de capacitação estruturadas
- Informações detalhadas sobre duração e nível

### Empresas Parceiras
- Lista de empresas parceiras
- Vagas disponíveis para emprego e estágio
- Informações sobre setor e localização

### Protocolo Psicológico de 21 Dias
- **Semana 1**: Reduzindo resistência e criando segurança
- **Semana 2**: Aumentando a tolerância e o foco
- **Semana 3**: Consolidando hábito e reduzindo aversão

### Questionário Psicológico
- Avaliação do histórico familiar
- Análise da relação com os estudos
- Tipo de escola frequentada
- Nível de motivação
- Objetivos profissionais

### Chatbot Inteligente
- **Chat por texto**: Conversas em tempo real
- **Recursos de áudio**: Gravação e envio de mensagens de voz
- **Integração Gemini AI**: Respostas inteligentes e contextualizadas
- **Interface responsiva**: Funciona em dispositivos móveis

## 🔌 API Endpoints

### GET Endpoints
- `/api/cursos` - Lista todos os cursos
- `/api/trilhas` - Lista todas as trilhas
- `/api/empresas` - Lista empresas parceiras
- `/api/protocolo-21-dias` - Protocolo psicológico completo

### POST Endpoints
- `/api/questionario` - Envia dados do questionário
- `/api/chat` - Chat por texto com Gemini AI
- `/api/chat-audio` - Processamento de mensagens de áudio

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: #1a1a1a (Preto)
- **Secundária**: #2d1b69 (Roxo escuro)
- **Acento**: #8b5cf6 (Roxo vibrante)
- **Texto**: #ffffff (Branco)

### Elementos Visuais
- Gradientes modernos
- Sombras com brilho roxo
- Animações suaves
- Elementos flutuantes
- Cards com hover effects

### Responsividade
- Design mobile-first
- Breakpoints para tablet e desktop
- Menu hambúrguer para mobile
- Grid adaptativo

## 🚀 Como Usar

### 1. Navegação
- Use o menu superior para navegar entre seções
- Clique nos botões de call-to-action para acessar funcionalidades
- Navegação suave entre seções

### 2. Chatbot
- Clique no botão flutuante roxo no canto inferior direito
- Digite suas mensagens ou use o botão de áudio
- O chatbot responde usando inteligência artificial

### 3. Questionário
- Preencha todas as informações solicitadas
- Clique em "Enviar Questionário"
- Receba confirmação de envio

### 4. Protocolo 21 Dias
- Navegue pelas semanas e dias
- Siga as atividades recomendadas
- Acompanhe seu progresso

## 🔒 Segurança

- Validação de entrada em formulários
- Sanitização de dados
- Headers de segurança
- CORS configurado adequadamente

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge
- **Dispositivos**: Desktop, Tablet, Mobile
- **Sistemas**: Windows, macOS, Linux

## 🚧 Desenvolvimento

### Estrutura do Projeto
```
Site/
├── app.py                 # Aplicação principal Flask
├── requirements.txt       # Dependências Python
├── README.md             # Documentação
├── templates/            # Templates HTML
│   └── index.html       # Página principal
└── static/              # Arquivos estáticos
    ├── css/
    │   └── style.css    # Estilos CSS
    ├── js/
    │   └── main.js      # JavaScript principal
    └── images/          # Imagens
```

### Comandos de Desenvolvimento
```bash
# Executar em modo debug
python app.py

# Instalar novas dependências
pip install <pacote>
pip freeze > requirements.txt

# Ativar ambiente virtual
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 📞 Suporte

- **Email**: contato@edutech.com
- **Telefone**: (11) 99999-9999
- **Issues**: Use o sistema de issues do GitHub

## 🔮 Roadmap

- [ ] Sistema de usuários e login
- [ ] Dashboard personalizado
- [ ] Sistema de progresso
- [ ] Certificados digitais
- [ ] Integração com mais IAs
- [ ] App mobile nativo
- [ ] Sistema de gamificação
- [ ] Analytics avançado

## 🙏 Agradecimentos

- Google Gemini AI pela tecnologia de IA
- Comunidade Flask pela framework robusta
- Font Awesome pelos ícones
- Contribuidores e testadores

---

**Estuda+** - Transformando vidas através da educação e tecnologia 🚀
