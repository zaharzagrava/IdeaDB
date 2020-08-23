-- main client object for clients (sellers and buyers)
CREATE TABLE client (
  id bigserial primary key,
  name varchar(50) not null,
  description varchar(510)
);

-- knowledge_files that are used in some part of the client object
create TABLE client_knowledge_file (
  id bigserial primary key,
  client_id bigint not null references client(id),
  knowledge_file_id bigint not null references knowledge_file(id) unique
);

create table knowledge_file (
  id bigserial primary key,
  description varchar(510),
  knowledge_text text,
  identifiers varchar(50)[10],
  disciplines varchar(50)[10]
  last_date_modified DATETIME,
  date_created DATETIME,
  word_count varchar(50)
);
