#!/usr/bin/env python3
"""
Testes básicos para a aplicação EduTech
"""

import unittest
import json
import sys
from pathlib import Path

# Adicionar o diretório atual ao path
sys.path.insert(0, str(Path(__file__).parent))

class TestEduTech(unittest.TestCase):
    """Testes para a aplicação EduTech"""
    
    def setUp(self):
        """Configuração inicial dos testes"""
        try:
            from app import app
            self.app = app.test_client()
            self.app.testing = True
        except ImportError as e:
            self.skipTest(f"Não foi possível importar a aplicação: {e}")
    
    def test_home_page(self):
        """Testa se a página inicial carrega"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'EduTech', response.data)
    
    def test_api_cursos(self):
        """Testa a API de cursos"""
        response = self.app.get('/api/cursos')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        
        # Verificar estrutura do primeiro curso
        curso = data[0]
        self.assertIn('id', curso)
        self.assertIn('titulo', curso)
        self.assertIn('duracao', curso)
        self.assertIn('nivel', curso)
        self.assertIn('categoria', curso)
        self.assertIn('descricao', curso)
    
    def test_api_trilhas(self):
        """Testa a API de trilhas"""
        response = self.app.get('/api/trilhas')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        
        # Verificar estrutura da primeira trilha
        trilha = data[0]
        self.assertIn('id', trilha)
        self.assertIn('nome', trilha)
        self.assertIn('cursos', trilha)
        self.assertIn('duracao_total', trilha)
        self.assertIn('objetivo', trilha)
    
    def test_api_empresas(self):
        """Testa a API de empresas"""
        response = self.app.get('/api/empresas')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, list)
        self.assertGreater(len(data), 0)
        
        # Verificar estrutura da primeira empresa
        empresa = data[0]
        self.assertIn('id', empresa)
        self.assertIn('nome', empresa)
        self.assertIn('setor', empresa)
        self.assertIn('vagas', empresa)
        self.assertIn('localizacao', empresa)
    
    def test_api_protocolo(self):
        """Testa a API do protocolo psicológico"""
        response = self.app.get('/api/protocolo-21-dias')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertIsInstance(data, dict)
        
        # Verificar se contém as 3 semanas
        self.assertIn('semana_1', data)
        self.assertIn('semana_2', data)
        self.assertIn('semana_3', data)
        
        # Verificar estrutura da primeira semana
        semana1 = data['semana_1']
        self.assertIn('objetivo', semana1)
        self.assertIn('dias', semana1)
    
    def test_api_questionario(self):
        """Testa a API do questionário"""
        dados_teste = {
            'nome': 'João Silva',
            'idade': 18,
            'escolaridade': 'publica',
            'motivacao': 'motivado',
            'dificuldades': 'Foco e concentração',
            'objetivos': 'Ser programador',
            'familia': 'muito_apoio'
        }
        
        response = self.app.post('/api/questionario',
                               data=json.dumps(dados_teste),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'success')
    
    def test_api_chat(self):
        """Testa a API do chat"""
        mensagem_teste = {
            'mensagem': 'Olá, como você pode me ajudar?'
        }
        
        response = self.app.post('/api/chat',
                               data=json.dumps(mensagem_teste),
                               content_type='application/json')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'success')
        self.assertIn('resposta', data)
    
    def test_api_chat_audio(self):
        """Testa a API do chat com áudio"""
        response = self.app.post('/api/chat-audio')
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.data)
        self.assertEqual(data['status'], 'success')

def run_tests():
    """Executa os testes"""
            print("🧪 Executando testes da aplicação Estuda+...")
    print("=" * 50)
    
    # Criar suite de testes
    loader = unittest.TestLoader()
    suite = loader.loadTestsFromTestCase(TestEduTech)
    
    # Executar testes
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Resumo dos resultados
    print("\n" + "=" * 50)
    if result.wasSuccessful():
        print("✅ Todos os testes passaram!")
        return True
    else:
        print("❌ Alguns testes falharam!")
        return False

if __name__ == '__main__':
    success = run_tests()
    sys.exit(0 if success else 1)
