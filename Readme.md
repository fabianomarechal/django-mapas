# Sistema de apresentação de mapas. 

## Recursos: 
    - Cadastrar mapas
    - Camadas shapefiles
    - Controle para apresentar ou não as camadas.
    - Criar polígonos e medir a área do polígono.
    - Posibilidade de apresentar ou não os políginos criados.

Instalação
---
Rode os comandos no terminal na seguinte ordem:
1. Para criar as instancias: `docker-compose create`
2. Para inicializar o banco: `docker-compose run db`
3. Após o término do processamento aparecerá a linha LOG:  database system is ready to accept connections, aperte `ctrl+c`
4. Para carregar o banco com as migrações iniciais: `docker-compose run django python manage.py migrate`
5. Para criar usuário superadmin no django: `docker-compose run django python manage.py createsuperuser`

Rodando o sistema
---
Inicialize o banco e aplicativo rodando o comando: `docker-compose up`
