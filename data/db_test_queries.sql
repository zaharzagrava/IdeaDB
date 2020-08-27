-- 
insert into client(full_name) values("Zagrava");

insert into knowledge_file(html_text, plain_text, properties, last_date_modified, date_created, word_count)
            values('<p>Attribute describes the system</p>', 'Attribute describes the system',
                   '{"identifiers":{"system":null,"attribute":null},"discipline":{"biology":null},"year":{}}',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 2);
insert into knowledge_file(html_text, plain_text, properties, last_date_modified, date_created, word_count)
            values('<p>System is a fundamental analysis tool</p>', 'System is a fundamental analysis tool',
                   '{"identifiers":{"system":null},"discipline":{"biology":null,"physics":null},"year":{}}',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 2);

insert into client_knowledge_file(client_id, knowledge_file_id) values (1, 1);
insert into client_knowledge_file(client_id, knowledge_file_id) values (1, 2);

-- select all knowledge files that have 'system' 'identifier' kftag
-- search for knowledge_file (s)
select *
from knowledge_file
where knowledge_file.properties @> '{"discipline": ["biology", "physics"]}'::jsonb

-- search for knowledge_file (s)
select *
from knowledge_file
where knowledge_file.properties @> '{"discipline": ["biology"], "identifiers": ["tree"], "year": ["1854"]}'::jsonb

-- search for knowledge_file (s)
select *
from knowledge_file
where knowledge_file.properties @> '{"discipline": ["biology"], "identifiers": ["relation"], "year": ["1854"]}'::jsonb

-- create a knowledge_file
insert into knowledge_file(html_text, plain_text, properties, last_date_modified, date_created, word_count)
            values('<p>Attribute describes the system</p>', 'Attribute describes the system',
                   '{"identifiers":{"system":null,"attribute":null},"discipline":{"biology":null},"year":{}}',
                   timestamptz '2019-08-26 10:00:00+03', timestamptz '2019-08-26 10:00:00+03', 2);

-- update a knowledge_file
update knowledge_file
set html_text='<p>New Data</p>', plain_text='New Data', properties=''
where knowledge_file.id = '12'
returning *;

-- delete knowledge file by id
delete from knowledge_file where knowledge_file.id = 3;

-- delete knowledge file by tag_type and tag_name
-- TODO

-- select a client by id
select * from client where id = 0

-- create a client
insert into client(full_name) values('Petro');

-- update a client
update client
set full_name='New Full Name'
where client.id = 2;

-- delete client by id
delete from client where client.id = 3;