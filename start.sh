#!/bin/bash

# EduTech - Plataforma Educativa
# Script de inicialização para Linux/Mac

echo ""
echo "========================================"
echo "   EduTech - Plataforma Educativa"
echo "========================================"
echo ""

# Verificar se Python está instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 não encontrado!"
    echo "Por favor, instale o Python 3.8 ou superior"
    echo "Ubuntu/Debian: sudo apt install python3 python3-pip python3-venv"
    echo "macOS: brew install python3"
    exit 1
fi

echo "✅ Python detectado"
python3 --version

echo ""
echo "📦 Verificando dependências..."
echo ""

# Verificar se o ambiente virtual existe
if [ ! -d "venv" ]; then
    echo "🔧 Criando ambiente virtual..."
    python3 -m venv venv
    if [ $? -ne 0 ]; then
        echo "❌ Erro ao criar ambiente virtual"
        exit 1
    fi
    echo "✅ Ambiente virtual criado"
fi

# Ativar ambiente virtual
echo "🔄 Ativando ambiente virtual..."
source venv/bin/activate

# Instalar/atualizar dependências
echo "📦 Instalando dependências..."
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo ""
echo "🚀 Iniciando EduTech..."
echo ""
echo "📍 URL: http://localhost:5000"
echo "📍 Para parar: Pressione Ctrl+C"
echo ""

# Executar a aplicação
python3 run.py

echo ""
echo "👋 EduTech encerrado"
