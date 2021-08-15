# Recuperação de senha

**RF** 

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve receber um e-mail com as instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente dev;
- Utilizar Amazon SES para envios de email em ambiente de produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar senha, deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar a mesma;

# Atualização do perfil

**RF**

- O usuário deve poder atualizar seu nome, email e senha;

**RN**

- O usuário não pode alterar seu email já utilizado;
- Para atualizar sua senha, o usuário deve informar a senha antiga;
- Para atualizar sua senha, o usuário deve confirmar sua senha;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuario não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no mongoDB;
- As notificações do prestador devem  ser enviadas em tempo-real utilizando socket.io;

**RN**

- A notificação deve ter status de lida ou não-lida para que o prestador possa controlar;
