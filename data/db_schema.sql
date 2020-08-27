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
  last_date_modified timestamptz,
  date_created timestamptz,
  word_count varchar(50)
);
create table property_group_property (
  id bigserial primary key,
  property_group_id bigint not null references property_group(id),
  property_id bigint not null references property(id) unique
)

-- which client holds which knowledge file
create TABLE client_property (
  id bigserial primary key,
  client_id bigint not null references client(id),
  property_id bigint not null references property(id) unique
);

-- which client holds which knowledge file
create TABLE client_knowledge_file (
  id bigserial primary key,
  client_id bigint not null references client(id),
  knowledge_file_id bigint not null references knowledge_file(id) unique
);

-- which property relates to which knowledge_file
create table knowledge_file_property (
  id bigserial primary key,
  knowledge_file_id bigint not null references knowledge_file(id),
  property_id bigint not null references property(id)
);

select knowledge_file.id, knowledge_file_property.property_id
from knowledge_file
inner join client_knowledge_file on knowledge_file.id = client_knowledge_file.knowledge_file_id
inner join knowledge_file_property on knowledge_file.id = knowledge_file_property.property_id
where client_knowledge_file.client_id = 1
order by knowledge_file_property.property_id