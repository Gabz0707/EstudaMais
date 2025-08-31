@echo off
chcp 65001 >nul
title Estuda+ - Plataforma Educativa

echo.
echo ========================================
echo    EduTech - Plataforma Educativa
echo ========================================
echo.

REM Verificar se Python está instalado
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python não encontrado!
    echo Por favor, instale o Python 3.8 ou superior
    echo Visite: https://www.python.org/downloads/
    pause
    exit /b 1
)

echo ✅ Python detectado
python --version

echo.
echo 📦 Verificando dependências...
echo.

REM Verificar se o ambiente virtual existe
if not exist "venv" (
    echo 🔧 Criando ambiente virtual...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Erro ao criar ambiente virtual
        pause
        exit /b 1
    )
    echo ✅ Ambiente virtual criado
)

REM Ativar ambiente virtual
echo 🔄 Ativando ambiente virtual...
call venv\Scripts\activate.bat

REM Instalar/atualizar dependências
echo 📦 Instalando dependências...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo.
echo 🚀 Iniciando EduTech...
echo.
echo 📍 URL: http://localhost:5000
echo 📍 Para parar: Pressione Ctrl+C
echo.

REM Executar a aplicação
python run.py

echo.
echo 👋 EduTech encerrado
pause
