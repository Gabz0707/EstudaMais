import os
from dotenv import load_dotenv

# Carregar variáveis de ambiente
load_dotenv()

class Config:
    """Configurações da aplicação"""
    
    # Configurações da API
    GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', 'AIzaSyChBgsam36iC9IS-sUKAPVCi9WlnO_eT-w')
    
    # Configurações do Flask
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'edutech-secret-key-2024')
    DEBUG = os.getenv('FLASK_DEBUG', 'True').lower() == 'true'
    
    # Configurações do servidor
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 5000))
    
    # Configurações de banco de dados (opcional)
    DATABASE_URL = os.getenv('DATABASE_URL', 'sqlite:///edutech.db')
    
    # Configurações de CORS
    CORS_ORIGINS = ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5000']
    
    # Configurações de upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    UPLOAD_FOLDER = 'uploads'
    
    # Configurações de segurança
    SESSION_COOKIE_SECURE = False  # True em produção com HTTPS
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'
