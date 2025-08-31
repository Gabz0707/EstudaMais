# 🚀 Instalação e Execução - Estuda+

## 📋 Pré-requisitos

- **Python 3.8 ou superior**
- **pip** (gerenciador de pacotes Python)
- **Navegador web moderno**

## 🔧 Instalação no Windows

### Opção 1: Execução Automática (Recomendado)

1. **Duplo clique** no arquivo `start.bat`
2. Aguarde a instalação automática das dependências
3. A aplicação abrirá automaticamente no navegador

### Opção 2: Instalação Manual

#### 1. Verificar Python
Abra o PowerShell ou CMD e execute:
```bash
python --version
```
Se não funcionar, tente:
```bash
python3 --version
```

#### 2. Criar ambiente virtual
```bash
python -m venv venv
```

#### 3. Ativar ambiente virtual
```bash
venv\Scripts\activate
```

#### 4. Instalar dependências
```bash
pip install -r requirements.txt
```

#### 5. Executar aplicação
```bash
python run.py
```

## 🌐 Acessar a Aplicação

Após a instalação, acesse:
- **URL Local**: http://localhost:5000
- **URL Rede**: http://[SEU-IP]:5000

## 🧪 Executar Testes

Para verificar se tudo está funcionando:
```bash
python test_app.py
```

## 📁 Estrutura do Projeto

```
Site/
├── app.py                 # Aplicação principal Flask
├── config.py             # Configurações
├── run.py                # Script de inicialização
├── requirements.txt      # Dependências Python
├── start.bat            # Inicialização Windows
├── start.sh             # Inicialização Linux/Mac
├── test_app.py          # Testes da aplicação
├── README.md            # Documentação completa
├── INSTALACAO.md        # Este arquivo
├── templates/           # Templates HTML
│   └── index.html      # Página principal
└── static/             # Arquivos estáticos
    ├── css/
    │   └── style.css   # Estilos CSS
    ├── js/
    │   └── main.js     # JavaScript principal
    └── images/         # Imagens
```

## 🔍 Solução de Problemas

### Erro: "Python não encontrado"
- Instale o Python: https://www.python.org/downloads/
- Marque "Add Python to PATH" durante a instalação

### Erro: "pip não encontrado"
- Reinstale o Python marcando "pip" na instalação
- Ou execute: `python -m ensurepip --upgrade`

### Erro: "Módulo não encontrado"
- Ative o ambiente virtual: `venv\Scripts\activate`
- Instale as dependências: `pip install -r requirements.txt`

### Erro: "Porta já em uso"
- Feche outras aplicações usando a porta 5000
- Ou altere a porta no arquivo `config.py`

### Erro: "Permissão negada"
- Execute o PowerShell como Administrador
- Ou verifique as permissões da pasta

## 📱 Funcionalidades Disponíveis

✅ **Cursos Rápidos** - Programas de curta duração
✅ **Trilhas de Capacitação** - Caminhos estruturados
✅ **Empresas Parceiras** - Oportunidades de emprego
✅ **Protocolo Psicológico** - Programa de 21 dias
✅ **Questionário** - Avaliação personalizada
✅ **Chatbot Inteligente** - Assistente com IA
✅ **Design Responsivo** - Funciona em todos os dispositivos

## 🎯 Próximos Passos

1. **Explore a interface** - Navegue pelas seções
2. **Teste o chatbot** - Clique no botão roxo
3. **Preencha o questionário** - Ajude-nos a entender seu perfil
4. **Siga o protocolo** - Comece sua jornada de 21 dias

## 📞 Suporte

Se encontrar problemas:
1. Verifique se seguiu todos os passos
2. Execute os testes: `python test_app.py`
3. Consulte o README.md para mais detalhes
4. Abra uma issue no repositório

---

**EduTech** - Transformando vidas através da educação e tecnologia 🚀
