# São João Web Backend

Backend da aplicação São João Web, desenvolvido com Node.js, Express e MySQL.

## Estrutura do Projeto

```
sao_joao_web_backend/
├── logs/                  # Logs do sistema (criado automaticamente)
├── public/                # Arquivos públicos
│   ├── images/            # Imagens enviadas
│   └── videos/            # Vídeos enviados
├── src/
│   ├── config/            # Configurações
│   ├── controllers/       # Controladores
│   ├── middlewares/       # Middlewares
│   ├── models/            # Modelos
│   ├── routes/            # Rotas
│   ├── services/          # Serviços
│   ├── utils/             # Utilitários
│   └── server.js          # Ponto de entrada
├── .env                   # Variáveis de ambiente
├── .gitignore             # Arquivos ignorados pelo Git
├── package.json           # Dependências
└── README.md              # Este arquivo
```

## Requisitos

- Node.js 14+
- MySQL 5.7+

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/sao_joao_web_backend.git
cd sao_joao_web_backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Crie o banco de dados:
```sql
CREATE DATABASE sao_joao_db;
```

5. Inicie o servidor:
```bash
npm run dev
```

## Funcionalidades

- Autenticação e autorização com JWT
- Upload de imagens e vídeos
- API RESTful para todos os módulos
- Controle de disponibilidade de conteúdo para o frontend
- Logs e auditoria
- Envio de emails
- Painel administrativo com Bootstrap

## Módulos

- Postcards
- Testimonials (Depoimentos)
- Biblioteca
- Galeria
- Book
- Communities
- Stories
- Programação
- Vídeo
- Hero

## API

### Autenticação

- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/register` - Registro de novo usuário (apenas admin)
- `GET /api/auth/users` - Lista todos os usuários (apenas admin)
- `GET /api/auth/users/:id` - Busca usuário por ID (apenas admin)
- `PUT /api/auth/users/:id` - Atualiza usuário (apenas admin)
- `DELETE /api/auth/users/:id` - Exclui usuário (apenas admin)
- `PUT /api/auth/users/:id/permissions` - Atualiza permissões de usuário (apenas admin)
- `GET /api/auth/modules` - Lista todos os módulos (apenas admin)

### Depoimentos (Testimonials)

- `GET /api/testimonials` - Lista todos os depoimentos
- `GET /api/testimonials/:id` - Busca depoimento por ID
- `POST /api/testimonials` - Cria novo depoimento
- `PUT /api/testimonials/:id` - Atualiza depoimento
- `DELETE /api/testimonials/:id` - Exclui depoimento
- `GET /api/testimonials/categories` - Lista categorias de depoimentos
- `POST /api/testimonials/submit` - Envia depoimento público (sem autenticação)

## Segurança

- Autenticação JWT
- Validação de dados com Joi
- Proteção contra ataques comuns com Helmet
- Rate limiting para evitar abuso da API
- Logs de auditoria para todas as ações

## Licença

Este projeto é privado e de propriedade da Prefeitura de Corumbá-MS.
