# Sistema de apresentação de mapas. 

## Recursos: 
    - Cadastrar mapas
    - Camadas shapefiles
    - Controle para apresentar ou não as camadas
    - Criar polígonos e medir a área do polígono
    - Posibilidade de apresentar ou não os polígonos criados
=======
    - Controle para apresentar ou não as camadas
    - Criar polígonos e medir a área do polígono
    - Posibilidade de apresentar ou não os polígonos criados

Pré-Requisitos
---
1. docker & docker-compose

Instalação
---
Rode os comandos no terminal na seguinte ordem:
1. Para criar as instancias: `docker-compose create`
2. Para inicializar o banco: `docker-compose run db`
3. Após o término do processamento aparecerá a linha LOG:  database system is ready to accept connections, aperte `ctrl+c`
4. Para carregar o banco com as migrações iniciais: `docker-compose run django python manage.py migrate`
5. Para criar usuário superadmin no django: `docker-compose run django python manage.py createsuperuser`
6. Para instalar as dependências do frontend: `docker-compose run frontend npm install`

Rodando os testes
---
>>> `docker-compose run django python manage.py test`

Rodando o sistema
---
Inicialize o banco e aplicativo rodando o comando: `docker-compose up`

