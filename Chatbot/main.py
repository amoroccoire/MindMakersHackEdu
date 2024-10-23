import os
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_core.runnables import RunnablePassthrough
from langchain_community.vectorstores.utils import filter_complex_metadata
from langchain.chains.query_constructor.base import AttributeInfo
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS

app = Flask(__name__)
CHUNK_SIZE = 1000
CHUNK_OVERLAP = 50
K_VALUE = 20

class Chatbot:
    

    def __init__(self):
        load_dotenv()
        directorio_actual = os.getcwd()
        self.persist_directory = os.path.join(directorio_actual, 'data')
        self.embedding = OpenAIEmbeddings()
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
        self.all_vectordb = self._inicializar_base_datos_vectorial_all()
        
        template_string = """
            Eres una IA que gestiona documentos de universitarios. Quiero que respondas \
            a mis preguntas con el suficiente detalle. La pregunta es la siguiente: {query}. \
            Después de la respuesta, quiero que listes las fuentes de donde obtuviste la respuesta \
            (con un enlace). Recuerda que las fuentes deben provenir únicamente de los documentos de SharePoint. \
            Si la pregunta no está relacionada con los documentos o está fuera de contexto, \
            como un saludo o una despedida, por favor responde con un mensaje neutro. \
            Los chats anteriores fueron: {chat_history}
        """
        
        self.prompt_template = ChatPromptTemplate.from_template(template_string)
        self.qa_chain = self._configurar_cadena_qa()

    def hacer_pregunta(self, pregunta):
        prompt = self.prompt_template.format(query=pregunta, chat_history="")
        resultado = self.qa_chain.invoke(prompt)
        return resultado

    def _inicializar_base_datos_vectorial_all(self):
        all_vectordb = FAISS.load_local("data", self.embedding, allow_dangerous_deserialization=True)
        print("Base de datos creada!")
        return all_vectordb

    def _configurar_cadena_qa(self):
        llm_name = 'gpt-4o-mini'
        
        self.llm = ChatOpenAI(
            model_name=llm_name, 
            temperature=0,
            max_tokens=5000,
        )

        template = """Eres una IA que gestiona documentos de universitarios. Quiero que respondas \
                      a mis preguntas con el suficiente detalle. Si no conoces la respuesta, solo indica que no la conoces. \
                    Question: {question} 
                    Context: {context} 
                    Answer:"""

        prompt = ChatPromptTemplate.from_template(template)
        
        self.retriever = self.all_vectordb.as_retriever(search_kwargs={'k': K_VALUE}, search_type="mmr")
        qa_chain = (
            {
                "context": self.retriever,
                "question": RunnablePassthrough(),
            }
            | prompt
            | self.llm
        )
        return qa_chain

chatbot = Chatbot()

@app.route('/chatbot', methods=['POST'])
def post():
    payload = request.get_json(force=True)
    pregunta = payload.get('pregunta', '')
    
    if pregunta:
        respuesta = chatbot.hacer_pregunta(pregunta).content
        return jsonify({'respuesta': respuesta})
    else:
        return jsonify({'error': 'No se proporcionó ninguna pregunta.'}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
