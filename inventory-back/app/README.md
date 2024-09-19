O seguinte arquivo contém as intruções para rodar o back-end da aplicação:

1 - Ao iniciar abra o terminal apertando Ctrl + " ou se preferir Ctrl+Shift+

2- após abrir o terminal, acesse a pasta do back-end com o seguinte comando cd .\inventory-back\

3- Com o terminal na pasta do back-end, você precisará instalar as dependências listadas no arquivo requirements.txt: pip install -r requirements.txt

Nota: Caso você prefira não instalar as dependências diretamente na sua máquina, pule para o passo 6.

4- após instalado e totalmente configurado, rode a parte do back no terminal com o seguinte comando: uvicorn app.main:app --reload

5- Back-end já iniciado, agora precisamos ir para o front, acesse o README do arquivo Inventory-App voltando a pasta digitando o comando cd ..

Caso você optou por pular para o passo 6

6 - Se você preferir não instalar as dependências diretamente na sua máquina para evitar possíveis conflitos, você pode usar uma máquina virtual ou container. Aqui está como fazer:

    6.1 Com o Virtualenv ativo, abra o terminal e execute pip install virtualenv
    6.2 Criar o ambiente virtual no diretório do seu projeto com o comando python -m virtualenv venv
    6.3 Para ativar no Windows digite venv\Scripts\activate
    6.4 Para ativar no Linux/Macos digite source venv/bin/activate

Depois que o ambiente virtual estiver configurado e o back-end estiver rodando, siga para o front-end conforme o passo 5.