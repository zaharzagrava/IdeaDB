-- main client object for clients
CREATE TABLE client (
  id bigserial primary key,
  full_name varchar(255)
);

-- knowledge_file
create table knowledge_file (
  id bigserial primary key,
  html_text text,
  plain_text text,
  properties jsonb,
  last_date_modified timestamptz,
  date_created timestamptz,
  word_count varchar(50)
);

-- which client holds which knowledge file
create TABLE client_knowledge_file (
  id bigserial primary key,
  client_id bigint not null references client(id),
  knowledge_file_id bigint not null references knowledge_file(id) unique ON DELETE CASCADE
);