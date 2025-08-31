from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import google.generativeai as genai
import os
from datetime import datetime
import json
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, origins=Config.CORS_ORIGINS)

# Configuração da API do Gemini
genai.configure(api_key=Config.GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash')

# Dados simulados para cursos e trilhas
cursos = [
    {
        "id": 1,
        "titulo": "Introdução à Programação",
        "duracao": "4 semanas",
        "nivel": "Iniciante",
        "categoria": "Tecnologia",
        "descricao": "Aprenda os fundamentos da programação com Python"
    },
    {
        "id": 2,
        "titulo": "Marketing Digital",
        "duracao": "6 semanas",
        "nivel": "Intermediário",
        "categoria": "Marketing",
        "descricao": "Domine as estratégias de marketing digital"
    },
    {
        "id": 3,
        "titulo": "Gestão de Projetos",
        "duracao": "8 semanas",
        "nivel": "Avançado",
        "categoria": "Administração",
        "descricao": "Gerencie projetos com metodologias ágeis"
    }
]

trilhas = [
    {
        "id": 1,
        "nome": "Trilha Tech",
        "cursos": [1, 3],
        "duracao_total": "12 semanas",
        "objetivo": "Formação completa em tecnologia"
    },
    {
        "id": 2,
        "nome": "Trilha Empreendedor",
        "cursos": [2, 3],
        "duracao_total": "14 semanas",
        "objetivo": "Desenvolver habilidades empreendedoras"
    }
]

empresas_parceiras = [
    {
        "id": 1,
        "nome": "TechCorp",
        "setor": "Tecnologia",
        "vagas": ["Desenvolvedor Júnior", "Estagiário em TI"],
        "localizacao": "São Paulo, SP"
    },
    {
        "id": 2,
        "nome": "DigitalMarketing",
        "setor": "Marketing",
        "vagas": ["Analista de Marketing", "Estagiário em Marketing"],
        "localizacao": "Rio de Janeiro, RJ"
    }
]

# Protocolo psicológico de 21 dias
protocolo_21_dias = {
    "semana_1": {
        "objetivo": "Reduzindo resistência e criando segurança",
        "dias": {
            "1-3": {
                "atividades": [
                    "5 minutos de respiração profunda antes do estudo",
                    "10 minutos estudando algo que você gosta",
                    "3 minutos estudando o conteúdo chato (apenas leitura ou contato inicial)",
                    "Recompensa pequena (chá, música ou outra coisa que goste)"
                ]
            },
            "4-6": {
                "atividades": [
                    "Escrever antes de estudar: 'Ainda estou aprendendo a gostar de estudar'",
                    "12 minutos de conteúdo agradável",
                    "5 minutos do conteúdo chato (pode fazer resumos ou exemplos simples)",
                    "Recompensa pequena"
                ]
            },
            "7": {
                "atividades": [
                    "Revisar brevemente o que viu na semana",
                    "5 minutos de respiração profunda",
                    "5 minutos conteúdo chato + 5 minutos conteúdo legal"
                ]
            }
        }
    },
    "semana_2": {
        "objetivo": "Aumentando a tolerância e o foco",
        "dias": {
            "8-10": {
                "atividades": [
                    "Escrever o motivo de estar estudando ('para conseguir X no futuro')",
                    "10 minutos conteúdo legal",
                    "8 minutos conteúdo chato, tentando associar com algo do seu interesse",
                    "Pequena recompensa"
                ]
            },
            "11-13": {
                "atividades": [
                    "3 minutos de respiração profunda",
                    "10 minutos conteúdo legal",
                    "10 minutos conteúdo chato, criando exemplos ligados à sua vida"
                ]
            },
            "14": {
                "atividades": [
                    "Revisar o que aprendeu no conteúdo chato",
                    "Identificar 1 coisa nova que foi útil"
                ]
            }
        }
    },
    "semana_3": {
        "objetivo": "Consolidando hábito e reduzindo aversão",
        "dias": {
            "15-17": {
                "atividades": [
                    "5 minutos respiração profunda",
                    "8 minutos conteúdo legal",
                    "12 minutos conteúdo chato, aplicando ou ensinando para alguém"
                ]
            },
            "18-20": {
                "atividades": [
                    "Escrever antes: 'Hoje eu escolho aprender mesmo que não seja perfeito'",
                    "15 minutos conteúdo chato, usando exemplos práticos",
                    "5 minutos revisão de conteúdo legal"
                ]
            },
            "21": {
                "atividades": [
                    "Revisão geral da jornada",
                    "Escrever quais mudanças notou na sua relação com o estudo",
                    "Celebrar o progresso (fazer algo especial para marcar o avanço)"
                ]
            }
        }
    }
}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/cursos')
def get_cursos():
    return jsonify(cursos)

@app.route('/api/trilhas')
def get_trilhas():
    return jsonify(trilhas)

@app.route('/api/empresas')
def get_empresas():
    return jsonify(empresas_parceiras)

@app.route('/api/protocolo-21-dias')
def get_protocolo():
    return jsonify(protocolo_21_dias)

@app.route('/api/questionario', methods=['POST'])
def salvar_questionario():
    dados = request.json
    # Aqui você pode salvar no banco de dados
    # Por enquanto, apenas retornamos os dados recebidos
    return jsonify({
        "status": "success",
        "message": "Questionário salvo com sucesso",
        "dados": dados
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        dados = request.json
        mensagem = dados.get('mensagem', '')
        
        # Usando a API do Gemini
        response = model.generate_content(mensagem)
        
        return jsonify({
            "status": "success",
            "resposta": response.text,
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

@app.route('/api/chat-audio', methods=['POST'])
def chat_audio():
    try:
        # Aqui você pode processar áudio se necessário
        # Por enquanto, retornamos uma resposta padrão
        return jsonify({
            "status": "success",
            "resposta": "Áudio recebido e processado com sucesso!",
            "timestamp": datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 500

if __name__ == '__main__':
    app.run(
        debug=Config.DEBUG,
        host=Config.HOST,
        port=Config.PORT
    )
