#!/usr/bin/env python3
"""
Script de inicialização da aplicação EduTech
"""

import os
import sys
import subprocess
from pathlib import Path

def check_python_version():
    """Verifica se a versão do Python é compatível"""
    if sys.version_info < (3, 8):
        print("❌ Erro: Python 3.8 ou superior é necessário")
        print(f"Versão atual: {sys.version}")
        sys.exit(1)
    print(f"✅ Python {sys.version_info.major}.{sys.version_info.minor} detectado")

def check_dependencies():
    """Verifica se as dependências estão instaladas"""
    try:
        import flask
        import flask_cors
        import google.generativeai
        print("✅ Todas as dependências estão instaladas")
        return True
    except ImportError as e:
        print(f"❌ Dependência não encontrada: {e}")
        return False

def install_dependencies():
    """Instala as dependências necessárias"""
    print("📦 Instalando dependências...")
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("✅ Dependências instaladas com sucesso")
        return True
    except subprocess.CalledProcessError:
        print("❌ Erro ao instalar dependências")
        return False

def create_upload_folder():
    """Cria a pasta de uploads se não existir"""
    upload_folder = Path("uploads")
    if not upload_folder.exists():
        upload_folder.mkdir()
        print("✅ Pasta de uploads criada")

def main():
    """Função principal"""
    print("🚀 Iniciando Estuda+ - Plataforma Educativa")
    print("=" * 50)
    
    # Verificar versão do Python
    check_python_version()
    
    # Verificar dependências
    if not check_dependencies():
        print("📦 Instalando dependências...")
        if not install_dependencies():
            print("❌ Falha ao instalar dependências. Execute manualmente:")
            print("   pip install -r requirements.txt")
            sys.exit(1)
    
    # Criar pasta de uploads
    create_upload_folder()
    
    print("\n🎯 Configurações:")
    print(f"   - Host: 0.0.0.0")
    print(f"   - Porta: 5000")
    print(f"   - URL: http://localhost:5000")
    print(f"   - API Gemini: Configurada")
    
    print("\n🚀 Iniciando servidor...")
    print("   Pressione Ctrl+C para parar")
    print("=" * 50)
    
    try:
        # Importar e executar a aplicação
        from app import app
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True
        )
    except KeyboardInterrupt:
        print("\n\n👋 Servidor parado pelo usuário")
    except Exception as e:
        print(f"\n❌ Erro ao iniciar servidor: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
